import {
  $UpwithCrowd_FileTypeGroup_FileTypeGroupListDto,
  $UpwithCrowd_FileTypeGroup_FileTypeGroupUpdateDto,
  type UpwithCrowd_FileTypeGroup_FileTypeGroupListDto,
  type UpwithCrowd_FileTypeGroup_FileTypeGroupUpdateDto,
  type UpwithCrowd_FileTypeGroup_FileTypeGroupDto,
  $UpwithCrowd_FileTypeGroup_FileTypeGroupDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {deleteFileTypeGroupByIdApi} from "@repo/actions/upwithcrowd/file-type-group/delete-actions";
import {postFileTypeGroupApi} from "@repo/actions/upwithcrowd/file-type-group/post-actions";
import {putFileTypeGroupApi} from "@repo/actions/upwithcrowd/file-type-group/put-actions";
import type {
  TanstackTableCreationProps,
  TanstackTableRowActionsType,
  TanstackTableTableActionsType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {handleDeleteResponse, handlePostResponse, handlePutResponse} from "@repo/utils/api";
import {isActionGranted, type Policy} from "@repo/utils/policies";
import {Edit, Plus, Trash} from "lucide-react";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import type {DefaultResource} from "@/language-data/core/Default";

type FileTypeGroupTable = TanstackTableCreationProps<UpwithCrowd_FileTypeGroup_FileTypeGroupListDto>;

function fileTypeGroupTableActions(router: AppRouterInstance) {
  const actions: TanstackTableTableActionsType[] = [];
  actions.push({
    type: "custom-dialog",
    actionLocation: "table",
    cta: "Yeni",
    title: "Yeni Ekle",
    icon: Plus,
    content: (
      <SchemaForm<UpwithCrowd_FileTypeGroup_FileTypeGroupDto>
        className="flex flex-col gap-4"
        onSubmit={({formData}) => {
          if (!formData) return;
          void postFileTypeGroupApi({
            requestBody: formData,
          }).then((res) => {
            handlePostResponse(res, router);
          });
        }}
        schema={$UpwithCrowd_FileTypeGroup_FileTypeGroupDto}
        submitText="Kaydet"
      />
    ),
  });

  return actions;
}

function fileTypeGroupRowActions(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
): TanstackTableRowActionsType<UpwithCrowd_FileTypeGroup_FileTypeGroupListDto>[] {
  const actions: TanstackTableRowActionsType<UpwithCrowd_FileTypeGroup_FileTypeGroupListDto>[] = [
    {
      type: "custom-dialog",
      cta: languageData.Edit,
      title: languageData.Edit,
      actionLocation: "row",
      content: (row) => (
        <SchemaForm<UpwithCrowd_FileTypeGroup_FileTypeGroupUpdateDto>
          className="flex flex-col gap-4"
          formData={row}
          onSubmit={({formData}) => {
            if (!formData) return;
            void putFileTypeGroupApi({
              id: row.id,
              requestBody: formData,
            }).then((res) => {
              handlePutResponse(res, router);
            });
          }}
          schema={$UpwithCrowd_FileTypeGroup_FileTypeGroupUpdateDto}
          submitText={languageData.Save}
        />
      ),
      icon: Edit,
      condition: () => isActionGranted(["UpwithCrowd.FileTypeGroup.Update"], grantedPolicies),
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
      condition: () => isActionGranted(["UpwithCrowd.FileTypeGroup.Delete"], grantedPolicies),
      onConfirm: (row) => {
        void deleteFileTypeGroupByIdApi({
          id: row.id,
        }).then((response) => {
          handleDeleteResponse(response, router);
        });
      },
    },
  ];

  actions.push();

  return actions;
}

function fileTypeGroupColumns(locale: string) {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_FileTypeGroup_FileTypeGroupListDto>({
    rows: $UpwithCrowd_FileTypeGroup_FileTypeGroupListDto.properties,
    config: {
      locale,
    },
  });
}

function fileTypeGroupTable(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
): FileTypeGroupTable {
  const table: FileTypeGroupTable = {
    fillerColumn: "namespace",
    columnVisibility: {
      type: "hide",
      columns: ["id"],
    },

    tableActions: fileTypeGroupTableActions(router),
    rowActions: fileTypeGroupRowActions(languageData, router, grantedPolicies),
  };
  return table;
}
export const tableData = {
  fileTypeGroup: {
    columns: fileTypeGroupColumns,
    table: fileTypeGroupTable,
  },
};
