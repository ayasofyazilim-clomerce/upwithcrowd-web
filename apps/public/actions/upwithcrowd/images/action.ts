"use server";
import type {GetApiFileData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowd} from "@/utils/client";

export async function getFileApi(data: GetApiFileData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.file.getApiFile(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}
