import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL));
  }
  //If token exists, there is a user.
  if (pathname.includes("api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL));
  } 
}

export const config = {
  matcher: [
    '/((?!_next/static|favicon.ico).*)',
  ],
}
