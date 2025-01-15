"use server";

import { signIn, signOut } from "../../../../../packages/utils/auth";
import { ApiErrorResponse, isApiError } from "@/utils/client";
import { redirect, RedirectType } from "next/navigation";

export async function signInAction<State>(
  args: { callBackURL?: string | null },
  prevState: State,
  formData: FormData,
) {
  const { callBackURL } = args;
  try {
    await signIn("credentials", {
      redirect: true,
      redirectTo: callBackURL ? callBackURL.toString() : "/profile",
      username: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NEXT_REDIRECT") {
        redirect(
          callBackURL ? callBackURL.toString() : "/profile",
          RedirectType.push,
        );
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
