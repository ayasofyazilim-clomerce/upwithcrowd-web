"use server";
import type {GetApiTaskData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowd} from "@/utils/client";

export async function getTaskApi(data?: GetApiTaskData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.task.getApiTask(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}
