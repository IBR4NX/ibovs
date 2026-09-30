import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { JWT_REFRESH_SECRET,JWT_ACCESS_SECRET,ACCESS_TOKEN_VALIDITY_SECRET,REFRESH_TOKEN_VALIDITY_SECRET , NODE_ENV } from '@/lib/envConfig';
import { TokenConfig, JWTIbovs, IUser } from './interface';
import { colors } from "@/utils/colors";

export type MergedJWTPayload = JWTIbovs & JWTPayload;

export const defaultTokens: TokenConfig[] = [
  { name: 'access', type: 'access', maxAgeSeconds: parseInt(ACCESS_TOKEN_VALIDITY_SECRET) },
  { name: 'refresh', type: 'refresh', maxAgeSeconds: parseInt(REFRESH_TOKEN_VALIDITY_SECRET) },
];

const encodedKey = new TextEncoder().encode(JWT_ACCESS_SECRET);
const encodedKeyRefresh = new TextEncoder().encode(JWT_REFRESH_SECRET);

/**
 * signToken
 */
async function signToken( payload: Record<string, any>, config: TokenConfig=defaultTokens[0]): Promise<string> {

  const key = config.type === 'refresh' ? encodedKeyRefresh : encodedKey;
  const expiresAt = new Date(Date.now() + config.maxAgeSeconds * 1000);
  // const { maxAgeSeconds, ...restPayload } = payload;
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(key);
  return jwt;
}

/**
 * Verifies a JWT token using the key matching its type.
 * @param token - JWT string to verify.
 * @param type - 'refresh' uses the refresh key, otherwise the access key.
 * @returns Decoded payload on success, or null if verification fails.
 */
export async function verifyToken(
  token: string,
  type: 'access' | 'refresh' | string
): Promise<JWTIbovs> {
  const key = type === 'refresh' ? encodedKeyRefresh : encodedKey;

  try {
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as JWTIbovs;
  } catch (err) {
    return { storeId: '', id: '', is: false }; 
    // throw new Error(`Token verification failed: ${err}`);
  }
}


/**
 * Sets auth JWT cookies for the user on the response.
 * @param user - The user to build the token payload from.
 * @param tokensConfig - Token definitions to set (defaults to defaultTokens).
 * @returns A success message object.
 */
export async function setAuthCookies(user: IUser, tokensConfig: TokenConfig[] = defaultTokens) 
{
  const payload: any = { id: user.id ?? user._id.toString(), role: user.role };

  if (Array.isArray(user.storeId) && user.storeId.length > 0) {
    payload.storeId = user.storeId[0].toString(); // first store only
  }
  const cookieStore = await cookies();
  for (const tokenConfig of tokensConfig) {
    const token = await signToken({ ...payload, type: tokenConfig.name }, tokenConfig);

    cookieStore.set(tokenConfig.name, token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenConfig.maxAgeSeconds,
      path: '/',
    });
  }

  return { message: 'Auth cookies set successfully' };
}


/**
 * Reads the access and refresh tokens from the request cookies.
 * @returns An object containing whichever tokens are present.
 */
export async function getAuthCookies() {
  const cookieStore = await cookies();
  const allCookies: Record<string, string> = {};

  const access = cookieStore.get('access')?.value;
  const refresh = cookieStore.get('refresh')?.value;

  if (access) allCookies['access'] = access;
  if (refresh) allCookies['refresh'] = refresh;

  return allCookies;
}

/**
 * Reads a single cookie value by name from the request.
 * @param name - The cookie name to read (defaults to "access").
 * @returns The cookie value, or null if not found.
 */
export async function getCookie(name: string = 'access'): Promise<string | null> {
  const cookie = (await cookies()).get(name)?.value;
  if (!cookie) return null;
  return cookie;
}
// varifyJWT, refreshToken, checkRefresh, checkAuth

/**
 * Reads and verifies a token by cookie name, returning its decoded payload.
 * @param name - The cookie name to read (defaults to "access").
 * @returns The decoded payload, or null if the token is missing or invalid.
 */
export async function getVerifiedPayload(name: string = 'access'): Promise<JWTIbovs> {
  const token = await getCookie(name);

  if (!token) {
    console.log({ token, message: `no ${name} token found in cookies` });
    return { storeId: '', id: '', is: false }; // Return an empty payload if no token is found
  }

  const payload = await verifyToken(token, name);
  console.log(colors.green('token :'), payload?.id, ' ', payload?.role);

  return payload;
}
