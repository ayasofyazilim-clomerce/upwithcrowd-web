import type {UpwithCrowd_Files_FileResponseListDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Files_FileResponseListDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {
  BooleanOptions,
  tanstackTableCreateColumnsByRowData,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";

type OrganizationTable = TanstackTableCreationProps<UpwithCrowd_Files_FileResponseListDto>;

const getFileNameFromPath = (fullPath: string): string => {
  const matches = /[^/]+$/.exec(fullPath);
  return matches ? matches[0] : fullPath;
};

const organizationColumns = (locale: string) => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Files_FileResponseListDto>({
    rows: $UpwithCrowd_Files_FileResponseListDto.properties,
    languageData: {
      title: "Tam Adı",
      isValidated: "Onay Durumu",
    },
    custom: {
      fullPath: {
        showHeader: true,
        content(row) {
          return <div>{getFileNameFromPath(row.fullPath || "")}</div>;
        },
      },
    },
    faceted: {
      isValidated: BooleanOptions,
    },

    config: {
      locale,
    },
  });
};

function organizationTable() {
  const table: OrganizationTable = {
    fillerColumn: "fullPath",
    columnVisibility: {
      type: "show",
      columns: ["mimeType", "fileDescription", "isValidated", "fullPath"],
    },
    // rowActions: [
    //   {
    //     actionLocation: "row",
    //     cta: "Kimliği Onayla",
    //     onClick(row) {
    //       void putMemberValidatedById({
    //         id: row.id,
    //         isValidated: true,
    //       }).then((response) => {
    //         handlePutResponse(response, router);
    //       });
    //     },
    //     type: "simple",
    //     icon: CheckCircle,
    //     condition: (row) => !row.isValidated,
    //   },
    //   {
    //     actionLocation: "row",
    //     cta: "Kimliği Reddet",

    //     onClick(row) {
    //       void putMemberValidatedById({
    //         id: row.id,
    //         isValidated: false,
    //       }).then((response) => {
    //         handlePutResponse(response);
    //       });
    //     },
    //     type: "simple",
    //     icon: XCircle,
    //     condition: (row) => !row.isValidated,
    //   },
    // ],
  };
  return table;
}

export const tableData = {
  organization: {
    columns: organizationColumns,
    table: organizationTable,
  },
};
