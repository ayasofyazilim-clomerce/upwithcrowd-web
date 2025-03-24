import {Button} from "@/components/ui/button";
import type {UpwithCrowd_Files_FileResponseListDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Files_FileResponseListDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {
  BooleanOptions,
  tanstackTableCreateColumnsByRowData,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {handleFileDownload} from "@repo/ui/upwithcrowd/file-upload/index";
import Image from "next/image";
import {FileImageIcon, FileTextIcon} from "lucide-react";

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
    rowActions: [
      {
        cta: "Görüntüle",
        onClick(row) {
          void fetch(`/api/file/${row.fileId}/download`).then((response) => {
            handleFileDownload({response, file: row, actionType: "open"});
          });
        },
        type: "simple",
        icon: FileTextIcon,
        condition: (row) => row.mimeType === "application/pdf",
        actionLocation: "row",
      },
      {
        cta: "Görüntüle",
        content: (row) => (
          <div>
            <Image alt={row.fileId || ""} height={200} src={`${row.fullPath}`} width={200} />
            <Button
              onClick={() => {
                void fetch(`/api/file/${row.fileId}/download`).then((response) => {
                  handleFileDownload({response, file: row, actionType: "download"});
                });
              }}
              type="button">
              İndir
            </Button>
          </div>
        ),
        type: "custom-dialog",
        icon: FileImageIcon,
        condition: (row) => row.mimeType !== "application/pdf",
        actionLocation: "row",
        title: "Dosya Görüntüleme",
      },
    ],
    fillerColumn: "fullPath",
    columnVisibility: {
      type: "show",
      columns: ["mimeType", "fileDescription", "isValidated", "fullPath"],
    },
  };
  return table;
}

export const tableData = {
  organization: {
    columns: organizationColumns,
    table: organizationTable,
  },
};
