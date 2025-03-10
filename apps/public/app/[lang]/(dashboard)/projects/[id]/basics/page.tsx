import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import ErrorComponent from "@repo/ui/components/error-component";
import {getCategoryApi, getTypeApi} from "@repo/actions/upwithcrowd/category-project/action";
import {getPublicProjectDetailByIdApi} from "@repo/actions/upwithcrowd/public-project/action";
import {getResourceData} from "@/language/core/Default";
import ClientBasics from "./client";

async function getApiRequests(id: string) {
  try {
    const requiredRequests = await Promise.all([getPublicProjectDetailByIdApi(id)]);
    const optionalRequests = await Promise.allSettled([getCategoryApi(), getTypeApi()]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}
export default async function Basics({params}: {params: {id: string; lang: string}}) {
  const {id, lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests(id);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [projectDetailResponse] = apiRequests.requiredRequests;
  const [categoryResponse, typeResponse] = apiRequests.optionalRequests;

  const pageData = {
    projectDetail: projectDetailResponse.data,
    category: categoryResponse.status === "fulfilled" ? categoryResponse.value.data : null,
    type: typeResponse.status === "fulfilled" ? typeResponse.value.data : null,
  };

  return (
    <div className="bg-muted">
      <ClientBasics data={pageData} />
    </div>
  );
}
