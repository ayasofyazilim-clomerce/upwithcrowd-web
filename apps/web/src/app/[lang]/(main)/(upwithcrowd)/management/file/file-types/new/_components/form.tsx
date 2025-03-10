"use client";

import {
  $UpwithCrowd_FileTypes_FileTypeDto,
  type UpwithCrowd_FileTypeGroup_FileTypeGroupListDto,
  type UpwithCrowd_FileTypes_FileTypeDto,
  type UpwithCrowd_Providers_ProvidersListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {postFileTypeApi} from "@repo/actions/upwithcrowd/file-type/post-actions";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {CustomComboboxWidget} from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import {handlePutResponse} from "@repo/utils/api";
import {useRouter} from "next/navigation";
import type {IdentityServiceResource} from "src/language-data/core/IdentityService";

export default function Form({
  languageData,
  fileTypeGroupData,
  providerData,
}: {
  languageData: IdentityServiceResource;
  fileTypeGroupData: UpwithCrowd_FileTypeGroup_FileTypeGroupListDto[];

  providerData: UpwithCrowd_Providers_ProvidersListDto[];
}) {
  const router = useRouter();
  return (
    <SchemaForm<UpwithCrowd_FileTypes_FileTypeDto>
      className="flex flex-col gap-4"
      onSubmit={({formData}) => {
        if (!formData) return;
        void postFileTypeApi({
          requestBody: formData,
        }).then((res) => {
          handlePutResponse(res, router);
        });
      }}
      schema={$UpwithCrowd_FileTypes_FileTypeDto}
      submitText={languageData.Save}
      uiSchema={{
        fileTypeGroupNamespace: {
          "ui:widget": "File",
        },
        providerID: {
          "ui:widget": "Provider",
        },
      }}
      widgets={{
        File: CustomComboboxWidget<UpwithCrowd_FileTypeGroup_FileTypeGroupListDto>({
          languageData,
          list: fileTypeGroupData,
          selectIdentifier: "namespace",
          selectLabel: "name",
        }),
        Provider: CustomComboboxWidget<UpwithCrowd_Providers_ProvidersListDto>({
          languageData,
          list: providerData,
          selectIdentifier: "id",
          selectLabel: "type",
        }),
      }}
    />
  );
}
