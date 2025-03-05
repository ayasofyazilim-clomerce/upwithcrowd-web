"use server";
import type {PostApiPaymentTransactionData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowd} from "@/utils/client";

export async function postApiPaymentTransaction(data: PostApiPaymentTransactionData) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse = await client.paymentTransaction.postApiPaymentTransaction(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
