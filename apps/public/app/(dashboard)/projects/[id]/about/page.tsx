import type {PagedResultDto_ListProjectsMembersResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getCustomRolesApi} from "@/actions/upwithcrowd/roles/action";
import {getProjectByIdMembersApi} from "@/actions/upwithcrowd/project/action";
import ClientAbout from "./client";

const mockAboutDetail = {
  nationality: "Türkiye",
  education: "Lisans - Bilgisayar Mühendisliği",
  workExperience: "5 yıl yazılım geliştirme deneyimi",
  expertise: "Web Geliştirme, Mobile App, Cloud Computing",
  cv: "",
  linkedin: "https://linkedin.com/in/example",
  twitter: "https://twitter.com/example",
  website: "https://example.com",
};

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
      <ClientAbout aboutDetail={mockAboutDetail} projectMember={projectMember} roles={roles} />
    </div>
  );
}
