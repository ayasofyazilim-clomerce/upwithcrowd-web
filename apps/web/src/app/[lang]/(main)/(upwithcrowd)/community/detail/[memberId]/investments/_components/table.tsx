"use client";

import type {GetApiPaymentTransactionResponse} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useParams} from "next/navigation";
import {tableData} from "./investment-table-data";

function InvestmentTable({investmentResponse}: {investmentResponse: GetApiPaymentTransactionResponse}) {
  const {lang} = useParams<{lang: string}>();
  const columns = tableData.projects.columns(lang);
  const table = tableData.projects.table();
  return (
    <TanstackTable
      {...table}
      columns={columns}
      data={investmentResponse.items || []}
      rowCount={investmentResponse.totalCount || investmentResponse.items?.length || 0}
    />
  );
}
export default InvestmentTable;
