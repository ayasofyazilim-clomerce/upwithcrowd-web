import {Button} from "@/components/ui/button";
import {
  $UpwithCrowd_Files_FileResponseListDto,
  type UpwithCrowd_Files_FileResponseListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putFileValidationByIdApi} from "@repo/actions/upwithcrowd/file/put-actions";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {handleFileDownload} from "@repo/ui/upwithcrowd/file-upload/index";
import {handlePutResponse} from "@repo/utils/api";
import {CircleCheck, FileImageIcon, FileTextIcon, Trash} from "lucide-react";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";

type FileTable = TanstackTableCreationProps<UpwithCrowd_Files_FileResponseListDto>;

const fileColumns = (locale: string) => {
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
    badges: {
      fileTypeNamespace: {
        hideColumnValue: false,
        values: [
          {
            label: "Onaylandı",
            badgeClassName: "text-green-500 bg-green-100 border-green-500 w-24 justify-center",
            conditions: [
              {
                when: (value) => Boolean(value),
                conditionAccessorKey: "isValidated",
              },
            ],
          },
          {
            label: "Onaylanmadı",
            badgeClassName: "text-red-500 bg-red-100 border-red-500 w-24 justify-center",
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

function fileTable(router: AppRouterInstance) {
  const table: FileTable = {
    columnVisibility: {
      type: "hide",
      columns: ["fileId", "validatedUser", "fullPath", "isValidated"],
    },
    fillerColumn: "fileDescription",
    columnOrder: [
      "fileTypeNamespace",
      "fileDescription",
      "mimeType",
      "validatedType",
      "documentNumber",
      "documentOriginator",
    ],

    rowActions: [
      {
        cta: "Onayla",
        onClick(row) {
          void putFileValidationByIdApi({
            id: row.fileId || "",
            isValidated: true,
          }).then((response) => {
            handlePutResponse(response, router);
          });
        },
        type: "simple",
        icon: CircleCheck,
        actionLocation: "row",
        condition: (row) => !row.isValidated,
      },
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
    columns: fileColumns,
    table: fileTable,
  },
};
