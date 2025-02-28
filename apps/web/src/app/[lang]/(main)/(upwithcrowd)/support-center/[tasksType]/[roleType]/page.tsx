import {getTaskApi} from "@upwithcrowd/tasks/action";
import type {
  GetApiTaskData,
  UpwithCrowd_Tasks_RoleType,
  UpwithCrowd_Tasks_TasksType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import SupportTable from "../../_components/table";

function validateRoleType(roleType?: UpwithCrowd_Tasks_RoleType | "ALL") {
  switch (roleType?.toLowerCase()) {
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
export default async function SupportPage({
  params,
  searchParams,
}: {
  params: {lang: string; tasksType: UpwithCrowd_Tasks_TasksType; roleType: UpwithCrowd_Tasks_RoleType | "ALL"};
  searchParams?: GetApiTaskData;
}) {
  const response = await getTaskApi({
    ...searchParams,
    tasksType: params.tasksType,
    roleType: validateRoleType(params.roleType),
  });

  return <SupportTable taskResponse={response.data} />;
}
