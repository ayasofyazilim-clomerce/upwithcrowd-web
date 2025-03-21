import type {PagedResultDto_ListProjectsMembersResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getCustomRolesApi} from "@repo/actions/upwithcrowd/roles/action";
import {getProjectByIdMembersApi} from "@repo/actions/upwithcrowd/project/action";
import ClientAbout from "./client";

export default async function About({params}: {params: {id: string}}) {
  const responseRoles = await getCustomRolesApi();
  const projectMemberResponse = await getProjectByIdMembersApi(params.id);

  const roles = {
    items: [],
    totalCount: 0,
    ...(responseRoles.type === "success" ? responseRoles.data : {}),
  };

  const projectMember: PagedResultDto_ListProjectsMembersResponseDto = {
    items: [],
    totalCount: 0,
    ...(projectMemberResponse.type === "success" ? projectMemberResponse.data : {}),
  };

  return (
    <div>
      <ClientAbout projectMember={projectMember} roles={roles} />
    </div>
  );
}
