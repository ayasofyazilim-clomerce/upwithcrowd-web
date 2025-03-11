"use client";

import {
  $UpwithCrowd_FileTypes_FileTypeUpdateDto,
  type UpwithCrowd_FileTypeGroup_FileTypeGroupListDto,
  type UpwithCrowd_FileTypes_FileTypeUpdateDto,
  type UpwithCrowd_FileTypes_ListFileTypeDto,
  type UpwithCrowd_Providers_ProvidersListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putFileTypeApi} from "@repo/actions/upwithcrowd/file-type/put-actions";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {CustomComboboxWidget} from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import {handlePutResponse} from "@repo/utils/api";
import {useRouter} from "next/navigation";
import type {IdentityServiceResource} from "src/language-data/core/IdentityService";

export default function EditForm({
  languageData,
  fileTypeData,
  fileTypeGroupData,
  providerData,
}: {
  languageData: IdentityServiceResource;
  fileTypeData: UpwithCrowd_FileTypes_ListFileTypeDto;
  fileTypeGroupData: UpwithCrowd_FileTypeGroup_FileTypeGroupListDto[];
  providerData: UpwithCrowd_Providers_ProvidersListDto[];
}) {
  const router = useRouter();
  return (
    <SchemaForm<UpwithCrowd_FileTypes_FileTypeUpdateDto>
      className="flex flex-col gap-4"
      formData={{
        ...fileTypeData,
        fileTypeGroupNamespace: fileTypeGroupData.find((item) => item.id === fileTypeData.fileTypeGroupID)?.namespace,
      }}
      onSubmit={({formData}) => {
        if (!formData) return;
        void putFileTypeApi({
          id: fileTypeData.id,
          requestBody: formData,
        }).then((res) => {
          handlePutResponse(res, router);
        });
      }}
      schema={$UpwithCrowd_FileTypes_FileTypeUpdateDto}
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
