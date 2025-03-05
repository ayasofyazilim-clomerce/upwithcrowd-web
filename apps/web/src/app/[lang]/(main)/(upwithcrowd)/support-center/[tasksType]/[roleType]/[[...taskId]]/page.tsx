"use server";
import type {
  GetApiTaskData,
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
import TaskList from "../_components/task-list";

function validateRoleType(roleType: UpwithCrowd_Tasks_RoleType | "ALL") {
  switch (roleType.toLowerCase()) {
    case "investor":
      return "Investor";
    case "entrepreuner":
      return "Entrepreuner";
    case "tenant":
      return "Tenant";
    default:
      return undefined;
  }
}
function validateTasksType(tasksType: UpwithCrowd_Tasks_TasksType) {
  switch (tasksType.toLowerCase()) {
    case "support":
      return "Support";
    case "issue":
      return "Issue";
    default:
      return undefined;
  }
}
async function getApiRequests(searchParams: GetApiTaskData, taskId?: string) {
  try {
    const requiredRequests = await Promise.all([
      getTaskApi(searchParams),
      taskId ? getTaskApi({id: taskId}) : null,
      getTaskCommentApi({tasksId: taskId}),
    ]);
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
  searchParams,
}: {
  params: {
    lang: string;
    tasksType: UpwithCrowd_Tasks_TasksType;
    roleType: UpwithCrowd_Tasks_RoleType | "ALL";
    taskId?: string[];
  };
  searchParams?: GetApiTaskData;
}) {
  const {lang, taskId} = params;
  const baseLink = `/${lang}/support-center/${params.tasksType}/${params.roleType}`;

  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests(
    {
      ...searchParams,
      tasksType: validateTasksType(params.tasksType),
      roleType: validateRoleType(params.roleType),
    },
    taskId?.length ? taskId[0] : undefined,
  );

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [taskListResponse, taskDetailResponse, taskCommentResponse] = apiRequests.requiredRequests;
  const taskData = taskDetailResponse?.data.items?.[0];

  return (
    <div className="my-2 grid grid-cols-1 gap-4 pb-4 md:grid-cols-3 md:gap-3">
      <TaskList baseLink={baseLink} taskId={params.taskId} taskResponse={taskListResponse.data} />
      {taskData ? <TaskDetail taskCommentResponse={taskCommentResponse.data} taskData={taskData} /> : null}
    </div>
  );
}
