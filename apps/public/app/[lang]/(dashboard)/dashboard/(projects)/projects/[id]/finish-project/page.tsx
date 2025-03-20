import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {
  getProjectByIdUpdatePermissionApi,
  getPublicProjectByIdMembersApi,
  getPublicProjectByIdStatisticsApi,
  getPublicProjectDetailByIdApi,
} from "@repo/actions/upwithcrowd/public-project/action";
import {getFileApi} from "@repo/actions/upwithcrowd/file/action";
import {getProjectByIdProjectInvestorApi} from "@repo/actions/upwithcrowd/project/action";
import {getPublicFileApi} from "@repo/actions/upwithcrowd/public-file/action";
import {getResourceData} from "@/language/core/Default";
import ProjectDetails from "./client";

async function getApiRequests(id: string, isAuth: boolean) {
  try {
    const optionalRequests = await Promise.allSettled([
      getProjectByIdUpdatePermissionApi({id}),
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
    };
    const requiredRequests = await Promise.all([
      getPublicProjectDetailByIdApi(id),
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
  const {lang, id} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests(id, true);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [projectDetailsResponseBasics, projectsMemberResponse, fileResponse, imageResponse] =
    apiRequests.requiredRequests;
  const [isEditableResponse, investorResponse, statsResponse] = apiRequests.optionalRequests;
  const isEditable = isEditableResponse.status === "fulfilled" ? isEditableResponse.value.data : false;
  const investorResponseData = investorResponse.status === "fulfilled" ? investorResponse.value.data : null;
  const statsResponseData = statsResponse.status === "fulfilled" ? statsResponse.value.data : null;

  return (
    <div className="h-auto">
      <ProjectDetails
        data={projectDetailsResponseBasics.data}
        fileResponse={fileResponse.data}
        imageResponse={imageResponse.data}
        investorResponse={investorResponseData}
        isEditable={isEditable}
        projectsMember={projectsMemberResponse.data}
        statsResponse={statsResponseData}
      />
    </div>
  );
}
