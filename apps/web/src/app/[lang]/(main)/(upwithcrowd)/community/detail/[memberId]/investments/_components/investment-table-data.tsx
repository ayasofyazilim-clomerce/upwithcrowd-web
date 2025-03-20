import {
  $UpwithCrowd_Payment_ListPaymentTransactionDto,
  type UpwithCrowd_Payment_ListPaymentTransactionDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {getBaseLink} from "@/utils";

type InvestmentTable = TanstackTableCreationProps<UpwithCrowd_Payment_ListPaymentTransactionDto>;

const investmentColumns = (locale: string) => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListPaymentTransactionDto>({
    rows: $UpwithCrowd_Payment_ListPaymentTransactionDto.properties,
    languageData: {
      investmentTypeNamespace: "Dosya Tipi",
    },
    links: {
      projectName: {
        prefix: getBaseLink("projects/detail", locale),
        targetAccessorKey: "projectID",
      },
    },
    faceted: {},
    custom: {},
    badges: {
      paymentStatus: {
        hideColumnValue: true,
        values: [
          {
            label: "Bekliyor",
            badgeClassName: "text-primary-foreground bg-primary border-transparent",
            conditions: [
              {
                when: (value) => value === "PENDING",
                conditionAccessorKey: "paymentStatus",
              },
            ],
          },
          {
            label: "Onaylandı",
            badgeClassName: "text-primary-foreground bg-primary border-transparent",
            conditions: [
              {
                when: (value) => value === "APPROVED",
                conditionAccessorKey: "paymentStatus",
              },
            ],
          },
          {
            label: "Cayma",
            badgeClassName: "text-primary-foreground bg-primary border-transparent",
            conditions: [
              {
                when: (value) => value === "REJECTION",
                conditionAccessorKey: "paymentStatus",
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

function investmentTable() {
  const table: InvestmentTable = {
    columnVisibility: {
      type: "show",
      columns: ["projectName", "paymentStatus", "remainingAmount", "paymentType"],
    },
    columnOrder: ["projectName", "paymentStatus", "remainingAmount", "paymentType"],
    fillerColumn: "projectName",
  };
  return table;
}

export const tableData = {
  projects: {
    columns: investmentColumns,
    table: investmentTable,
  },
};
