"use server";

import { AccountServiceClient } from "@ayasofyazilim/core-saas/AccountService";
import { redirect } from "next/navigation";
import { structuredError, structuredResponse } from "./../api";
import { signOut } from "./auth";

const TOKEN_URL = `${process.env.TOKEN_URL}/connect/token`;
const OPENID_URL = `${process.env.OPENID_URL}/.well-known/openid-configuration`;
const HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};

export async function getAccountServiceClient(accessToken?: string) {
  return new AccountServiceClient({
    TOKEN: accessToken,
    BASE: process.env.ACCOUNT_URL,
    HEADERS: HEADERS,
  });
}

export async function signOutServer() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    return { error: "Unknown error" };
  }
  redirect("/login");
}
async function fetchScopes() {
  const scopes = await fetch(OPENID_URL)
    .then((response) => response.json())
    .then(
      (json: { scopes_supported?: string[] }) =>
        json.scopes_supported?.join(" ") || "",
    );
  return scopes;
}
export async function fetchToken(credentials: {
  username: string;
  password: string;
  tenantId?: string;
}) {
  const scopes = await fetchScopes();
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    grant_type: "password",
    client_id: process.env.CLIENT_ID || "",
    client_secret: process.env.CLIENT_SECRET || "",
    username: credentials.username,
    password: credentials.password,
    scope: scopes,
  };

  Object.entries(urlEncodedContent).forEach(([key, value]) =>
    urlencoded.append(key, value),
  );
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      // __tenant: credentials.tenantId || "",
    },
    body: urlencoded,
  });
  return await response.json();
}
export async function fetchNewAccessTokenByRefreshToken(refreshToken: string) {
  const urlencoded = new URLSearchParams();
  const urlEncodedContent: Record<string, string> = {
    client_id: "Angular",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  Object.entries(urlEncodedContent).forEach(([key, value]) =>
    urlencoded.append(key, value),
  );
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: urlencoded,
  });

  return await response.json();
}
async function getUserProfile(accessToken: string) {
  "use server";
  try {
    const client = await getAccountServiceClient(accessToken);
    const data = await client.profile.getApiAccountMyProfile();
    return structuredResponse(data);
  } catch (error) {
    return structuredError(error);
  }
}
async function getTenantData(accessToken: string) {
  "use server";
  try {
    const client = await getAccountServiceClient(accessToken);
    const data = await client.sessions.getApiAccountSessions();
    const activeSession = data.items?.[0];
    if (!activeSession?.tenantId || !activeSession.tenantName) {
      return structuredError({
        body: {
          error: { message: "Something went wrong while getting tenantData" },
        },
      });
    }
    return structuredResponse({
      tenantId: activeSession.tenantId,
      tenantName: activeSession.tenantName,
    });
  } catch (error) {
    return structuredError(error);
  }
}

export async function getUserData(
  accessToken: string,
  refresh_token: string,
  expiration_date: number,
) {
  "use server";
  const userProfileResponse = await getUserProfile(accessToken);
  if (userProfileResponse.type !== "success") {
    return Promise.reject("new Error(userProfileResponse.message)");
  }
  let tenantData = { tenantId: "", tenantName: "" };
  if (process.env.FETCH_TENANT) {
    const tenantDataResponse = await getTenantData(accessToken);
    if (tenantDataResponse.type === "success") {
      tenantData = tenantDataResponse.data;
    }
  }
  return {
    userName: userProfileResponse.data.userName || "",
    email: userProfileResponse.data.email || "",
    name: userProfileResponse.data.name || "",
    surname: userProfileResponse.data.surname || "",
    access_token: accessToken,
    refresh_token: refresh_token,
    expiration_date: expiration_date,
    ...tenantData,
  };
}
