"use server";

import type {GetApiSectorsData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getSectorApi(data?: GetApiSectorsData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.sector.getApiSectors(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}
