import {getApiFileTypeGroupRulesetApi} from "@repo/actions/upwithcrowd/file-type-group/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getFileApi} from "@repo/actions/upwithcrowd/file/actions";
import {unstable_noStore as noStore} from "next/cache";
import type {Session} from "@repo/utils/auth";
import {getResourceData} from "@/language/core/AccountService";
import NewPersonalAccount from "./client";

async function getApiRequests(session: Session | null) {
  try {
    const requiredRequests = await Promise.all([
      getApiFileTypeGroupRulesetApi({namespace: "OrganizationOfficialDocuments"}, session),
      getFileApi({
        fileTypeGroup: "OrganizationOfficialDocuments",
        relatedEntity: "Member",
        relatedId: session?.user?.member_id || "",
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
  noStore();
  const {lang} = params;
  const {languageData} = await getResourceData(lang);
  const session = await auth();

  const apiRequests = await getApiRequests(session);

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [memberDocumentsResponse, fileResponse] = apiRequests.requiredRequests;
  return (
    <div>
      <NewPersonalAccount
        fileResponse={fileResponse.data}
        memberDocuments={memberDocumentsResponse.data}
        memberId={session?.user?.member_id || ""}
      />
    </div>
  );
}
