"use server";

import {getProjectByIdProjectInvestorApi} from "@repo/actions/upwithcrowd/project/action";
import {getPublicFileApi} from "@repo/actions/upwithcrowd/public-file/action";
import {
  getProjectByIdUpdatePermissionApi,
  getPublicProjectByIdMembersApi,
  getPublicProjectDetailByIdApi,
} from "@repo/actions/upwithcrowd/public-project/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {permanentRedirect} from "next/navigation";
import {getResourceData} from "@/language/core/Default";
import ProjectDetails from "./client";

async function getApiRequests(id: string) {
  try {
    const requiredRequests = await Promise.all([
      getPublicProjectDetailByIdApi(id),
      getPublicProjectByIdMembersApi(id),
      getPublicFileApi({
        fileTypeGroup: "ProjectMaterials",
        relatedEntity: "Project",
        relatedId: id,
      }),
    ]);
    const optionalRequests = await Promise.allSettled([
      getProjectByIdUpdatePermissionApi({id}),
      getProjectByIdProjectInvestorApi({id, sorting: "amount desc", maxResultCount: 999}),
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

  const apiRequests = await getApiRequests(id);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [projectDetailsResponseBasics, projectsMemberResponse, fileResponse] = apiRequests.requiredRequests;
  const [isEditableResponse, investorResponse] = apiRequests.optionalRequests;
  const isEditable = isEditableResponse.status === "fulfilled" ? isEditableResponse.value.data : false;
  const investorResponseData = investorResponse.status === "fulfilled" ? investorResponse.value.data : null;

  if (projectDetailsResponseBasics.data.status !== "Approved" && !isEditable) {
    return permanentRedirect(`/${lang}/projects`);
  }
  return (
    <div className="bg-background min-h-screen">
      <ProjectDetails
        data={projectDetailsResponseBasics.data}
        fileResponse={fileResponse.data}
        investorResponse={investorResponseData}
        isEditable={isEditable}
        projectsMember={projectsMemberResponse.data}
      />
    </div>
  );
}
