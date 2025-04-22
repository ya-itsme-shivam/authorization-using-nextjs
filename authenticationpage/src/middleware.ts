import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
const path=request.nextUrl.pathname

const ispublicpath=path==='/login' || path==='/signup' || path==='/verifyemail'

const token=request.cookies.get('token')?.value|| ""

if (ispublicpath && token){
    return NextResponse.redirect (new URL('/',request.nextUrl))
}

if(!ispublicpath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
}
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:[ '/',
  '/profile',
  '/login',
  '/signup',
  '/verifyemail'
  ]
};
