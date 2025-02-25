"use client";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/sonner";
import type {
  UpwithCrowd_Payment_ListPaymentTransactionDto,
  UpwithCrowd_Payment_SavePaymentTransactionDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Payment_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {AlertCircle, ArrowUpRight, CreditCard, DollarSign, LinkIcon} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {getBaseLink} from "@/utils/lib";
import {postApiPaymentTransaction} from "@/actions/upwithcrowd/payment/post-action";
import type {Payment} from "../types";

interface PaymentsTableProps {
  payments: Payment[];
  projectID: string;
  amount: number;
}

export default function PaymentsTable({payments}: PaymentsTableProps) {
  const router = useRouter();

  const columns = tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListPaymentTransactionDto>({
    rows: $UpwithCrowd_Payment_ListPaymentTransactionDto.properties,
    expandRowTrigger: "projectName",
    icons: {
      projectName: {
        iconClassName: "inline-block h-4 w-4",
        icon: LinkIcon,
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
      data={payments.filter((payment) => !payment.relatedTransactionID)}
      expandedRowComponent={(row) => ExpandedRow({row, payments})}
      fillerColumn="projectName"
      rowActions={[
        {
          actionLocation: "row",
          cta: "Rescission",
          type: "confirmation-dialog",
          cancelText: "Cancel",
          confirmationText: "Aprrrove",
          title: "Rescission",
          description: "Are you sure you want to rescind this payment?",
          async onConfirm(row) {
            const transactionData: UpwithCrowd_Payment_SavePaymentTransactionDto = {
              ...row,
              relatedTransactionID: row.id,
              type: "Decrease",
              decreaseType: "Rescission",
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

interface ExpandedRowProps {
  row: UpwithCrowd_Payment_ListPaymentTransactionDto;
  payments: Payment[];
}

function ExpandedRow({row, payments}: ExpandedRowProps) {
  const relatedTransaction = payments.find((payment) => payment.relatedTransactionID === row.id);

  return (
    <div className="space-y-2">
      {relatedTransaction ? (
        <div className="bg-muted/20 flex flex-wrap items-center gap-4 rounded-lg p-4">
          <div className="min-w-[200px] flex-grow">
            <h3 className="truncate text-lg font-semibold">{relatedTransaction.projectName}</h3>
            <p className="text-muted-foreground truncate text-xs">ID: {relatedTransaction.relatedTransactionID}</p>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="text-muted-foreground h-4 w-4" />
            <span className="font-medium">{relatedTransaction.amount}</span>
          </div>

          <div className="flex items-center space-x-2">
            <CreditCard className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">{relatedTransaction.paymentType}</span>
          </div>

          <Button asChild size="sm" variant="outline">
            <Link href={getBaseLink(`projects/${relatedTransaction.projectID}`)}>
              <span className="flex items-center space-x-1">
                <span className="hidden sm:inline">Projeye Git</span>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-muted/30 flex items-center justify-center rounded-lg p-4">
          <AlertCircle className="text-muted-foreground mr-2 h-5 w-5" />
          <span className="text-muted-foreground text-sm">Kayıt bulunamadı</span>
        </div>
      )}
    </div>
  );
}
