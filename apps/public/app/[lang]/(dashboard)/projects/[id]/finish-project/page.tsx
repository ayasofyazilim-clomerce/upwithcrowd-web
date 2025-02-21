import {getPublicProjectDetailByIdApi} from "@/actions/upwithcrowd/public-project/actions";
import ProjectDetails from "./client";

export default async function Page({params}: {params: {id: string}}) {
  const {id} = params;

  const projectDetailsResponseBasics = await getPublicProjectDetailByIdApi(id);

  if (projectDetailsResponseBasics.type !== "success") return <>{projectDetailsResponseBasics.message}</>;

  return (
    <div className="bg-muted h-auto">
      <ProjectDetails data={projectDetailsResponseBasics.data} />
    </div>
  );
}
