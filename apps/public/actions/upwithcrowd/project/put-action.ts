"use server";
import { getUpwithcrowd } from "@/utils/client";
import { PutApiProjectByIdFundingData } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { structuredError, structuredResponse } from "@repo/utils/api";

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
