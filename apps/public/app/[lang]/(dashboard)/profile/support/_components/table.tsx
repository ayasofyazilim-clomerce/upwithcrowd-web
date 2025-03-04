"use client";
import type {
  PagedResultDto_ListTasksDto,
  UpwithCrowd_Tasks_ListTasksDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Tasks_ListTasksDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {getBaseLink} from "@/utils/lib";

interface PaymentsTableProps {
  taskResponse: PagedResultDto_ListTasksDto;
}

export default function SupportTable({taskResponse}: PaymentsTableProps) {
  const columns = tanstackTableCreateColumnsByRowData<UpwithCrowd_Tasks_ListTasksDto>({
    rows: $UpwithCrowd_Tasks_ListTasksDto.properties,
    links: {
      summary: {
        prefix: getBaseLink("profile/support"),
        targetAccessorKey: "id",
      },
    },
  });

  return (
    <TanstackTable
      columnOrder={["tasksType", "summary", "description"]}
      columnVisibility={{
        columns: ["tasksType", "summary", "description"],
        type: "show",
      }}
      columns={columns}
      data={taskResponse.items || []}
    />
  );
}
