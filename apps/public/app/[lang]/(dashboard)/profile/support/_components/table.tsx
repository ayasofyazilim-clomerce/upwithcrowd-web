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
    badges: {
      tasksType: {
        values: [
          {
            badgeClassName: "bg-gray-200 text-gray-600 font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm",
            position: "after",
            label: "Tamamlandı",
            conditions: [
              {
                conditionAccessorKey: "status",
                when(value) {
                  return value === "Completed";
                },
              },
            ],
          },
          {
            badgeClassName: "bg-green-700 text-white font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm",
            position: "after",
            label: "Açık",
            conditions: [
              {
                conditionAccessorKey: "status",
                when(value) {
                  return value === "Open";
                },
              },
            ],
          },
        ],
      },
    },
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
