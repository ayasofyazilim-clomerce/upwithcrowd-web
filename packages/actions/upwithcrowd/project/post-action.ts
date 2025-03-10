"use server";
import type {PostApiProjectAffiliationData, PostApiProjectData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postProjectApi(data: PostApiProjectData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.project.postApiProject(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function postProjectAffiliationApi(data: PostApiProjectAffiliationData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.project.postApiProjectAffiliation(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
