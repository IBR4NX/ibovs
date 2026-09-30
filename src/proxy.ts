import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthState } from '@/lib/auth';
import { colors } from '@/utils/colors';

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/account', '/orders', '/products', '/store', '/admin'];
const PUBLIC_ROUTES = ['/login', '/signup', '/register'];
const ADMIN_ID = process.env.ADMIN_ID ?? '';

const isDev = process.env.NODE_ENV === 'development';

function log(...args: unknown[]) {
    if (isDev) console.log(...args);
}

function matchesRoute(path: string, routes: string[]): boolean {
    return routes.some(route => path === route || path.startsWith(route + '/'));
}

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    log(colors.bgMagenta("   "));
    log(colors.bgMagenta(new Date(Date.now()).toLocaleTimeString()), colors.bold('proxy start'), '→', path, ip);

    const isProtectedRoute = matchesRoute(path, PROTECTED_ROUTES);
    const isPublicRoute = matchesRoute(path, PUBLIC_ROUTES);

    const auth = await verifyAuthState(path);    
    log('auth:', auth ? { id: auth.id, role: auth.role, expiresAt: auth.expiresAt } : null);
    log('flags:', { path, isProtectedRoute, isPublicRoute });

    // --- المسارات العامة (login/register/signup) ---
    if (isPublicRoute) {
        if (!auth?.id) return NextResponse.next();
        // المستخدم مسجل بالفعل → لا داعي لصفحات الدخول
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // --- المسارات المحمية ---
    if (isProtectedRoute && !auth?.id) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // --- admin فقط ---
    if (path.startsWith('/admin') && auth?.id !== ADMIN_ID) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|public|favicon|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|json)$).*)',
    ],
};