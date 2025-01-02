export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/profile", "/projects/new/:path*"],
};
