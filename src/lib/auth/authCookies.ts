import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { JWT_REFRESH_SECRET,JWT_ACCESS_SECRET,ACCESS_TOKEN_VALIDITY_SECRET,REFRESH_TOKEN_VALIDITY_SECRET , NODE_ENV } from '@/lib/envConfig';
import { TokenConfig, JWTIbovs, IUser } from './interface';

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
export async function signToken( payload: Record<string, any>, config: TokenConfig=defaultTokens[0]): Promise<string> {

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
 * verifyToken
 */
export async function verifyToken( token: string,  type: 'access' | 'refresh' | string ): Promise<JWTIbovs> {
  const key = type === 'refresh' ? encodedKeyRefresh : encodedKey;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as JWTIbovs
  } catch (err) {
    return null as any
    throw new Error('Invalid or expired token');
  }
}

/**
 * setAuthCookies
 */
export async function setAuthCookies(
  user: IUser,
  tokensConfig: TokenConfig[] = defaultTokens
) {
  const payload: any = { id: user.id ?? user._id.toString(), role: user.role };
  if (Array.isArray(user.storeId) && user.storeId.length > 0) {
    payload.storeId = user.storeId[0].toString(); // أول متجر فقط
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
}

/**
 * getAuthCookies
 * ترجع الكوكيز للعميل على شكل object { token, refresh, ... }
 */
export async function getAuthCookies() {
  const cookieStore = await cookies();
  const allCookies: Record<string, string> = {};

  // جلب كل الكوكيز الموجودة
  cookieStore.getAll().forEach((c) => {
    allCookies[c.name] = c.value;
  });

  return allCookies;
}