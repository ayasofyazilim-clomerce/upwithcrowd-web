"use server";
import {getUpwithcrowdClient} from "../lib";
import {PostApiMemberData, PostApiProfileSaveProfilePictureData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function postApiMember(data: PostApiMemberData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.member.postApiMember(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function postProfileImageApi(data: PostApiProfileSaveProfilePictureData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.profile.postApiProfileSaveProfilePicture(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
