"use client";

import {
  $UpwithCrowd_FileRelationEntity_FileRelationEntityDto,
  type UpwithCrowd_FileRelationEntity_FileRelationEntityDto,
  type UpwithCrowd_FileTypes_ListFileTypeDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {postFileRelationEntityApi} from "@repo/actions/upwithcrowd/file-relation-entity/post-actions";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {CustomComboboxWidget} from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import {handlePutResponse} from "@repo/utils/api";
import {useRouter} from "next/navigation";
import type {IdentityServiceResource} from "src/language-data/core/IdentityService";

export default function Form({
  languageData,
  fileTypeData,
}: {
  languageData: IdentityServiceResource;
  fileTypeData: UpwithCrowd_FileTypes_ListFileTypeDto[];
}) {
  const router = useRouter();
  return (
    <SchemaForm<UpwithCrowd_FileRelationEntity_FileRelationEntityDto>
      className="flex flex-col gap-4"
      onSubmit={({formData}) => {
        if (!formData) return;
        void postFileRelationEntityApi({
          requestBody: formData,
        }).then((res) => {
          handlePutResponse(res, router);
        });
      }}
      schema={$UpwithCrowd_FileRelationEntity_FileRelationEntityDto}
      submitText={languageData.Save}
      uiSchema={{
        fileTypeId: {
          "ui:widget": "File",
        },
      }}
      widgets={{
        File: CustomComboboxWidget<UpwithCrowd_FileTypes_ListFileTypeDto>({
          languageData,
          list: fileTypeData,
          selectIdentifier: "id",
          selectLabel: "name",
        }),
      }}
    />
  );
}
