"use server";

import type {GetApiPublicCategoryData, GetApiTypeData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getCategoryApi(data?: GetApiPublicCategoryData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.publicCategory.getApiPublicCategory(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}

export async function getTypeApi(data?: GetApiTypeData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.type.getApiType(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}
