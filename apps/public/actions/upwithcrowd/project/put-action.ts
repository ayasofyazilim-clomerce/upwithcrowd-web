"use server";
import { getUpwithcrowd } from "@/utils/client";
import {
  PutApiProjectByIdData,
  PutApiProjectByIdFundingData,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { structuredError, structuredResponse } from "@repo/utils/api";

export async function putProjectBasicsByIdApi(data: PutApiProjectByIdData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.project.putApiProjectById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putProjectFundingByIdApi(
  data: PutApiProjectByIdFundingData,
) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.project.putApiProjectByIdFunding(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
