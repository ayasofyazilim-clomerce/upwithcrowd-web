"use server";
import type {GetApiPaymentTransactionData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredSuccessResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function getApiPaymentTransactionApi(data?: GetApiPaymentTransactionData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.paymentTransaction.getApiPaymentTransaction(data);
    return structuredSuccessResponse(dataResponse);
  } catch (error) {
    throw structuredError(error);
  }
}
