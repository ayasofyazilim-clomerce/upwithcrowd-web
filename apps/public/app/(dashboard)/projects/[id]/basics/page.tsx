import ClientBasics from "./client";
import {getPublicProjectDetailsApi} from "@/actions/upwithcrowd/project/action";

export default async function Basics({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const {id} = params;
  const projectDetail = await getPublicProjectDetailsApi(id);
  if (projectDetail.type !== "success") return <>yok</>;
  return (
    <div>
      <ClientBasics
        projectDetail={{
          ...projectDetail.data,
          projectName: projectDetail.data.projectName || "",
          projectDefinition: projectDetail.data.projectDefinition || "",
          projectEndDate: projectDetail.data.projectEndDate || new Date().toISOString(),
          projectStartDate: projectDetail.data.projectStartDate || new Date().toISOString(),
          categoryTypes: projectDetail.data.categoryTypes || [],
          projectTypes: projectDetail.data.projectTypes || [],
          sectorId: projectDetail.data.sectorId || "",
        }}
      />
    </div>
  );
}
