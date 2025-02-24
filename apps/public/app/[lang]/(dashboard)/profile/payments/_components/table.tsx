"use client";
import type {UpwithCrowd_Payment_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Payment_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import type {Payment} from "../types";

interface PaymentsTableProps {
  payments: Payment[];
}
export default function PaymentsTable({payments}: PaymentsTableProps) {
  const columns = tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListPaymentTransactionDto>({
    rows: $UpwithCrowd_Payment_ListPaymentTransactionDto.properties,
  });

  return (
    <TanstackTable
      columnOrder={["projectName", "relatedTransactionID", "amount", "paymentStatus", "paymentType", "creationTime"]}
      columnVisibility={{
        columns: ["projectName", "relatedTransactionID", "amount", "paymentStatus", "paymentType", "creationTime"],
        type: "show",
      }}
      columns={columns}
      data={payments}
      fillerColumn="projectID"
    />
  );
}
