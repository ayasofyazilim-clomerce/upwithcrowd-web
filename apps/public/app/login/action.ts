"use server";

import { signIn } from "#/auth";
import { ApiErrorResponse, isApiError } from "#/utils/client";
import { redirect } from "next/navigation";

export async function signInForm<State>(prevState: State, formData: FormData) {
  try {
    await signIn("credentials", {
      redirect: true,
      redirectTo: "/profile",
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NEXT_REDIRECT") {
        redirect("/profile");
      }
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
      return {
        message: error.name + ": " + error.message.split("Read more")[0],
      };
    }
  }
  return {
    message: "Invalid email or password",
  };
}
