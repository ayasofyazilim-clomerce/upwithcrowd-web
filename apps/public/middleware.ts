export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/profile", "/profile/:path*", "/projects/new/:path*"],
};
