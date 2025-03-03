import type {
  UpwithCrowd_Tasks_RoleType,
  UpwithCrowd_Tasks_TasksType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {getTaskCommentApi} from "@upwithcrowd/task-comment/action";
import {getTaskApi} from "@upwithcrowd/tasks/action";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
import TaskDetail from "../_components/task-detail";

async function getApiRequests(taskId: string) {
  try {
    const requiredRequests = await Promise.all([getTaskApi({id: taskId}), getTaskCommentApi({tasksId: taskId})]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}
export default async function SupportPage({
  params,
}: {
  params: {
    lang: string;
    tasksType: UpwithCrowd_Tasks_TasksType;
    roleType: UpwithCrowd_Tasks_RoleType | "ALL";
    taskId?: string[];
  };
}) {
  const {lang, taskId} = params;

  if (!taskId?.length) return <></>;

  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests(taskId[0]);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [taskResponse, taskCommentResponse] = apiRequests.requiredRequests;
  const taskData = taskResponse.data.items?.[0];
  if (!taskData) {
    return <ErrorComponent languageData={languageData} message="Task not found" />;
  }

  return <TaskDetail taskCommentResponse={taskCommentResponse.data} taskData={taskData} />;
}
