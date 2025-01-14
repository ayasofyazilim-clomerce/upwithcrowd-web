import {
  getUpwithcrowd,
  structuredError,
  structuredResponse,
} from "@/utils/client";
import { PostApiProjectData } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

export async function postProjectApi(data: PostApiProjectData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.project.postApiProject(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
