"use server";
import {getUpwithcrowd} from "@/utils/client";
import type {PostApiTaskCommentData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function postTaskCommentApi(data: PostApiTaskCommentData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.taskComment.postApiTaskComment(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
