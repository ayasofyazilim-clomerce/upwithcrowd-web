"use server";
import type {
  PutApiProjectByIdData,
  PutApiProjectByIdFundingData,
  type PutApiProjectByIdStatusData,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowd} from "@/utils/client";

export async function putProjectBasicsByIdApi(data: PutApiProjectByIdData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.project.putApiProjectById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putProjectFundingByIdApi(data: PutApiProjectByIdFundingData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.project.putApiProjectByIdFunding(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
export async function putProjectStatusByIdApi(data: PutApiProjectByIdStatusData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.project.putApiProjectByIdStatus(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
