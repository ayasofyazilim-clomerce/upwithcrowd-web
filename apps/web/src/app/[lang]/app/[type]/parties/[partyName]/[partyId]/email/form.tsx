"use client";

import type {
  UniRefund_CRMService_Individuals_IndividualDto,
  UniRefund_CRMService_Organizations_OrganizationDto,
} from "@ayasofyazilim/saas/CRMService";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { emailSchema } from "@repo/ui/utils/table/form-schemas";
import { useRouter } from "next/navigation";
import { putCrmEmailAddressApi } from "src/app/[lang]/app/actions/CrmService/put-actions";
import type { EmailUpdateDto } from "src/app/[lang]/app/actions/CrmService/types";
import { handlePutResponse } from "src/app/[lang]/app/actions/api-utils-client";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PartyNameType } from "../../../types";

function Email({
  languageData,
  partyName,
  partyId,
  organizationData,
}: {
  languageData: CRMServiceServiceResource;
  partyName: Exclude<PartyNameType, "individuals">;
  partyId: string;
  organizationData:
    | UniRefund_CRMService_Organizations_OrganizationDto
    | UniRefund_CRMService_Individuals_IndividualDto
    | undefined;
}) {
  const router = useRouter();
  const emailValues = organizationData?.contactInformations?.[0]?.emails?.[0];

  function handleSubmit(formData: EmailUpdateDto) {
    void putCrmEmailAddressApi(partyName, {
      requestBody: formData,
      id: partyId,
      emailId: emailValues?.id || "",
    }).then((response) => {
      handlePutResponse(response, router);
    });
  }
  return (
    <SectionLayoutContent sectionId="email">
      <AutoForm
        fieldConfig={{
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        }}
        formClassName="pb-40 "
        formSchema={emailSchema}
        onSubmit={(values) => {
          handleSubmit(values as EmailUpdateDto);
        }}
        values={emailValues}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default Email;
