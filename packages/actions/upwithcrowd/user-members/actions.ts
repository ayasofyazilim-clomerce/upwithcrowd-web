"use server";

import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getUserMembersApi() {
  const api_client = await getUpwithcrowdClient();
  try {
    const response = await api_client.userMembers.getApiUserMembers();
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
