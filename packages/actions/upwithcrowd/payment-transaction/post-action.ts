"use server";
import type {PostApiPaymentTransactionData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getUpwithcrowdClient} from "../lib";

export async function postApiPaymentTransaction(data: PostApiPaymentTransactionData) {
  try {
    const client = await getUpwithcrowdClient();
    const dataResponse = await client.paymentTransaction.postApiPaymentTransaction(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
