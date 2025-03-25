"use client";
import {toast} from "@/components/ui/sonner";
import type {
  PagedResultDto_ListPaymentTransactionDto,
  UpwithCrowd_Payment_ListPaymentTransactionDto,
  UpwithCrowd_Payment_SavePaymentTransactionDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Payment_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {postApiPaymentTransaction} from "@repo/actions/upwithcrowd/payment-transaction/post-action";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {formatCurrency} from "@repo/ui/utils";
import {LinkIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import ExpandedRow from "./expanded-row-component";

interface PaymentsTableProps {
  paymentsResponse: PagedResultDto_ListPaymentTransactionDto;
  projectID: string;
  amount: number;
}

function AmountRow(row: UpwithCrowd_Payment_ListPaymentTransactionDto) {
  return <div>{formatCurrency(row.amount)}</div>;
}
export default function PaymentsTable({paymentsResponse}: PaymentsTableProps) {
  const router = useRouter();
  const paymentsData = paymentsResponse.items?.filter((payment) => !payment.relatedTransactionID) || [];

  const columns = tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListPaymentTransactionDto>({
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

  return (
    <TanstackTable
      columnOrder={["projectName", "amount", "paymentStatus", "paymentType", "creationTime"]}
      columnVisibility={{
        columns: ["projectName", "amount", "paymentStatus", "paymentType", "creationTime"],
        type: "show",
      }}
      columns={columns}
      data={paymentsData}
      expandedRowComponent={(row) => ExpandedRow({row, payments: paymentsData})}
      fillerColumn="projectName"
      rowActions={[
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
      ]}
    />
  );
}
