"use server";

import type {
  PostApiSaasEditionsData,
  PostApiSaasTenantsData,
} from "@ayasofyazilim/saas/SaasService";
import {
  getSaasServiceClient,
  structuredError,
  structuredResponse,
} from "src/lib";

export async function postEditionApi(data: PostApiSaasEditionsData) {
  try {
    const client = await getSaasServiceClient();
    const dataResponse = await client.edition.postApiSaasEditions(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function postTenantApi(data: PostApiSaasTenantsData) {
  try {
    const client = await getSaasServiceClient();
    const dataResponse = await client.tenant.postApiSaasTenants(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}