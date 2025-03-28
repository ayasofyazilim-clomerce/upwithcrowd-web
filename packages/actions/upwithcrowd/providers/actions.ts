"use server";

import type {GetApiProviderData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import type {Session} from "next-auth";
import {getUpwithcrowdClient} from "../lib";

export async function getProvidersApi(data: GetApiProviderData, session: Session | null) {
  try {
    const client = await getUpwithcrowdClient(session);
    const response = await client.providers.getApiProvider(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
