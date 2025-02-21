import type {
  UpwithCrowd_Projects_ListProjectsResponseDto,
  PagedResultDto_ListProjectsMembersResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProjectApi, getProjectByIdMembersApi} from "@/actions/upwithcrowd/project/action";
import {
  getPublicProjectDetailByIdApi,
  getPublicProjectByIdMembersApi,
} from "@/actions/upwithcrowd/public-project/actions";
import ProjectDetails from "./client";

export default async function Page({params}: {params: {id: string}}) {
  const {id} = params;

  const projectDetailsResponseBasics = await getPublicProjectDetailByIdApi(id);
  const membersProject = await getProjectApi({
    maxResultCount: 100,
  });

  let projectsMemberResponse = await getProjectByIdMembersApi(id);

  if (projectDetailsResponseBasics.type !== "success") return <>projectdetail {projectDetailsResponseBasics.message}</>;
  if (projectsMemberResponse.type !== "success") {
    projectsMemberResponse = await getPublicProjectByIdMembersApi(id);
  }

  const defaultMembersData: PagedResultDto_ListProjectsMembersResponseDto = {
    items: [],
    totalCount: 0,
  };

  const isEditable =
    typeof membersProject.data !== "string" &&
    membersProject.data.items?.some((project: UpwithCrowd_Projects_ListProjectsResponseDto) => project.id === id);

  return (
    <div className="bg-background min-h-screen">
      <ProjectDetails
        data={projectDetailsResponseBasics.data}
        isEditable={isEditable}
        projectsMember={
          typeof projectsMemberResponse.data === "string" ? defaultMembersData : projectsMemberResponse.data
        }
      />
    </div>
  );
}
