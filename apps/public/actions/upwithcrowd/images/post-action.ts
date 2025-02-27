"use server";
import type {PostApiFileData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowd} from "@/utils/client";

export async function postApiPaymentTransaction(data: PostApiFileData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.file.postApiFile(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
