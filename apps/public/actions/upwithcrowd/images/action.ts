"use server";
import {structuredError, structuredResponse} from "@repo/utils/api";
import type {GetApiFileData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getUpwithcrowd} from "@/utils/client";

export async function getFileApi(data: GetApiFileData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.file.getApiFile(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
