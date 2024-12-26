"use server";

import {
  ApiErrorResponse,
  getUpwithcrowdAccount,
  isApiError,
} from "#/utils/client";
import { redirect } from "next/navigation";

export async function createUser<State>(prevState: State, formData: FormData) {
  const client = await getUpwithcrowdAccount();

  try {
    await client.account.postApiAccountRegister({
      requestBody: {
        password: formData.get("password") + "",
        userName: formData.get("username") + "",
        emailAddress: formData.get("email") + "",
        appName: "MVC",
      },
    });
  } catch (error) {
    if (isApiError(error)) {
      const errorBody = error.body as ApiErrorResponse;
      return {
        message:
          error.status +
          ": " +
          error.statusText +
          ", " +
          errorBody.error.message,
      };
    }
    return { message: "An error occurred" };
  }
  redirect("/login");
}
