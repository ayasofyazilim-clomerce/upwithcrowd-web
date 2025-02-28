"use server";
import {getUpwithcrowd} from "@/utils/client";
import type {GetApiTaskCommentData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";

export async function getTaskCommentApi(data?: GetApiTaskCommentData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.taskComment.getApiTaskComment(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}
