export { auth as middleware } from "@repo/utils/auth";

export const config = {
  matcher: ["/profile", "/profile/:path*", "/projects/new/:path*"],
};
