import {
  $UpwithCrowd_Files_FileResponseListDto,
  type UpwithCrowd_Files_FileResponseListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {Download, DownloadIcon, FileTextIcon, Trash} from "lucide-react";
import Link from "next/link";

type ProjectsTable = TanstackTableCreationProps<UpwithCrowd_Files_FileResponseListDto>;

const projectsColumns = (locale: string) => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Files_FileResponseListDto>({
    rows: $UpwithCrowd_Files_FileResponseListDto.properties,
    languageData: {
      fileTypeNamespace: "Dosya Tipi",
    },
    faceted: {
      fileTypeNamespace: {
        options: [
          {
            icon: FileTextIcon,
            iconClassName: "text-blue-500 size-6",
            value: "ProjectImages",
            label: "Proje Resimleri",
          },
        ],
      },
    },
    custom: {
      fullPath: {
        content(row) {
          return (
            <Link
              className="flex items-center gap-2 text-blue-600"
              href={row.fullPath || ""}
              rel="noopener noreferrer"
              target="_blank">
              <DownloadIcon className="size-6" />
            </Link>
          );
        },
      },
    },
    badges: {
      isValidated: {
        hideColumnValue: true,
        values: [
          {
            label: "Onaylandı",
            badgeClassName: "text-green-700 bg-green-100 border-green-500",
            conditions: [
              {
                when: (value) => Boolean(value),
                conditionAccessorKey: "isValidated",
              },
            ],
          },
          {
            label: "Onaylanmadı",

            badgeClassName: "text-red-700 bg-red-100 border-red-500",
            conditions: [
              {
                when: (value) => !value,
                conditionAccessorKey: "isValidated",
              },
            ],
          },
        ],
      },
    },
    config: {
      locale,
    },
  });
};

function projectsTable() {
  const table: ProjectsTable = {
    columnVisibility: {
      type: "hide",
      columns: ["fileId", "validatedUser", "validatedType"],
    },
    fillerColumn: "fileDescription",
    columnOrder: [
      "isValidated",
      "fileTypeNamespace",
      "mimeType",
      "fileDescription",
      "documentNumber",
      "documentOriginator",
      "fullPath",
    ],
    selectedRowAction: {
      cta: "Download",
      icon: Download,
      onClick() {
        // eslint-disable-next-line no-alert -- it's an example
        alert("Download");
      },
      actionLocation: "table",
    },
    rowActions: [
      {
        cta: "Download",
        onClick() {
          // eslint-disable-next-line no-alert -- it's an example
          alert("Download");
        },
        type: "simple",
        icon: Download,
        actionLocation: "row",
      },
      {
        cta: "Delete",
        onClick() {
          // eslint-disable-next-line no-alert -- it's an example
          alert("Delete");
        },
        type: "simple",
        icon: Trash,
        actionLocation: "row",
      },
    ],
  };
  return table;
}

export const tableData = {
  projects: {
    columns: projectsColumns,
    table: projectsTable,
  },
};
