"use server";

import type {
  GetApiProjectByIdProjectInvestorData,
  GetApiProjectByIdStatisticsData,
  GetApiProjectData,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getProjectApi(data?: GetApiProjectData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.project.getApiProject(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}

export async function getPublicProjectDetailsFundingApi(id: string) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.project.getApiProjectByIdFunding({id});
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function getProjectByIdMembersApi(id: string) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.project.getApiProjectByIdMembers({id});
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function getProjectByIdProjectInvestorApi(data: GetApiProjectByIdProjectInvestorData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.project.getApiProjectByIdProjectInvestor(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    console.log(error);
    throw structuredError(error);
  }
}
export async function getProjectStatisticsByIdApi(data: GetApiProjectByIdStatisticsData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.project.getApiProjectByIdStatistics(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    console.log(error);
    throw structuredError(error);
  }
}
