"use client";
import type {PagedResultDto_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useRouter} from "next/navigation";
import {tableData} from "./payments-table-data";

interface PaymentsTableProps {
  paymentsResponse: PagedResultDto_ListPaymentTransactionDto;
  projectID: string;
  amount: number;
}

export default function PaymentsTable({paymentsResponse}: PaymentsTableProps) {
  const router = useRouter();
  const paymentData = paymentsResponse.items || [];
  const columns = tableData.payments.columns();
  const table = tableData.payments.table(paymentData, router);
  return <TanstackTable {...table} columns={columns} data={paymentData} rowCount={paymentsResponse.totalCount} />;
}
