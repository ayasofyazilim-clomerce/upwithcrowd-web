"use server";
import type {
  GetApiTaskData,
  UpwithCrowd_Tasks_RoleType,
  UpwithCrowd_Tasks_TasksType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {getTaskApi} from "@upwithcrowd/tasks/action";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";
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

async function getApiRequests(searchParams: Partial<GetApiTaskData>) {
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

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
    taskId?: string[];
    tasksType: UpwithCrowd_Tasks_TasksType;
    roleType: UpwithCrowd_Tasks_RoleType | "ALL";
  };
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const baseLink = `/${lang}/support-center/${params.tasksType}/${params.roleType}`;

  // No longer accessing searchParams directly from props
  const apiRequests = await getApiRequests({
    tasksType: validateTasksType(params.tasksType),
    roleType: validateRoleType(params.roleType),
  });

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [taskResponse] = apiRequests.requiredRequests;
  return (
    <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-3">
      <TaskList baseLink={baseLink} taskId={params.taskId} taskResponse={taskResponse.data} />
      {children}
    </div>
  );
}
