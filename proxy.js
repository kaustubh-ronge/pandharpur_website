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
  "/api/revalidate(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // Always allow crawler-critical files for SEO safety
  if (path === "/robots.txt" || path === "/sitemap.xml") {
    return NextResponse.next();
  }

  // Arcjet Security Layer
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    if (decision.reason.isBot()) {
      return NextResponse.json({ error: "Bot detected" }, { status: 403 });
    }
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

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