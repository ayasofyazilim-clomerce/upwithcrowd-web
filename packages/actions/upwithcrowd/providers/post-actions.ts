"use server";

import type {PostApiProviderData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postProviderApi(data: PostApiProviderData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.providers.postApiProvider(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
