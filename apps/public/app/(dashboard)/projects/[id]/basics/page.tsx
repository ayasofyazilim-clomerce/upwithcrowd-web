import {getPublicProjectDetailsApi} from "@/actions/upwithcrowd/project/action";
import ClientBasics from "./client";

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
    <div className="bg-muted">
      <ClientBasics projectDetail={projectDetail.data} />
    </div>
  );
}
