"use server";

import type {UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getMemberApi} from "@repo/actions/upwithcrowd/member/actions";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {bulkCreateUiSchema, createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import ErrorComponent from "@repo/ui/components/error-component";
import {structuredError} from "@repo/utils/api";
import {isRedirectError} from "next/dist/client/components/redirect";
import {getResourceData} from "@/language-data/core/Default";

async function getApiRequests(memberId: string) {
  try {
    const requiredRequests = await Promise.all([getMemberApi({id: memberId})]);
    const optionalRequests = await Promise.allSettled([]);
    return {requiredRequests, optionalRequests};
  } catch (error) {
    if (!isRedirectError(error)) {
      return structuredError(error);
    }
    throw error;
  }
}

export default async function Page({
  params,
}: {
  params: {
    lang: string;
    memberId: string;
  };
}) {
  const {lang} = params;
  const {languageData} = await getResourceData(lang);

  const apiRequests = await getApiRequests(params.memberId);
  if ("message" in apiRequests) {
    return <ErrorComponent languageData={languageData} message={apiRequests.message} />;
  }
  const [memberResponse] = apiRequests.requiredRequests;
  const member = memberResponse.data.items?.[0] || null;
  if (!member) return null;
  const filterKeys = [];
  if (member.type === "Organization") {
    filterKeys.push("name", "surname", "mobile");
  } else {
    filterKeys.push("title", "tel");
  }
  const uiSchema = createUiSchemaWithResource({
    schema: $UpwithCrowd_Members_ListMemberResponseDto,
    resources: {
      "Form.type": "Üye türü",
      "Form.idType": "Kimlik türü",
      "Form.identifier": "Kimlik no",
      "Form.id": "Üye ID",
      "Form.name": "Ad",
      "Form.surname": "Soyad",
      "Form.title": "Ünvan",
      "Form.mail": "E-posta",
      "Form.tel": "Telefon",
      "Form.mobile": "Cep telefonu",
      "Form.annualIncome": "Yıllık gelir",
      "Form.isInvestor": "Yatırımcı mı?",
      "Form.isEntrepreneur": "Girişimci mi?",
      "Form.qualifiedCheck": "Niteklikli yatırımcı mı?",
      "Form.fullNameCheck": "Ad soyad doğrulandı mı?",
      "Form.isValidated": "Doğrulandı mı?",
    },
    extend: {
      "ui:className": "grid md:grid-cols-2 max-w-4xl p-0",
      idType: {"ui:options": {disabled: true}},
      mail: {"ui:className": "col-span-full"},
      tel: {"ui:className": "col-span-full"},
      title: {"ui:className": "col-span-full"},
      annualIncome: {"ui:className": member.type === "Organization" ? "col-span-full" : ""},
      ...switches,
    },
  });

  return (
    <SchemaForm
      className="p-px"
      disabled
      filter={{
        type: "exclude",
        keys: ["id", "type", "fullNameCheck", ...filterKeys],
      }}
      formData={member}
      liveValidate={false}
      readonly
      schema={$UpwithCrowd_Members_ListMemberResponseDto}
      uiSchema={uiSchema}
      useDefaultSubmit={false}
    />
  );
}
const switches = bulkCreateUiSchema<UpwithCrowd_Members_ListMemberResponseDto>({
  config: {
    "ui:widget": "switch",
    "ui:className": "border px-2 rounded-md",
  },
  elements: ["isInvestor", "isEntrepreneur", "qualifiedCheck", "fullNameCheck", "isValidated"],
});
