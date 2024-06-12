import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/(.*)",
  "/events/:id(.*)",
  "/api/webhook/clerk(.*)",
  "/api/webhook/stripe(.*)",
  "/api/uploadthing(.*)",
]);

const isProtectedRoute = createRouteMatcher([
  "/api/webhook/clerk(.*)",
  "/api/webhook/stripe(.*)",
  "/api/uploadthing(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
  if (isProtectedRoute(request)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
