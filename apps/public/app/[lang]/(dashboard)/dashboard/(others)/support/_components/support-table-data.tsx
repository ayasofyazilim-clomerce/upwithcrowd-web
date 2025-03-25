"use client";
import type {UpwithCrowd_Tasks_ListTasksDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Tasks_ListTasksDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {getBaseLink} from "@/utils/lib";

type TaskTable = TanstackTableCreationProps<UpwithCrowd_Tasks_ListTasksDto>;

const taskColumns = () => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Tasks_ListTasksDto>({
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
        prefix: getBaseLink("dashboard/support"),
        targetAccessorKey: "id",
      },
    },
  });
};

function taskTable() {
  const table: TaskTable = {
    columnOrder: ["tasksType", "summary", "description"],
    columnVisibility: {
      columns: ["tasksType", "summary", "description"],
      type: "show",
    },
  };
  return table;
}

export const tableData = {
  tasks: {
    columns: taskColumns,
    table: taskTable,
  },
};
