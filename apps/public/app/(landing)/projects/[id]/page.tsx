import ProjectDetails from "./client";
import {getPublicProjectDetailByIdApi} from "@/actions/upwithcrowd/public-project/actions";
export default async function Page({params}: {params: {id: string}}) {
  const {id} = params;

  const projectDetailsResponseBasics = await getPublicProjectDetailByIdApi(id);

  if (projectDetailsResponseBasics.type !== "success") return <>{projectDetailsResponseBasics.message}</>;

  return (
    <div className="bg-background min-h-screen">
      <ProjectDetails data={projectDetailsResponseBasics.data} />
    </div>
  );
}
