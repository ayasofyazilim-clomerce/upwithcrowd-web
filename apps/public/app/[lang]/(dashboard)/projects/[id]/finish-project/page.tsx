import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/Default";
import {getPublicProjectDetailByIdApi} from "@/actions/upwithcrowd/public-project/actions";
import ProjectDetails from "./client";

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

export default async function Page({params}: {params: {id: string; lang: string}}) {
  const {lang, id} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests(id);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [projectDetailsResponseBasics] = apiRequests.requiredRequests;

  return (
    <div className="bg-muted h-auto">
      <ProjectDetails data={projectDetailsResponseBasics.data} />
    </div>
  );
}
