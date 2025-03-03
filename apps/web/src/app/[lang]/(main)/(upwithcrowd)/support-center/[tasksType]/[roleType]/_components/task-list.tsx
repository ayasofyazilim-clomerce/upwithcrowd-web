"use client";

import {cn} from "@/lib/utils";
import {type PagedResultDto_ListTasksDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import Link from "next/link";
import {formatDistanceToNow} from "date-fns";

function TaskList({
  taskResponse,
  taskId,
  baseLink,
}: {
  taskResponse: PagedResultDto_ListTasksDto;
  taskId?: string;
  baseLink: string;
}) {
  if (!taskResponse.items?.length) {
    return (
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-700">Açılmış bir destek talebi bulunamadı.</h1>
        </div>
      </div>
    );
  }
  // console.log(taskResponse.items);
  return (
    <div className="col-span-1 flex flex-col gap-3">
      {taskResponse.items.map((item) => (
        <Link
          className={cn(
            "hover:bg-accent flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all",
            taskId === item.id && "bg-muted",
          )}
          href={`${baseLink}/${item.id}`}
          key={item.id}>
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{item.fullname}</div>
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              </div>
              <div className={cn("ml-auto text-xs", taskId === item.id ? "text-foreground" : "text-muted-foreground")}>
                {formatDistanceToNow(new Date(item.createDateTime), {addSuffix: true})}
              </div>
            </div>
            <div className="break-all text-xs font-medium">{item.summary}</div>
          </div>
          <div className="text-muted-foreground line-clamp-2 break-all text-xs">
            {item.description.substring(0, 300)}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TaskList;
