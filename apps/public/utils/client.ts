import { UPWCServiceClient } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type { Session } from "next-auth";
import { auth } from "@repo/utils/auth";

const HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};
export async function getUpwithcrowd(session?: Session | null) {
  const userData = session || (await auth());
  const token =
    userData?.user && "access_token" in userData?.user
      ? userData?.user.access_token
      : ""; //userData?.user;
  return new UPWCServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}
export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details: string;
    data: string;
    validationErrors: string;
  };
};
