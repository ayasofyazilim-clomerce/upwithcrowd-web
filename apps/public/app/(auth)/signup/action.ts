"use server";

import {ApiErrorResponse} from "@/utils/client";
import {isApiError} from "@repo/utils/api";
import {getAccountServiceClient} from "@repo/utils/auth";
import {redirect} from "next/navigation";

export async function createUser<State>(prevState: State, formData: FormData) {
  const client = await getAccountServiceClient();

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
        message: error.status + ": " + error.statusText + ", " + errorBody.error.message,
      };
    }
    return {message: "An error occurred"};
  }
  redirect("/login");
}
