import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { aj } from "@/lib/arcjet";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about(.*)",
  "/emergency(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/help(.*)",
  "/pandharpur-attractions(.*)",
  "/pandharpur-festivals(.*)",
  "/temples(.*)",
  "/sitemap.xml",
  "/robots.txt",
  "/.well-known(.*)",
  "/api/revalidate(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // SEO + crawler-safe bypass routes
  if (
    path === "/" ||
    path === "/robots.txt" ||
    path === "/sitemap.xml" ||
    path.startsWith("/temples") ||
    path.startsWith("/pandharpur-attractions") ||
    path.startsWith("/pandharpur-festivals") ||
    path === "/about" ||
    path === "/emergency" ||
    path === "/help" ||
    path.startsWith("/.well-known")
  ) {
    return NextResponse.next();
  }

  // Arcjet Security Layer
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "Bot detected" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Access denied" },
      { status: 403 }
    );
  }

  // Clerk Auth Protection
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|webp|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};