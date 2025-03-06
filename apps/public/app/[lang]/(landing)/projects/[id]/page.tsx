import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getFileApi} from "@/actions/upwithcrowd/images/action";
import {
  getPublicProjectByIdMembersApi,
  getPublicProjectDetailByIdApi,
} from "@/actions/upwithcrowd/public-project/actions";
import {getResourceData} from "@/language/core/Default";
import {getApiPaymentTransactionApi} from "@/actions/upwithcrowd/payment-transaction/action";
import {getProjectByIdUpdatePermissionApi} from "@/actions/upwithcrowd/project/action";
import ProjectDetails from "./client";

async function getApiRequests(id: string) {
  try {
    const requiredRequests = await Promise.all([
      getPublicProjectDetailByIdApi(id),
      getPublicProjectByIdMembersApi(id),
      getFileApi({
        fileType: "ProjectImages",
        fileTypeGroup: "Project",
        relatedEntity: "Project",
        relatedId: id,
      }),
    ]);
    const optionalRequests = await Promise.allSettled([
      getApiPaymentTransactionApi({
        maxResultCount: 999,
      }),
      getProjectByIdUpdatePermissionApi({id}),
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
  const [paymentsResponse, isEditableResponse] = apiRequests.optionalRequests;
  const paymentData = paymentsResponse.status === "fulfilled" ? paymentsResponse.value.data : {totalCount: 0};
  const isEditable = isEditableResponse.status === "fulfilled" ? isEditableResponse.value.data : false;
  return (
    <div className="bg-background min-h-screen">
      <ProjectDetails
        data={projectDetailsResponseBasics.data}
        fileResponse={fileResponse.data}
        isEditable={isEditable}
        paymentResponse={paymentData}
        projectsMember={projectsMemberResponse.data}
      />
    </div>
  );
}
