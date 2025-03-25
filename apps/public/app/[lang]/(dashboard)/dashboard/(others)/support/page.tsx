import {getTaskApi} from "@repo/actions/upwithcrowd/tasks/action";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import type {GetApiTaskData} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import EmptySupportRequestState from "../_components/empty-support-request-state";
import SupportClient from "./client";

async function getApiRequests(searchParams: GetApiTaskData) {
  try {
    const requiredRequests = await Promise.all([getTaskApi(searchParams)]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function SupportPage({searchParams}: {searchParams: GetApiTaskData}) {
  const apiRequests = await getApiRequests(searchParams);
  if ("message" in apiRequests) {
    return <EmptySupportRequestState />;
  }

  const [supportRequestResponse] = apiRequests.requiredRequests;
  const tasks = supportRequestResponse.data;
  if (tasks.totalCount === 0) {
    return <EmptySupportRequestState />;
  }

  return <SupportClient taskResponse={supportRequestResponse.data} />;
}
