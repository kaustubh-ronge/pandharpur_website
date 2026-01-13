import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Defines public routes that don't require authentication
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/about(.*)",
  "/emergency(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/help(.*)",
  "/pandharpur-attractions(.*)",
  "/pandharpur-festivals(.*)",
]);

/**
 * Clerk middleware that protects non-public routes
 */
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};