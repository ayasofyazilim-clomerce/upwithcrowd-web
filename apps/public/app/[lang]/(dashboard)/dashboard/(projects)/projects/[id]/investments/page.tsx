import {
  getProjectByIdMyprojectInvestorApi,
  getProjectStatisticsByIdApi,
} from "@repo/actions/upwithcrowd/project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import ProjectInvestorClient from "./client";

async function getApiRequests(id: string) {
  try {
    const requiredRequests = await Promise.all([
      getProjectByIdMyprojectInvestorApi({id}),
      getProjectStatisticsByIdApi({id}),
    ]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function ProjectInvestorPage({params}: {params: {id: string}}) {
  const apiRequests = await getApiRequests(params.id);

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={{SomethingWentWrong: "Something went wrong"}} message={apiRequests.message} />;
  }
  const [projectsResponse, statsResponse] = apiRequests.requiredRequests;

  return <ProjectInvestorClient investorResponse={projectsResponse.data} statsResponse={statsResponse.data} />;
}
