"use server";

import { getUpwithcrowd } from "@/utils/client";
import { isApiError } from "@repo/utils/api";

export async function getMembership() {
  const api_client = await getUpwithcrowd();
  try {
    const myMember = await api_client.myMember.getApiMymember();
    return myMember;
  } catch (error) {
    if (isApiError(error)) {
      console.error("error", error.statusText);
      return null;
    }
    if (error instanceof Error) {
      console.error("error", error.message);
      return null;
    }
    return null;
  }
}
