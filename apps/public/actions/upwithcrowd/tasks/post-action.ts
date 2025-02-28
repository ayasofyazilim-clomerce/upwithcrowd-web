"use server";
import type {PostApiTaskData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowd} from "@/utils/client";

export async function postProjectApi(data: PostApiTaskData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.task.postApiTask(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
