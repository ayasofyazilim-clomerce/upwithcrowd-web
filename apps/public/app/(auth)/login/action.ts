"use server";

import { signIn, signOut } from "@/auth";
import { ApiErrorResponse, isApiError } from "@/utils/client";
import { redirect, RedirectType } from "next/navigation";

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
        redirect("/profile", RedirectType.push);
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

export async function handleSignOut() {
  await signOut({
    redirect: true,
    redirectTo: "/login",
  });
}
