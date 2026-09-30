'use server'
import { NextRequest, NextResponse } from 'next/server'
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup',"/register"]
import { cookies, headers } from 'next/headers'
import { colors } from "@/utils/colors"
import {  verifyToken, getAuthCookies } from '@/lib/auth';

export default async function proxy(req: NextRequest) {
  const allCookies =await cookies();
  console.log(colors.bgMagenta("     "),colors.bold("proxy is start"));
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const parts = path.split('/').filter(Boolean); //
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  // 3. Decrypt the session from the cookie
  const s = allCookies.get('userAuth')?.value ?? ''
  const auth = await verifyToken(s, 'access')
  console.log(auth)
 // allCookies.delete('refreshAuth')
  console.log(new Date(Date.now()));
  if(auth)console.log(auth.id,auth.role,auth.expiresAt);
  
console.log(colors.strike(`${path}-${isProtectedRoute}-${isPublicRoute}:`),colors.blink(req.nextUrl.pathname));
if (isPublicRoute) {
  console.log(`\x1b[1;34m➜`,'isPublicRoute',`\x1b[0m`)
  if (path.startsWith(publicRoutes[2])) {
    console.log("ddddd");
   if(!auth?.id) return NextResponse.redirect(new URL('/login', req.nextUrl))
      return NextResponse.next()
  }
  if (!auth ) {
      return NextResponse.next()
    }
    if (auth.id){
      console.log(`\n\x1b[1;32m➜`,auth?.id,`\x1b[0m`," is: ",auth.role)
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }
  else if (isProtectedRoute) {
  // 4. Redirect to /login if the user is not authenticated
  const authStore = await verifyToken(allCookies.get('storeAuth')?.value ?? '', "access")
    console.log(`\n\x1b[1;35m➜`,'isProtectedRoute',`\x1b[0m`)
    if (!auth?.id) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    if (auth?.id) {
      return NextResponse.next()
    }
  }
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    auth?.id &&
    !req.nextUrl.pathname.startsWith('/dashboard')
    && auth?.id !== "699370619c9988f630e3e340"
  ) {
    console.log("redirected /dashboard")
    // return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
  console.log(colors.bgGreen("     "),colors.bold(`-${auth?.id}-`));
  return NextResponse.next()
}

// Routes Proxy should not run on
export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicons/).*)'],
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/login/:path*',
    '/signup/:path*',
    '/register/:path*',
    
  ],
}