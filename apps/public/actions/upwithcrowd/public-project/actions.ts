"use server";

import {
  getUpwithcrowd,
  structuredError,
  structuredResponse,
} from "@/utils/client";

export async function getPublicProjectsApi() {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.publicProject.getApiPublicProjectV1ProjectList();
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getPublicProjectDetailsApi(id: string) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.publicProject.getApiPublicProjectV1ProjectDetailById({ id });
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
