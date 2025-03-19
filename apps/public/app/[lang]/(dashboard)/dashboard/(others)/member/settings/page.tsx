import {getApiFileTypeGroupRulesetApi} from "@repo/actions/upwithcrowd/file-type-group/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getFileApi} from "@repo/actions/upwithcrowd/file/action";
import {getResourceData} from "@/language/core/AccountService";
import NewPersonalAccount from "./client";

async function getApiRequests() {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([
      getApiFileTypeGroupRulesetApi({namespace: "OrganizationOfficialDocuments"}, session),
      getFileApi({
        fileTypeGroup: "OrganizationOfficialDocuments",
        relatedEntity: "Member",
        relatedId: Array.isArray(session?.user?.member_id)
          ? session.user.member_id[0] || ""
          : session?.user?.member_id || "",
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

export default async function NewBusinessAccountServer({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests();

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [memberDocumentsResponse, fileResponse] = apiRequests.requiredRequests;

  return (
    <div>
      <NewPersonalAccount fileResponse={fileResponse.data} memberDocuments={memberDocumentsResponse.data} />
    </div>
  );
}
