"use client";
import type {
  UpwithCrowd_Payment_ListPaymentTransactionDto,
  UpwithCrowd_Payment_SavePaymentTransactionDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Payment_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {toast} from "@/components/ui/sonner";
import {postApiPaymentTransaction} from "@repo/actions/upwithcrowd/payment-transaction/post-action";
import {formatCurrency} from "@repo/ui/utils";
import {LinkIcon} from "lucide-react";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import ExpandedRow from "./expanded-row-component";

type TaskTable = TanstackTableCreationProps<UpwithCrowd_Payment_ListPaymentTransactionDto>;

function AmountRow(row: UpwithCrowd_Payment_ListPaymentTransactionDto) {
  return <div>{formatCurrency(row.amount)}</div>;
}
const paymentsColumns = () => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListPaymentTransactionDto>({
    rows: $UpwithCrowd_Payment_ListPaymentTransactionDto.properties,
    expandRowTrigger: "projectName",
    icons: {
      projectName: {
        iconClassName: "inline-block h-4 w-4",
        icon: LinkIcon,
      },
    },
    custom: {
      amount: {
        content: (row) => AmountRow(row),
      },
    },
  });
};

function paymentsTable(paymentsData: UpwithCrowd_Payment_ListPaymentTransactionDto[], router: AppRouterInstance) {
  const table: TaskTable = {
    columnOrder: ["projectName", "amount", "paymentStatus", "paymentType", "creationTime"],
    columnVisibility: {
      columns: ["projectName", "amount", "paymentStatus", "paymentType", "creationTime"],
      type: "show",
    },
    expandedRowComponent: (row) => ExpandedRow({row, payments: paymentsData}),
    fillerColumn: "projectName",
    rowActions: [
      {
        actionLocation: "row",
        cta: "İşlemi Geri Al",
        type: "confirmation-dialog",
        cancelText: "Vazgeç",
        confirmationText: "Onayla",
        title: "İşlemi Geri Al",
        description: "Bu işlemi onaylamak istediğinizden emin misiniz?",
        async onConfirm(row) {
          const transactionData: UpwithCrowd_Payment_SavePaymentTransactionDto = {
            ...row,
            relatedTransactionID: row.id,
            type: "Increase",
            increaseType: "InvestmentWithdrawn",
          };

          await postApiPaymentTransaction({
            requestBody: transactionData,
          }).then((res) => {
            if (res.type === "success") {
              router.refresh();
              toast.success(res.message);
            } else {
              toast.error(res.message);
            }
          });

          //
        },
        condition(row) {
          return row.paymentStatus === "DRAFT";
        },
      },
    ],
  };
  return table;
}

export const tableData = {
  payments: {
    columns: paymentsColumns,
    table: paymentsTable,
  },
};
