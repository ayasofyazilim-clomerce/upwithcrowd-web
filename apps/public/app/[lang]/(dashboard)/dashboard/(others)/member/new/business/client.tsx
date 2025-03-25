"use client";
import {postApiMember} from "@repo/actions/upwithcrowd/member/post-action";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {handlePostResponse} from "@repo/utils/api";
import {useTransition} from "react";
import {useMember} from "@/app/providers/member";
import "react-international-phone/style.css";

const $BusinessAccount = {
  type: "object",
  properties: {
    identifier: {type: "string", minLength: 10, maxLength: 10},
    title: {type: "string"},
    tel: {type: "string"},
    mail: {type: "string", format: "email"},
    annualIncome: {type: "number", minimum: 1},
    maskInvestorProfile: {type: "boolean"},
  },
  required: ["identifier", "title", "mail"],
};
interface BusinessAccount {
  identifier: string;
  title: string;
  tel: string;
  annualIncome: number;
  mail: string;
  maskInvestorProfile: boolean;
}

export function NewBusinessAccountForm() {
  const [isPending, startTransition] = useTransition();
  const {setCurrentMember} = useMember();
  const uiSchema = createUiSchemaWithResource({
    resources: {
      "Form.identifier": "VKN (Vergi Kimlik Numarası)",
      "Form.annualIncome": "Yıllık Gelir",
      "Form.title": "Ünvan",
      "Form.tel": "Telefon",
      "Form.mail": "E-posta",
      "Form.maskInvestorProfile": "Yatırımcı profilim görünsün",
    },
    schema: $BusinessAccount,
    extend: {
      "ui:className": "grid md:grid-cols-2 gap-0 gap-x-2 p-px [&>div]:h-20",
      maskInvestorProfile: {
        "ui:widget": "switch",
        "ui:className": "[&>div]:border [&>div]:rounded-md [&>div]:px-2 flex items-center [&>div]:w-full",
      },
      annualIncome: {
        "ui:options": {
          inputType: "number",
        },
      },
      tel: {
        "ui:widget": "phone",
      },
    },
  });
  return (
    <SchemaForm<BusinessAccount>
      defaultSubmitClassName="w-full [&>button]:w-full"
      disabled={isPending}
      formData={{
        identifier: "",
        title: "",
        tel: "+90",
        mail: "",
        annualIncome: 1,
        maskInvestorProfile: true,
      }}
      locale="tr"
      onSubmit={({formData}) => {
        if (!formData) return;
        const requestBody = {
          type: "Organization" as const,
          idType: "VKN" as const,
          isValidated: false,
          ...formData,
        };
        startTransition(() => {
          void postApiMember({requestBody}).then((res) => {
            handlePostResponse(res);
            if (res.type === "success") {
              setCurrentMember({
                ...requestBody,
                id: res.data.memberID || "",
              });
            }
          });
        });
      }}
      schema={$BusinessAccount}
      submitText={isPending ? "Oluşturuluyor..." : "İşletme Hesabı Oluştur"}
      uiSchema={uiSchema}
    />
  );
}
