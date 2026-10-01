
// import { loadEnvConfig } from '@next/env'
const projectDir = process.cwd()
// loadEnvConfig(projectDir)

 const environment=process.env.NODE_ENV;
 const PORT=process.env.PORT;
 const DB_URL=process.env.DATABASE_URL;
 const corsUrl = process.env.CORS_URL;
 export { environment, PORT, DB_URL, corsUrl };

 export const JWT_ACCESS_SECRET=process.env.JWT_ACCESS_SECRET || "";
 export const JWT_REFRESH_SECRET=process.env.JWT_REFRESH_SECRET || " ";
 export const JWT_SECRET=process.env.JWT_SECRET || " ";
export const ACCESS_TOKEN_VALIDITY_SECRET=process.env.ACCESS_TOKEN_VALIDITY_SECRET || "900"; // 15 دقيقة
export const REFRESH_TOKEN_VALIDITY_SECRET=process.env.REFRESH_TOKEN_VALIDITY_SECRET || "604800"; // 7 أيام


 export const NODE_ENV =process.env.NODE_ENV || "production"
 export const ENV_IS_ =process.env.NODE_ENV === "production"
 export const SESSION_SECRET=process.env.SESSION_SECRET || " "
// console.log(SESSION_SECRET)


import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);


// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// }