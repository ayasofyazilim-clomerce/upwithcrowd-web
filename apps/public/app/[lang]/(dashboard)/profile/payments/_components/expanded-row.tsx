import {AlertCircle, ArrowUpRight, CreditCard, DollarSign} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import type {UpwithCrowd_Payment_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getBaseLink} from "@/utils/lib";
import type {Payment} from "../types";

interface ExpandedRowProps {
  row: UpwithCrowd_Payment_ListPaymentTransactionDto;
  payments: Payment[];
}

export function ExpandedRow({row, payments}: ExpandedRowProps) {
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
