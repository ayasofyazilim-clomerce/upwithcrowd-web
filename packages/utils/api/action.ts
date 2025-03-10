"use server";
import {getAccountServiceClient} from "../auth/auth-actions";
import {auth} from "../auth/auth";
import {AccountServiceClient} from "@ayasofyazilim/core-saas/AccountService";

export async function getGrantedPoliciesApi() {
  try {
    const session = await auth();
    const client = new AccountServiceClient({
      TOKEN: session?.user?.access_token,
      BASE: process.env.BASE_URL,
      HEADERS: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    });
    const response = await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration({
      includeLocalizationResources: false,
    });
    const grantedPolicies = response.auth?.grantedPolicies;
    return grantedPolicies;
  } catch (error) {
    return undefined;
  }
}
