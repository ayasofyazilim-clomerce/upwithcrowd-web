import {
  $UpwithCrowd_FileTypes_FileTypeDto,
  $UpwithCrowd_FileTypes_FileTypeListDto,
  $UpwithCrowd_FileTypes_FileTypeUpdateDto,
  type UpwithCrowd_FileTypes_FileTypeDto,
  type UpwithCrowd_FileTypes_FileTypeListDto,
  type UpwithCrowd_FileTypes_FileTypeUpdateDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {deleteFileTypeByIdApi} from "@repo/actions/upwithcrowd/file-type/delete-actions";
import {postFileTypeApi} from "@repo/actions/upwithcrowd/file-type/post-actions";
import {putFileTypeApi} from "@repo/actions/upwithcrowd/file-type/put-actions";
import type {
  TanstackTableCreationProps,
  TanstackTableRowActionsType,
  TanstackTableTableActionsType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {
  BooleanOptions,
  tanstackTableCreateColumnsByRowData,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {handleDeleteResponse, handlePostResponse, handlePutResponse} from "@repo/utils/api";
import {isActionGranted, type Policy} from "@repo/utils/policies";
import {Edit, Plus, Trash} from "lucide-react";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import {getBaseLink} from "@/utils";
import type {DefaultResource} from "@/language-data/core/Default";

type FileTypeTable = TanstackTableCreationProps<UpwithCrowd_FileTypes_FileTypeListDto>;

function fileTypeTableActions(router: AppRouterInstance) {
  const actions: TanstackTableTableActionsType[] = [];
  actions.push({
    type: "custom-dialog",
    actionLocation: "table",
    cta: "Yeni",
    title: "Yeni Ekle",
    icon: Plus,
    content: (
      <SchemaForm<UpwithCrowd_FileTypes_FileTypeDto>
        className="flex flex-col gap-4"
        onSubmit={({formData}) => {
          if (!formData) return;
          void postFileTypeApi({
            requestBody: formData,
          }).then((res) => {
            handlePostResponse(res, router);
          });
        }}
        schema={$UpwithCrowd_FileTypes_FileTypeDto}
        submitText="Kaydet"
      />
    ),
  });

  return actions;
}

function fileTypeRowActions(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
): TanstackTableRowActionsType<UpwithCrowd_FileTypes_FileTypeListDto>[] {
  const actions: TanstackTableRowActionsType<UpwithCrowd_FileTypes_FileTypeListDto>[] = [
    {
      type: "custom-dialog",
      cta: languageData.Edit,
      title: languageData.Edit,
      actionLocation: "row",
      content: (row) => (
        <SchemaForm<UpwithCrowd_FileTypes_FileTypeUpdateDto>
          className="flex flex-col gap-4"
          formData={row}
          onSubmit={({formData}) => {
            if (!formData) return;
            void putFileTypeApi({
              id: row.id,
              requestBody: formData,
            }).then((res) => {
              handlePutResponse(res, router);
            });
          }}
          schema={$UpwithCrowd_FileTypes_FileTypeUpdateDto}
          submitText={languageData.Save}
        />
      ),
      icon: Edit,
      condition: () => isActionGranted(["UpwithCrowd.FileType.Update"], grantedPolicies),
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
      condition: () => isActionGranted(["UpwithCrowd.FileType.Delete"], grantedPolicies),
      onConfirm: (row) => {
        void deleteFileTypeByIdApi({
          id: row.id,
        }).then((response) => {
          handleDeleteResponse(response, router);
        });
      },
    },
  ];

  return actions;
}

function fileTypeColumns(locale: string) {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_FileTypes_FileTypeListDto>({
    rows: $UpwithCrowd_FileTypes_FileTypeListDto.properties,
    config: {
      locale,
    },
    faceted: {
      isPublic: BooleanOptions,
      dateRequired: BooleanOptions,
      isMulti: BooleanOptions,
      isTenant: BooleanOptions,
      originatorRequired: BooleanOptions,
      numberRequired: BooleanOptions,
    },
    custom: {
      fileTypeGroupID: {
        showHeader: true,
        content: (row) => (
          <Link
            className="font-medium text-blue-700"
            href={getBaseLink(`/management/file/file-types/${row.fileTypeGroupID}`, locale)}>
            {row.name}
          </Link>
        ),
      },
      providerID: {
        showHeader: true,
        content: (row) => (
          <Link
            className="font-medium text-blue-700"
            href={getBaseLink(`/management/file/providers/${row.providerID}`, locale)}>
            {row.name}
          </Link>
        ),
      },
    },
  });
}

function fileTypeTable(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
): FileTypeTable {
  const table: FileTypeTable = {
    fillerColumn: "namespace",
    columnVisibility: {
      type: "hide",
      columns: ["id"],
    },
    columnOrder: ["name"],
    tableActions: fileTypeTableActions(router),
    rowActions: fileTypeRowActions(languageData, router, grantedPolicies),
  };
  return table;
}
export const tableData = {
  fileType: {
    columns: fileTypeColumns,
    table: fileTypeTable,
  },
};
