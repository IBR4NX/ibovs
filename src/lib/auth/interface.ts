
/** Configuration for a single JWT token / cookie. */
export interface TokenConfig {
  /** Token (cookie) name. */
  name: string;
  type: 'access' | 'refresh' | string;
  /** Expiry duration in seconds. */
  maxAgeSeconds: number;
}

/** Decoded JWT payload attached to auth tokens. */

export interface JWTIbovs {
  storeId: string;
  id: string;
  expiresAt?: Date;
  role?: string;
  slug?: string;
  is?: boolean;
}

/** User document used to build auth token payloads. */
export interface IUser {
  _id: string;
  id?: string;
  role?: string;
  /** List of store IDs the user belongs to. */
  storeId?: string[];
  [key: string]: any;
}