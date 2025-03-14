"use server";
import {getUpwithcrowdClient} from "../lib";
import {
  PutApiMemberByIdData,
  PutApiMemberByIdSwitchData,
  type PutApiMemberByIdValidatedData,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function putMemberSwitchByIdApi(data: PutApiMemberByIdSwitchData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.member.putApiMemberByIdSwitch(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putMemberApiById(data: PutApiMemberByIdData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.member.putApiMemberById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
export async function putMemberValidatedById(data: PutApiMemberByIdValidatedData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.member.putApiMemberByIdValidated(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
