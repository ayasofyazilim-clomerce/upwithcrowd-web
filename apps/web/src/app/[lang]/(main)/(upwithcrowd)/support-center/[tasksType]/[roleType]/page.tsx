import type {
  GetApiTaskData,
  UpwithCrowd_Tasks_RoleType,
  UpwithCrowd_Tasks_TasksType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getTaskApi} from "@upwithcrowd/tasks/action";
import ClientPage from "./client";

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
export default async function SupportPage({
  params,
  searchParams,
}: {
  params: {lang: string; tasksType: UpwithCrowd_Tasks_TasksType; roleType: UpwithCrowd_Tasks_RoleType | "ALL"};
  searchParams?: GetApiTaskData;
}) {
  const response = await getTaskApi({
    ...searchParams,
    tasksType: validateTasksType(params.tasksType),
    roleType: validateRoleType(params.roleType),
  });

  return <ClientPage taskResponse={response.data} />;
}
