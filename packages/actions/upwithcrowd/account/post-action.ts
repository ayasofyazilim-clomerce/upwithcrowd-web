"use server";
import {getAccountServiceClient} from "../lib";
import {PostApiAccountSendEmailConfirmationTokenData} from "@ayasofyazilim/core-saas/AccountService";
import {structuredError, structuredResponse} from "@repo/utils/api";

export async function postSendEmailConfirmationTokenApi(data: PostApiAccountSendEmailConfirmationTokenData) {
  try {
    const client = await getAccountServiceClient();
    const dataResponse = await client.account.postApiAccountSendEmailConfirmationToken(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
