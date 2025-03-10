import {
  $UpwithCrowd_Members_MimeTypeDto,
  $UpwithCrowd_Members_MimeTypeListDto,
  $UpwithCrowd_MimeTypes_MimeTypeUpdateDto,
  type UpwithCrowd_Members_MimeTypeDto,
  type UpwithCrowd_Members_MimeTypeListDto,
  type UpwithCrowd_MimeTypes_MimeTypeUpdateDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {deleteMimeTypeByIdApi} from "@repo/actions/upwithcrowd/mime-type/delete-actions";
import {postMimeTypeApi} from "@repo/actions/upwithcrowd/mime-type/post-actions";
import {putMimeTypeApi} from "@repo/actions/upwithcrowd/mime-type/put-actions";
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

type MimeTypesTable = TanstackTableCreationProps<UpwithCrowd_Members_MimeTypeListDto>;

function mimeTypesTableActions(router: AppRouterInstance) {
  const actions: TanstackTableTableActionsType[] = [];
  actions.push({
    type: "custom-dialog",
    actionLocation: "table",
    cta: "Yeni",
    title: "Yeni Ekle",
    icon: Plus,
    content: (
      <SchemaForm<UpwithCrowd_Members_MimeTypeDto>
        className="flex flex-col gap-4"
        onSubmit={({formData}) => {
          if (!formData) return;
          void postMimeTypeApi({
            requestBody: formData,
          }).then((res) => {
            handlePostResponse(res, router);
          });
        }}
        schema={$UpwithCrowd_Members_MimeTypeDto}
        submitText="Kaydet"
      />
    ),
  });

  return actions;
}

function mimeTypesRowActions(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
): TanstackTableRowActionsType<UpwithCrowd_Members_MimeTypeListDto>[] {
  const actions: TanstackTableRowActionsType<UpwithCrowd_Members_MimeTypeListDto>[] = [
    {
      type: "custom-dialog",
      cta: languageData.Edit,
      title: languageData.Edit,
      actionLocation: "row",
      content: (row) => (
        <SchemaForm<UpwithCrowd_MimeTypes_MimeTypeUpdateDto>
          className="flex flex-col gap-4"
          formData={row}
          onSubmit={({formData}) => {
            if (!formData) return;
            void putMimeTypeApi({
              id: row.id,
              requestBody: formData,
            }).then((res) => {
              handlePutResponse(res, router);
            });
          }}
          schema={$UpwithCrowd_MimeTypes_MimeTypeUpdateDto}
          submitText={languageData.Save}
        />
      ),
      icon: Edit,
      condition: () => isActionGranted(["UpwithCrowd.MimeType.Update"], grantedPolicies),
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
      condition: () => isActionGranted(["UpwithCrowd.MimeType.Delete"], grantedPolicies),
      onConfirm: (row) => {
        void deleteMimeTypeByIdApi({
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

function mimeTypesColumns(locale: string) {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Members_MimeTypeListDto>({
    rows: $UpwithCrowd_Members_MimeTypeListDto.properties,
    config: {
      locale,
    },
  });
}

function mimeTypesTable(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
): MimeTypesTable {
  const table: MimeTypesTable = {
    fillerColumn: "mimeTypeCode",
    columnVisibility: {
      type: "hide",
      columns: ["id"],
    },

    tableActions: mimeTypesTableActions(router),
    rowActions: mimeTypesRowActions(languageData, router, grantedPolicies),
  };
  return table;
}
export const tableData = {
  mimeTypes: {
    columns: mimeTypesColumns,
    table: mimeTypesTable,
  },
};
