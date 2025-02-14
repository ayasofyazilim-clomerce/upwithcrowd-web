import {UPWCServiceClient} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {AccountServiceClient} from "@ayasofyazilim/core-saas/AccountService";
import type {Session} from "next-auth";
import {auth} from "@repo/utils/auth/next-auth";

const HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};
export async function getUpwithcrowd(session?: Session | null) {
  const userData = session || (await auth());
  const token = userData?.user && "access_token" in userData.user ? userData.user.access_token : ""; //userData?.user;
  return new UPWCServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getAccountServiceClient(session?: Session | null, customHeaders?: Record<string, string>) {
  const userData = session || (await auth());
  const token = userData?.user && "access_token" in userData.user ? userData.user.access_token : ""; //userData?.user;
  return new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.TOKEN_URL,
    HEADERS: {...HEADERS, ...customHeaders},
  });
}
