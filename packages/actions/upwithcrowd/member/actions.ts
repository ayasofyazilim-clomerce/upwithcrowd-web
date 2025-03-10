"use server";

import type {GetApiMemberData, GetApiMemberMailData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getApiMemberApi(data?: GetApiMemberData) {
  const api_client = await getUpwithcrowdClient();
  try {
    const response = await api_client.member.getApiMember(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
//will be removed after demo
export async function getMemberApi(data?: GetApiMemberData) {
  const api_client = await getUpwithcrowdClient();
  try {
    const response = await api_client.member.getApiMember(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

export async function getProfileImageApi() {
  const api_client = await getUpwithcrowdClient();
  try {
    const response = await api_client.profile.getApiProfileGetProfilePicture();
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

export async function getMemberMailApi(data: GetApiMemberMailData) {
  const api_client = await getUpwithcrowdClient();
  try {
    const response = await api_client.member.getApiMemberMail(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
