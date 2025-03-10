"use server";
import {getUpwithcrowdClient} from "../lib";
import type {PostApiTaskCommentData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function postTaskCommentApi(data: PostApiTaskCommentData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.taskComment.postApiTaskComment(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
