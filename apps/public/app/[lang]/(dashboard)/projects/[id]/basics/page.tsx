import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import ErrorComponent from "@repo/ui/components/error-component";
import {getCategoryApi, getTypeApi} from "@/actions/upwithcrowd/category-project/action";
import {getPublicProjectDetailByIdApi} from "@/actions/upwithcrowd/public-project/actions";
import {getResourceData} from "@/language/core/Default";
import ClientBasics from "./client";

async function getApiRequests(id: string) {
  try {
    const requiredRequests = await Promise.all([getPublicProjectDetailByIdApi(id)]);
    const optionalRequests = await Promise.allSettled([]);
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

  // Fetch both data in parallel
  const [categoryResponse, typeResponse] = await Promise.all([getCategoryApi(), getTypeApi()]);

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
