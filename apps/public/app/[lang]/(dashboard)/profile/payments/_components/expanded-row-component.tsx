import {Button} from "@/components/ui/button";
import type {UpwithCrowd_Payment_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {formatCurrency} from "@repo/ui/utils";
import {CreditCard, Link, ArrowUpRight, AlertCircle} from "lucide-react";
import {getBaseLink} from "@/utils/lib";
import type {Payment} from "../types";

interface ExpandedRowProps {
  row: UpwithCrowd_Payment_ListPaymentTransactionDto;
  payments: Payment[];
}

export default function ExpandedRow({row, payments}: ExpandedRowProps) {
  const relatedTransaction = payments.find((payment) => payment.relatedTransactionID === row.id);

  return (
    <div className="space-y-2">
      {relatedTransaction ? (
        <div className="bg-muted/20 flex flex-col flex-wrap items-start gap-2 rounded-lg p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
          <div className="w-full sm:min-w-[200px] sm:flex-grow">
            <h3 className="truncate text-base font-semibold sm:text-lg">{relatedTransaction.projectName}</h3>
            <p className="text-muted-foreground truncate text-xs">ID: {relatedTransaction.relatedTransactionID}</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium sm:text-base">{formatCurrency(relatedTransaction.amount)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <CreditCard className="text-muted-foreground h-4 w-4" />
            <span className="text-xs sm:text-sm">{relatedTransaction.paymentType}</span>
          </div>

          <Button asChild className="mt-2 w-full sm:mt-0 sm:w-auto" size="sm" variant="outline">
            <Link href={getBaseLink(`projects/${relatedTransaction.projectID}`)}>
              <span className="flex items-center justify-center space-x-1">
                <span>Projeye Git</span>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-muted/30 flex items-center justify-center rounded-lg p-3 sm:p-4">
          <AlertCircle className="text-muted-foreground mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-muted-foreground text-xs sm:text-sm">Kayıt bulunamadı</span>
        </div>
      )}
    </div>
  );
}
