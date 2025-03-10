"use server";
import type {GetApiTaskData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getTaskApi(data?: GetApiTaskData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.tasks.getApiTask(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}
