"use server";

import { getUpwithcrowd } from "@/utils/client";
import {
  GetApiProjectData,
  GetApiProjectProjectLimitQueryData,
  GetApiProjectTotalBalanceQueryData,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { structuredResponse, structuredError } from "@repo/utils/api";

export async function getProjectsTotalBalanceApi(
  data: GetApiProjectTotalBalanceQueryData,
) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.project.getApiProjectTotalBalanceQuery(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getProjectsLimitApi(
  data: GetApiProjectProjectLimitQueryData,
) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.project.getApiProjectProjectLimitQuery(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getProjectApi(data?: GetApiProjectData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.project.getApiProject(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function getPublicProjectDetailsApi(id: string) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.publicProject.getApiPublicProjectProjectDetailById({ id });
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function getPublicProjectDetailsFundingApi(id: string) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.project.getApiProjectByIdFunding({ id });
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
