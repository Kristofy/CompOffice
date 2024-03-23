import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
} from "@/routes";

import { auth } from "@/auth";

export default auth((req) => {
  return
  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;
  
  // console.log("Next url", nextUrl)
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // if (isApiAuthRoute) { return; }

  // if (isApiAuthRoute) {
  //   if (isLoggedIn) {
  //     console.log("HIT")
  //     return Response.redirect(nextUrl)
  //   }
  //   return;
  // }

  // if (!isLoggedIn && !isPublicRoute) {
  //   let callbackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callbackUrl += nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  //   return Response.redirect(new URL(
  //     `/auth/login?callbackUrl=${encodedCallbackUrl}`,
  //     nextUrl
  //   ));
  // }

  // return null;
})

// Optionally, don't invoke Middleware on some paths
// From clerk
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}