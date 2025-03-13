"use server";

import type {PostApiFileTypeMimeTypesData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postFileTypeMimeTypesApi(data: PostApiFileTypeMimeTypesData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.fileTypeMimeTypes.postApiFileTypeMimeTypes(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
