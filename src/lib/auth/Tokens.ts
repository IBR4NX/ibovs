import { verifyToken, setAuthCookies, getAuthCookies } from "@/lib/auth/authCookies";
import { IUser } from "@/lib/auth/interface";
import { Types } from "mongoose";
import { colors } from '@/utils/colors';

 async function updateRefreshToken(refreshToken: string) {
    try {
        const refreshPayload = await verifyToken(refreshToken, "refresh");
        console.log(colors.bgWhite('  '), colors.green(' updateRefreshToken → '), refreshPayload);
        const userData: IUser = {
            _id: refreshPayload.id,
            role: refreshPayload.role,
            storeId: refreshPayload.storeId ? [refreshPayload.storeId] : [],
        };

        await setAuthCookies(userData);
        return true;

    } catch {
        return false;
    }
}

/**
 * Verifies the user's access token from the request cookies.
 * If the access token is missing or invalid, attempts to refresh it using the refresh token.   
 * */
export async function verifyTokenUser(req: Request): Promise<any> {
    const path = new URL(req.url);
    return await verifyAuthState(path.pathname);
}
/**
* Checks the current auth state and returns whether the user is authenticated.
* @returns An object with `isActiv` and the redirect `path` when unauthenticated.
*/
export async function verifyAuthState(path: string="/"): Promise<any> {
    console.log(colors.bgWhite('  '), colors.green(' start → getAuthState'));
    const { access, refresh } = await getAuthCookies();
    if (!access) {
        if (refresh) {
            const successful = await updateRefreshToken(refresh);
            if (!successful) { 
                return { is: false, path: '/login' };
            }
        }
        else {
            return { is: false, path: "/login" };
        }
    }
    const payload = await verifyToken(access, "access");
    if (!payload) return { is: false, path: '/login' };
    if (!Types.ObjectId.isValid(payload.id)) {
        return { is: false, path: '/login' };
    }
    return { is: true,path:`${path}`, ...payload };
}


