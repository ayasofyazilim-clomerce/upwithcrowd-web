"use server";
import {getAccountServiceClient} from "../auth/auth-actions";
import {auth} from "../auth/auth";
import {AccountServiceClient} from "@ayasofyazilim/core-saas/AccountService";

export async function getGrantedPoliciesApi(isAdmin?: boolean) {
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
    if (isAdmin && !grantedPolicies?.["AbpIdentity.Users"]) {
      throw {message: "You are not allowed to login here.", type: "api-error", data: "test"};
    }
    return grantedPolicies;
  } catch (error) {
    throw error;
  }
}
