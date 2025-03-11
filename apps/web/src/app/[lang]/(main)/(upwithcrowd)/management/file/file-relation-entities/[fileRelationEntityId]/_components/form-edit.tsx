"use client";

import {
  $UpwithCrowd_FileRelationEntity_FileRelationEntityListDto,
  type UpwithCrowd_FileRelationEntity_FileRelationEntityListDto,
  type UpwithCrowd_FileTypes_ListFileTypeDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putFileRelationEntityApi} from "@repo/actions/upwithcrowd/file-relation-entity/put-actions";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {CustomComboboxWidget} from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import {handlePutResponse} from "@repo/utils/api";
import {useRouter} from "next/navigation";
import type {IdentityServiceResource} from "src/language-data/core/IdentityService";

export default function Form({
  languageData,
  fileTypeData,
  fileRelationEntityData,
}: {
  languageData: IdentityServiceResource;
  fileTypeData: UpwithCrowd_FileTypes_ListFileTypeDto[];
  fileRelationEntityData: UpwithCrowd_FileRelationEntity_FileRelationEntityListDto;
}) {
  const router = useRouter();
  return (
    <SchemaForm<UpwithCrowd_FileRelationEntity_FileRelationEntityListDto>
      className="flex flex-col gap-4"
      filter={{
        keys: ["id"],
        type: "exclude",
      }}
      formData={fileRelationEntityData}
      onSubmit={({formData}) => {
        if (!formData) return;
        void putFileRelationEntityApi({
          id: fileRelationEntityData.id,
          requestBody: formData,
        }).then((res) => {
          handlePutResponse(res, router);
        });
      }}
      schema={$UpwithCrowd_FileRelationEntity_FileRelationEntityListDto}
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
