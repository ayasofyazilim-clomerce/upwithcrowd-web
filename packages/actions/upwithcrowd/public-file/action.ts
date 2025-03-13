"use server";
import type {GetApiFileData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getPublicFileApi(data: GetApiFileData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.publicFile.getApiFile(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}
