"use client";
import {
  $UpwithCrowd_Payment_ListPaymentTransactionDto,
  UpwithCrowd_Payment_ListPaymentTransactionDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { Payment } from "../types";

interface PaymentsTableProps {
  payments: Payment[];
}
export default function PaymentsTable({ payments }: PaymentsTableProps) {
  const columns =
    tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListPaymentTransactionDto>(
      {
        rows: $UpwithCrowd_Payment_ListPaymentTransactionDto.properties,
      },
    );

  return (
    <>
      <TanstackTable
        columns={columns}
        data={payments}
        fillerColumn="projectID"
        columnVisibility={{
          columns: [
            "projectName",
            "relatedTransactionID",
            "amount",
            "paymentStatus",
            "paymentType",
            "creationTime",
          ],
          type: "show",
        }}
        columnOrder={[
          "projectName",
          "relatedTransactionID",
          "amount",
          "paymentStatus",
          "paymentType",
          "creationTime",
        ]}
      />
    </>
  );
}
