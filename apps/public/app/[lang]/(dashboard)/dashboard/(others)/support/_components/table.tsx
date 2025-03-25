"use client";
import type {PagedResultDto_ListTasksDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {tableData} from "./support-table-data";

interface PaymentsTableProps {
  taskResponse: PagedResultDto_ListTasksDto;
}

export default function SupportTable({taskResponse}: PaymentsTableProps) {
  const columns = tableData.tasks.columns();
  const table = tableData.tasks.table();
  return (
    <TanstackTable {...table} columns={columns} data={taskResponse.items || []} rowCount={taskResponse.totalCount} />
  );
}
