import { verifyToken, setAuthCookies, getAuthCookies } from "@/lib/auth/authCookies";
import {  TUser , JWTIbovs} from "@/lib/auth/interface";
import { Types } from "mongoose";
import { colors } from '@/utils/colors';
import { Failed } from "@/lib/interfaces/State";

export type AuthState = Failed | JWTIbovs  ;

 async function updateRefreshToken(refreshToken: string) {

    try {
        const refreshPayload = await verifyToken(refreshToken, "refresh");
        console.log(colors.bgWhite('  '), colors.green(' updateRefreshToken → '), refreshPayload);
        const userData: TUser = {
            _id: refreshPayload._id,
            role: refreshPayload.role,
            storeId: refreshPayload.storeId ,
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
export async function verifyTokenUser(req: Request) {
    const path = new URL(req.url);
    return await verifyAuthState(path.pathname);
}
/**
* Checks the current auth state and returns whether the user is authenticated.
* @returns An object with `isActiv` and the redirect `path` when unauthenticated.
*/
export async function verifyAuthState(path: string="/"): Promise<AuthState> {
    // console.log(colors.bgWhite('  '), colors.green(' path → '), path);
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
    if (!Types.ObjectId.isValid(payload._id)) {
        return { is: false, path: '/login' };
    }
    return { is: true,path:`${path}`, ...payload };
}

export async function verifyAuthUser(path: string = "/") {
    return await verifyAuthState(path) ;
}

export async function verifyAuthStore(path: string = "/") {
    return await verifyAuthState(path);
}


