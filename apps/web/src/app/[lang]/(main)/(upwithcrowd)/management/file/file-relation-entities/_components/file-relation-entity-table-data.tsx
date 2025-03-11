import {
  $UpwithCrowd_FileRelationEntity_FileRelationEntityListDto,
  type UpwithCrowd_FileRelationEntity_FileRelationEntityListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {deleteFileRelationEntityByIdApi} from "@repo/actions/upwithcrowd/file-relation-entity/delete-actions";
import type {
  TanstackTableCreationProps,
  TanstackTableRowActionsType,
  TanstackTableTableActionsType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {
  BooleanOptions,
  tanstackTableCreateColumnsByRowData,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {handleDeleteResponse} from "@repo/utils/api";
import {isActionGranted, type Policy} from "@repo/utils/policies";
import {Edit, Trash} from "lucide-react";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import type {DefaultResource} from "@/language-data/core/Default";

type FileRelationEntityTable = TanstackTableCreationProps<UpwithCrowd_FileRelationEntity_FileRelationEntityListDto>;

function fileRelationEntityTableActions(router: AppRouterInstance, languageData: DefaultResource, locale: string) {
  const actions: TanstackTableTableActionsType[] = [];
  actions.push({
    type: "simple",
    actionLocation: "table",
    cta: languageData.New,
    icon: Edit,
    onClick: () => {
      router.push(`/${locale}/management/file/file-types/new`);
    },
  });

  return actions;
}

function fileRelationEntityRowActions(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
  locale: string,
): TanstackTableRowActionsType<UpwithCrowd_FileRelationEntity_FileRelationEntityListDto>[] {
  const actions: TanstackTableRowActionsType<UpwithCrowd_FileRelationEntity_FileRelationEntityListDto>[] = [
    {
      type: "simple",
      actionLocation: "row",
      cta: languageData.Edit,
      icon: Edit,
      onClick: (row) => {
        router.push(`/${locale}/management/file/file-types/${row.id}`);
      },
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
      condition: () => isActionGranted(["UpwithCrowd.FileRelated.Save"], grantedPolicies),
      onConfirm: (row) => {
        void deleteFileRelationEntityByIdApi({
          id: row.id,
        }).then((response) => {
          handleDeleteResponse(response, router);
        });
      },
    },
  ];

  return actions;
}

function fileRelationEntityColumns(locale: string) {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_FileRelationEntity_FileRelationEntityListDto>({
    rows: $UpwithCrowd_FileRelationEntity_FileRelationEntityListDto.properties,
    config: {
      locale,
    },
    faceted: {
      required: BooleanOptions,
    },
  });
}

function fileRelationEntityTable(
  languageData: DefaultResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
  locale: string,
): FileRelationEntityTable {
  const table: FileRelationEntityTable = {
    fillerColumn: "fileTypeId",
    columnVisibility: {
      type: "hide",
      columns: ["id"],
    },
    tableActions: fileRelationEntityTableActions(router, languageData, locale),
    rowActions: fileRelationEntityRowActions(languageData, router, grantedPolicies, locale),
  };
  return table;
}
export const tableData = {
  fileRelationEntity: {
    columns: fileRelationEntityColumns,
    table: fileRelationEntityTable,
  },
};
