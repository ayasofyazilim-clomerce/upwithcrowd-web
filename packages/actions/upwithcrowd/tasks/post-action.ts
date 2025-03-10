"use server";
import type {PostApiTaskData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postTasksApi(data: PostApiTaskData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.tasks.postApiTask(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
