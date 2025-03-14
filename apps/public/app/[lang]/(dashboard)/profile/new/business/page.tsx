import {getApiFileTypeGroupFileTypeGroupRulesetApi} from "@repo/actions/upwithcrowd/file-type-group/actions";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {auth} from "@repo/utils/auth/next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language/core/AccountService";
import NewBusinessAccount from "./client";

async function getApiRequests() {
  try {
    const session = await auth();
    const requiredRequests = await Promise.all([
      getApiFileTypeGroupFileTypeGroupRulesetApi({namespace: "OrganizationOfficialDocuments"}, session),
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

  const session = await auth();

  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }

  const [fileTypeGroupTestResponse] = apiRequests.requiredRequests;

  return (
    <div>
      <NewBusinessAccount
        propertyId={
          Array.isArray(session?.user?.member_id) ? session.user.member_id[0] : session?.user?.member_id || ""
        }
        ruleset={fileTypeGroupTestResponse.data}
      />
    </div>
  );
}
