import ProjectDetails from "./client";
import { getPublicProjectDetailsApi } from "@/actions/upwithcrowd/public-project/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const projectDetailsResponse = await getPublicProjectDetailsApi(id);
  if (projectDetailsResponse.type !== "success")
    return <>{projectDetailsResponse.message}</>;

  return (
    <div className="bg-background min-h-screen">
      <ProjectDetails project={projectDetailsResponse.data} />
    </div>
  );
}
