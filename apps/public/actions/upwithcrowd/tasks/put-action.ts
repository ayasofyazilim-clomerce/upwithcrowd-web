"use server";
import type {PutApiTaskByIdData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowd} from "@/utils/client";

export async function putTaskByIdApi(data: PutApiTaskByIdData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.tasks.putApiTaskById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
