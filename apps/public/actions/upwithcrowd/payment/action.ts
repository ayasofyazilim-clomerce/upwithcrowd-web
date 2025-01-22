import { structuredError, structuredResponse } from "@repo/utils/api";
import { getUpwithcrowd } from "@/utils/client";
import { GetApiPaymentTransactionData } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

export async function getApiPaymentTransaction(
  data?: GetApiPaymentTransactionData,
) {
  try {
    const client = await getUpwithcrowd();
    const dataResponse =
      await client.paymentTransaction.getApiPaymentTransaction(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
