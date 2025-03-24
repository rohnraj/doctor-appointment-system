import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    console.log('middleware is running')

    const path =  request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" || path==='/';
    const isProtectedPath = path.startsWith("/Appointments");

    const token = request.cookies.get("token")?.value || ''; 

    if (!token) {
        return NextResponse.redirect('/login')
    }
    else if(token && isPublicPath){
        return NextResponse.redirect('/');
    }
    else if(!token && isProtectedPath) return NextResponse.redirect('/login');
    else if(token && isProtectedPath) return NextResponse.redirect('/Appointments/:path*')

    return NextResponse.next(); 
}

// Apply middleware to protected routes
export const config = {
    matcher:[
        '/',
        '/login',
        '/signup',
        '/Appointments/:path*'
    ], 
};
