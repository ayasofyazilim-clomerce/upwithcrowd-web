import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getProjectApi} from "@/actions/upwithcrowd/project/action";
import {getPublicProjectDetailByIdApi} from "@/actions/upwithcrowd/public-project/actions";
import ProjectDetails from "./client";

export default async function Page({params}: {params: {id: string}}) {
  const {id} = params;

  const projectDetailsResponseBasics = await getPublicProjectDetailByIdApi(id);
  const membersProject = await getProjectApi({
    maxResultCount: 100,
  });

  if (projectDetailsResponseBasics.type !== "success") return <>{projectDetailsResponseBasics.message}</>;

  const isEditable =
    typeof membersProject.data !== "string" &&
    membersProject.data.items?.some((project: UpwithCrowd_Projects_ListProjectsResponseDto) => project.id === id);

  return (
    <div className="bg-background min-h-screen">
      <ProjectDetails data={projectDetailsResponseBasics.data} isEditable={isEditable} />
    </div>
  );
}
