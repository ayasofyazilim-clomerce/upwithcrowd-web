import type { Session } from "next-auth";
import { auth } from "@/auth";
import {
  ApiError,
  upwithcrowdServiceClient,
} from "@ayasofyazilim/saas/upwithcrowdService";

const HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};
export async function getUpwithcrowd(session?: Session | null) {
  const userData = session || (await auth());
  const token = userData?.user.access_token || ""; //userData?.user;
  return new upwithcrowdServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getUpwithcrowdAccount() {
  return new upwithcrowdServiceClient({
    BASE: process.env.ACCOUNT_URL,
    HEADERS,
  });
}

export function isApiError(error: unknown): error is ApiError {
  if ((error as ApiError).name === "ApiError") {
    return true;
  }
  return error instanceof ApiError;
}

// create a type for the next object
// {"error":{"code":"Volo.Abp.Identity:DuplicateUserName","message":"Username 'null' is already taken.","details":null,"data":{"0":"null"},"validationErrors":null}}
export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details: string;
    data: string;
    validationErrors: string;
  };
};
