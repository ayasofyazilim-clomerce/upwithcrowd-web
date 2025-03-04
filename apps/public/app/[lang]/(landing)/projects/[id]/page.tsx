import type {
  PagedResultDto_ListProjectsMembersResponseDto,
  UpwithCrowd_Files_FileResponseListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getFileApi} from "@/actions/upwithcrowd/images/action";
import {getProjectByIdMembersApi} from "@/actions/upwithcrowd/project/action";
import {
  getPublicProjectByIdMembersApi,
  getPublicProjectDetailByIdApi,
} from "@/actions/upwithcrowd/public-project/actions";
import {getResourceData} from "@/language/core/Default";
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
  const isEditable = false;
  const {lang, id} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests(id);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [projectDetailsResponseBasics] = apiRequests.requiredRequests;

  let projectsMemberResponse = await getProjectByIdMembersApi(id);
  if (projectsMemberResponse.type !== "success") {
    projectsMemberResponse = await getPublicProjectByIdMembersApi(id);
  }

  const defaultMembersData: PagedResultDto_ListProjectsMembersResponseDto = {
    items: [],
    totalCount: 0,
  };

  const fileResponse = await getFileApi({
    fileType: "ProjectImages",
    fileTypeGroup: "Project",
    relatedEntity: "Project",
    relatedId: id,
  });

  // Create a default empty file response in case of error
  const defaultFileResponse: UpwithCrowd_Files_FileResponseListDto = {
    fileId: null,
    fileName: null,
    fullPath: null,
  };

  // Use the entire file response data or default if no items exist
  const fileResponseData: UpwithCrowd_Files_FileResponseListDto[] =
    fileResponse.type === "success" && fileResponse.data.length > 0 ? fileResponse.data : [defaultFileResponse];

  return (
    <div className="bg-background min-h-screen">
      <ProjectDetails
        data={projectDetailsResponseBasics.data}
        fileResponse={fileResponseData}
        isEditable={isEditable}
        projectsMember={
          typeof projectsMemberResponse.data === "string" ? defaultMembersData : projectsMemberResponse.data
        }
      />
    </div>
  );
}
