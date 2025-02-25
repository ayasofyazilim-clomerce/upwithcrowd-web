"use server";

import {UPWCServiceClient} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {auth} from "@repo/utils/auth/next-auth";
import type {Session} from "next-auth";

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
