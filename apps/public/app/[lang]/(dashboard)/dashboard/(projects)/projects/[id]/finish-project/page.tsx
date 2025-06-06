"use server";
import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getFileApi} from "@repo/actions/upwithcrowd/file/actions";
import {getProjectApi, getProjectByIdProjectInvestorApi} from "@repo/actions/upwithcrowd/project/action";
import {getPublicFileApi} from "@repo/actions/upwithcrowd/public-file/action";
import {
  getPublicProjectByIdMembersApi,
  getPublicProjectByIdStatisticsApi,
} from "@repo/actions/upwithcrowd/public-project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {checkNonEmptyArray} from "@repo/ui/utils";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {unstable_noStore as noStore} from "next/cache";
import {getResourceData} from "@/language/core/Default";
import ProjectDetails from "./client";

async function getApiRequests(id: string, isAuth: boolean) {
  try {
    const optionalRequests = await Promise.allSettled([
      getProjectByIdProjectInvestorApi({id, sorting: "amount desc", maxResultCount: 999}),
      getPublicProjectByIdStatisticsApi(id),
    ]);
    const paramsMaterials = {
      relatedEntity: "Project",
      relatedId: id,
      fileTypeGroup: "ProjectMaterials",
    };
    const paramsFiles = {
      relatedEntity: "Project",
      relatedId: id,
      fileTypeGroup: "ProjectRelatedFiles",
    };
    const requiredRequests = await Promise.all([
      getProjectApi({id}),
      !isAuth ? {data: null} : getPublicProjectByIdMembersApi(id),

      !isAuth ? getPublicFileApi(paramsFiles) : getFileApi(paramsFiles),
      !isAuth ? getPublicFileApi(paramsMaterials) : getFileApi(paramsMaterials),
    ]);

    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}
export default async function Page({params}: {params: {id: string; lang: string}}) {
  noStore();
  const {lang, id} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests(id, true);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [projectDetailsResponseBasics, projectsMemberResponse, fileResponse, imageResponse] =
    apiRequests.requiredRequests;

  const projectDetail = projectDetailsResponseBasics.data.items || [];
  if (!checkNonEmptyArray<UpwithCrowd_Projects_ListProjectsResponseDto>(projectDetail)) {
    return null;
  }

  const [investorResponse, statsResponse] = apiRequests.optionalRequests;
  const investorResponseData = investorResponse.status === "fulfilled" ? investorResponse.value.data : null;
  const statsResponseData = statsResponse.status === "fulfilled" ? statsResponse.value.data : null;

  return (
    <div className="h-auto">
      <ProjectDetails
        data={projectDetail[0]}
        fileResponse={fileResponse.data}
        imageResponse={imageResponse.data}
        investorResponse={investorResponseData}
        projectsMember={projectsMemberResponse.data}
        statsResponse={statsResponseData}
      />
    </div>
  );
}
