export { auth as middleware } from "../../packages/utils/auth";

export const config = {
  matcher: ["/profile", "/profile/:path*", "/projects/new/:path*"],
};
