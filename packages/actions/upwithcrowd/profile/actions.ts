"use server";

import { structuredError, structuredSuccessResponse } from "@repo/utils/api";
import { getUpwithcrowdClient } from "../lib";

export async function getProfileImageApi() {
  const api_client = await getUpwithcrowdClient();
  try {
    const response = await api_client.profile.getApiProfileGetProfilePicture();
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
