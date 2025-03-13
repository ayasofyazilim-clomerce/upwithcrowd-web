import {
  $UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesDto,
  $UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesListDto,
  $UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesUpdateDto,
  type UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesDto,
  type UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesListDto,
  type UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesUpdateDto,
  type UpwithCrowd_FileTypes_ListFileTypeDto,
  type UpwithCrowd_Members_MimeTypeListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {
  TanstackTableCreationProps,
  TanstackTableRowActionsType,
  TanstackTableTableActionsType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {handleDeleteResponse, handlePostResponse, handlePutResponse} from "@repo/utils/api";
import {isActionGranted, type Policy} from "@repo/utils/policies";
import {Edit, Plus, Trash} from "lucide-react";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {deleteFileTypeMimeTypesByIdApi} from "@repo/actions/upwithcrowd/file-type-mime-types/delete-actions";
import {postFileTypeMimeTypesApi} from "@repo/actions/upwithcrowd/file-type-mime-types/post-actions";
import {putFileTypeMimeTypesApi} from "@repo/actions/upwithcrowd/file-type-mime-types/put-actions";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {CustomComboboxWidget} from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import type {DefaultResource} from "@/language-data/core/Default";

type FileRelationEntityTable = TanstackTableCreationProps<UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesListDto>;

function fileTypeMimeTypesTableActions(
  router: AppRouterInstance,
  languageData: DefaultResource,
  mimeTypeData: UpwithCrowd_Members_MimeTypeListDto[],
  fileTypeData: UpwithCrowd_FileTypes_ListFileTypeDto[],
) {
  const actions: TanstackTableTableActionsType[] = [];
  actions.push({
    type: "custom-dialog",
    actionLocation: "table",
    cta: "Yeni",
    title: "Yeni Ekle",
    icon: Plus,
    content: (
      <SchemaForm<UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesDto>
        className="flex flex-col gap-4"
        onSubmit={({formData}) => {
          if (!formData) return;
          void postFileTypeMimeTypesApi({
            requestBody: formData,
          }).then((res) => {
            handlePostResponse(res, router);
          });
        }}
        schema={$UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesDto}
        submitText="Kaydet"
        uiSchema={{
          mimeTypeId: {
            "ui:widget": "MimeType",
          },
          fileTypeNamespace: {
            "ui:widget": "File",
          },
        }}
        widgets={{
          MimeType: CustomComboboxWidget<UpwithCrowd_Members_MimeTypeListDto>({
            languageData,
            list: mimeTypeData,
            selectIdentifier: "id",
            selectLabel: "mimeTypeCode",
          }),
          File: CustomComboboxWidget<UpwithCrowd_FileTypes_ListFileTypeDto>({
            languageData,
            list: fileTypeData,
            selectIdentifier: "namespace",
            selectLabel: "name",
          }),
        }}
      />
    ),
  });

  return actions;
}

function fileTypeMimeTypesRowActions(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
  mimeTypeData: UpwithCrowd_Members_MimeTypeListDto[],
  fileTypeData: UpwithCrowd_FileTypes_ListFileTypeDto[],
): TanstackTableRowActionsType<UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesListDto>[] {
  const actions: TanstackTableRowActionsType<UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesListDto>[] = [
    {
      type: "custom-dialog",
      cta: languageData.Edit,
      title: languageData.Edit,
      actionLocation: "row",
      content: (row) => (
        <SchemaForm<UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesUpdateDto>
          className="flex flex-col gap-4"
          formData={row}
          onSubmit={({formData}) => {
            if (!formData) return;
            void putFileTypeMimeTypesApi({
              id: row.id,
              requestBody: formData,
            }).then((res) => {
              handlePutResponse(res, router);
            });
          }}
          schema={$UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesUpdateDto}
          submitText={languageData.Save}
          uiSchema={{
            mimeTypeId: {
              "ui:widget": "MimeType",
            },
            fileTypeNamespace: {
              "ui:widget": "File",
            },
          }}
          widgets={{
            MimeType: CustomComboboxWidget<UpwithCrowd_Members_MimeTypeListDto>({
              languageData,
              list: mimeTypeData,
              selectIdentifier: "id",
              selectLabel: "mimeTypeCode",
            }),
            File: CustomComboboxWidget<UpwithCrowd_FileTypes_ListFileTypeDto>({
              languageData,
              list: fileTypeData,
              selectIdentifier: "namespace",
              selectLabel: "name",
            }),
          }}
        />
      ),
      icon: Edit,
      condition: () => isActionGranted(["UpwithCrowd.FileTypeMimeType.Update"], grantedPolicies),
    },

    {
      type: "confirmation-dialog",
      cta: languageData.Delete,
      title: languageData.Delete,
      actionLocation: "row",
      confirmationText: languageData.Delete,
      cancelText: languageData.Cancel,
      description: languageData["Delete.Assurance"],
      icon: Trash,
      condition: () => isActionGranted(["UpwithCrowd.FileTypeMimeType.Delete"], grantedPolicies),
      onConfirm: (row) => {
        void deleteFileTypeMimeTypesByIdApi({
          id: row.id,
        }).then((response) => {
          handleDeleteResponse(response, router);
        });
      },
    },
  ];

  return actions;
}

function fileTypeMimeTypesColumns(locale: string) {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesListDto>({
    rows: $UpwithCrowd_FileTypeMimeTypes_FileTypeMimeTypesListDto.properties,
    config: {
      locale,
    },
  });
}

function fileTypeMimeTypesTable(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
  mimeTypeData: UpwithCrowd_Members_MimeTypeListDto[],
  fileTypeData: UpwithCrowd_FileTypes_ListFileTypeDto[],
): FileRelationEntityTable {
  const table: FileRelationEntityTable = {
    fillerColumn: "fileTypeId",
    columnVisibility: {
      type: "hide",
      columns: ["id"],
    },
    tableActions: fileTypeMimeTypesTableActions(router, languageData, mimeTypeData, fileTypeData),
    rowActions: fileTypeMimeTypesRowActions(languageData, router, grantedPolicies, mimeTypeData, fileTypeData),
  };
  return table;
}
export const tableData = {
  fileTypeMimeTypes: {
    columns: fileTypeMimeTypesColumns,
    table: fileTypeMimeTypesTable,
  },
};
