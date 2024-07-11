import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Get the session from the request
  const session = await getSession({ req });

  // If no session is found, redirect to login page
  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If session is found, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/role','/profile'], // Adjust paths as needed
};
