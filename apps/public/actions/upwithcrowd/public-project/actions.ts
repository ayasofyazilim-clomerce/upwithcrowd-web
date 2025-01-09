"use server";

import {
  getUpwithcrowd,
  structuredError,
  structuredResponse,
} from "@/utils/client";
import { GetApiPublicProjectProjectListData } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

export async function getPublicProjectsApi(
  data?: GetApiPublicProjectProjectListData,
) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.publicProject.getApiPublicProjectProjectList(data);
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
