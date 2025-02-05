import "@repo/utils/auth";

declare module "@repo/utils/auth" {
  interface MyUser {
    member_id?: string | string[];
    sub?: string;
  }
}
