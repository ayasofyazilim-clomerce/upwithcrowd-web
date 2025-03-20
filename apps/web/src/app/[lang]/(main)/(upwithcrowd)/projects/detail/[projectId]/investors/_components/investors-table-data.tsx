import {toast} from "@/components/ui/sonner";
import {
  $UpwithCrowd_Payment_ListProjectInvestorDto,
  type UpwithCrowd_Payment_ListProjectInvestorDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {CrownIcon, ExternalLinkIcon, FolderInputIcon} from "lucide-react";
import Link from "next/link";
import {getBaseLink} from "@/utils";

type InvestorsTable = TanstackTableCreationProps<UpwithCrowd_Payment_ListProjectInvestorDto>;

const fileColumns = (locale: string) => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListProjectInvestorDto>({
    rows: $UpwithCrowd_Payment_ListProjectInvestorDto.properties,
    languageData: {
      fileTypeNamespace: "Dosya Tipi",
    },
    config: {
      locale,
    },
    custom: {
      name: {
        content: (row) => {
          return (
            <Link
              className="flex items-center gap-2 font-medium text-blue-700"
              href={getBaseLink(`community/detail/${row.memberID}`, locale)}
              target="_blank">
              {row.memberQualidied ? <CrownIcon className="size-4 text-yellow-500" /> : null}
              {row.name}
              <ExternalLinkIcon className="size-4" />
            </Link>
          );
        },
        showHeader: true,
      },
    },
  });
};

function fileTable() {
  const table: InvestorsTable = {
    tableActions: [
      {
        type: "custom-dialog",
        actionLocation: "table",
        confirmationText: "Aktar",
        cancelText: "İptal",
        content: <div className="text-sm">Yatırımcıları aktarmak istediğinize emin misiniz?</div>,
        cta: "Aktar",
        icon: FolderInputIcon,
        title: "Aktar",
        onConfirm: () => {
          toast.info("Aktarım işlemi henüz geliştirme aşamasındadır.");
        },
      },
    ],

    columnVisibility: {
      type: "show",
      columns: ["name", "amount", "creationTime"],
    },
    fillerColumn: "name",
  };
  return table;
}

export const tableData = {
  projects: {
    columns: fileColumns,
    table: fileTable,
  },
};
