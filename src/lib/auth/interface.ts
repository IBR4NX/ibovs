import { JWTPayload } from 'jose';
/** Configuration for a single JWT token / cookie. */
import { IUser } from '@/controllers/models/user.model';
import { promises } from 'dns';

export interface TokenConfig {
  /** Token (cookie) name. */
  name: string;
  type: 'access' | 'refresh' | string;
  /** Expiry duration in seconds. */
  maxAgeSeconds: number;
}

/** Decoded JWT payload attached to auth tokens. */

export interface IAuthUser {
  _id: string;
  role?: string;
  username?: string;
  expiresAt?: number;
  email?: string;
  is?: boolean;
}
export interface IAuthStore {
  storeId?: ''|string;
  slug?: string;
}
// export interface JWTIbovs extends  JWTPayload {
//   id: string;
//   storeId?: string;
//   role?: string;
//   slug?: string;
//   is?: boolean;
// }
export interface JWTIbovs extends IAuthUser, IAuthStore ,JWTPayload {
}
export type TUser = IAuthUser&  IAuthStore | IUser;
/** User document used to build auth token payloads. */


// export interface IUser {
//   id: string;
//   role?: string;
//   /** List of store IDs the user belongs to. */
//   storeId?: string[];
//   [key: string]: any;
// }


