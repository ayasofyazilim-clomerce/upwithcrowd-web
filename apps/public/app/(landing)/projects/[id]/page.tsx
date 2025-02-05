import ProjectDetails from "./client";
import {getPublicProjectDetailsApi, getPublicProjectDetailsFundingApi} from "@/actions/upwithcrowd/project/action";

export default async function Page({params}: {params: {id: string}}) {
  const {id} = params;

  const projectDetailsResponseBasics = await getPublicProjectDetailsApi(id);
  const projectDetailsResponseFunding = await getPublicProjectDetailsFundingApi(id);

  if (projectDetailsResponseBasics.type !== "success") return <>{projectDetailsResponseBasics.message}</>;

  if (projectDetailsResponseFunding.type !== "success") return <>{projectDetailsResponseBasics.message}</>;

  return (
    <div className="bg-background min-h-screen">
      <ProjectDetails funding={projectDetailsResponseFunding.data} basics={projectDetailsResponseBasics.data} />
    </div>
  );
}
