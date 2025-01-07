import type { Session } from "next-auth";
import { auth } from "@/auth";
import {
  ApiError,
  UPWCServiceClient,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

const HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};
export async function getUpwithcrowd(session?: Session | null) {
  const userData = session || (await auth());
  const token = userData?.user.access_token || ""; //userData?.user;
  return new UPWCServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS,
  });
}

export async function getUpwithcrowdAccount() {
  return new UPWCServiceClient({
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

export type ServerResponse<T = undefined> = BaseServerResponse &
  (ErrorTypes | SuccessServerResponse<T>);

export type ErrorTypes = BaseServerResponse &
  (ErrorServerResponse | ApiErrorServerResponse);

export interface BaseServerResponse {
  status: number;
  message: string;
}

export interface SuccessServerResponse<T> {
  type: "success";
  data: T;
}
export interface ApiErrorServerResponse {
  type: "api-error";
  data: ApiError["message"];
}
export interface ErrorServerResponse {
  type: "error";
  data: unknown;
}

export function structuredError(error: unknown): ErrorTypes {
  if (isApiError(error)) {
    const body = error.body as
      | {
          error: { message?: string; details?: string };
        }
      | undefined;
    const errorDetails = body?.error || {};
    return {
      type: "api-error",
      data: errorDetails.message || error.statusText || "Something went wrong",
      status: error.status,
      message:
        errorDetails.details ||
        errorDetails.message ||
        error.statusText ||
        "Something went wrong",
    };
  }
  return {
    type: "error",
    data: error,
    status: 500,
    message: "An error occurred",
  };
}

export interface PagedResult<T> {
  items?: T[] | null;
  totalCount: number;
}

export function structuredResponse<T>(data: T): ServerResponse<T> {
  return {
    type: "success",
    data,
    status: 200,
    message: "",
  };
}
