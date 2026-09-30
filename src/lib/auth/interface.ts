export interface TokenConfig  {
  name: string;             // اسم التوكن / الكوكي
  type: 'access' | 'refresh' | string;
  maxAgeSeconds: number;    // مدة الصلاحية بالثواني
};
export interface JWTIbovs {
    storeId: string;
    id:string
    expiresAt?: Date
    role?: string
    slug?:string
  }

  export interface IUser {
  _id: string;
  id?: string;
  role?: string;
  storeId?: string[];       // مصفوفة المتاجر
  [key: string]: any;
}