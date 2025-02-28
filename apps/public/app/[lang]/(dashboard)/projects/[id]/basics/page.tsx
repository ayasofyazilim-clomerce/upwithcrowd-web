import {getPublicProjectDetailByIdApi} from "@/actions/upwithcrowd/public-project/actions";
import {getCategoryApi, getTypeApi} from "@/actions/upwithcrowd/category-project/action";
import ClientBasics from "./client";

export default async function Basics({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const {id} = params;

  // Fetch both data in parallel
  const [projectDetailResponse, categoryResponse, typeResponse] = await Promise.all([
    getPublicProjectDetailByIdApi(id),
    getCategoryApi(),
    getTypeApi(),
  ]);

  if (projectDetailResponse.type !== "success") return <>Proje detayları yüklenemedi</>;

  const pageData = {
    projectDetail: projectDetailResponse.data,
    category: typeof categoryResponse.data === "string" ? null : categoryResponse.data,
    type: typeof typeResponse.data === "string" ? null : typeResponse.data,
  };

  return (
    <div className="bg-muted">
      <ClientBasics data={pageData} />
    </div>
  );
}
