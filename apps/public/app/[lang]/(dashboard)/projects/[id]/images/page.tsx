import {getApiFileTypeGroupFileTypeGroupRulesetApi} from "@repo/actions/upwithcrowd/file-type-group/actions";
import {getFileApi} from "@repo/actions/upwithcrowd/file/action";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/AccountService";
import ImagesClient from "./client";

async function getApiRequests(id: string) {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([
      getApiFileTypeGroupFileTypeGroupRulesetApi({namespace: "ProjectMaterials"}, session),
      getFileApi({
        fileTypeGroup: "ProjectMaterials",
        relatedEntity: "Project",
        relatedId: id,
      }),
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

export default async function ImagesPage({
  params,
}: {
  params: {
    id: string;
    lang: string;
  };
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests(params.id);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [fileTypeGroupResponse, fileResponse] = apiRequests.requiredRequests;

  return (
    <ImagesClient
      fileResponse={fileResponse.data}
      fileTypeGroupResponse={fileTypeGroupResponse.data}
      projectId={params.id}
    />
  );
}
