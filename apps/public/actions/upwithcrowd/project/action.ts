"use server";

import {
  getUpwithcrowd,
  structuredError,
  structuredResponse,
} from "@/utils/client";

export async function getProjectsTotalBalanceApi() {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.project.getApiProjectV1TotalBalanceQuery();
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getProjectsLimitApi() {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.project.getApiProjectV1ProjectLimitQuery();
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
