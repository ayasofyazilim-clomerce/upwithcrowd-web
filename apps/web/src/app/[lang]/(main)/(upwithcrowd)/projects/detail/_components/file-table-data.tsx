import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {Download, DownloadIcon, FileIcon, FileTextIcon, ImageIcon, Trash} from "lucide-react";
import Link from "next/link";
import {$fileType, type FileType} from "../type";

type ProjectsTable = TanstackTableCreationProps<FileType>;

const projectsColumns = (locale: string) => {
  return tanstackTableCreateColumnsByRowData<FileType>({
    rows: $fileType,
    languageData: {
      fileType: "Dosya Tipi",
      fileSize: "Dosya Boyutu",
      creationDate: "Yüklenme Tarihi",
    },
    custom: {
      fileType: {
        showHeader: true,
        content(row) {
          let icon = null;
          switch (row.fileExtension) {
            case "pdf":
              icon = <FileTextIcon className="size-6 text-red-500" />;
              break;
            case "png":
            case "jpg":
              icon = <ImageIcon className="size-6 text-green-600" />;
              break;

            default:
              icon = <FileIcon className="size-6 text-blue-500" />;
          }
          return (
            <div className="flex items-center gap-2">
              {icon} {row.fileType}
            </div>
          );
        },
      },
      fileSize: {
        showHeader: true,
        content(row) {
          return <>{row.fileSize}MB</>;
        },
      },
      fileLink: {
        content(row) {
          return (
            <div className="ml-auto">
              <Link
                className="flex items-center gap-2 text-blue-600"
                href={row.fileLink}
                rel="noopener noreferrer"
                target="_blank">
                <DownloadIcon className="size-6" />
              </Link>
            </div>
          );
        },
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
      type: "show",
      columns: ["fileType", "fileSize", "creationDate"],
    },
    fillerColumn: "fileType",
    columnOrder: ["fileType", "fileSize", "creationDate"],
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
