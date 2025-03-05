"use client";

import {cn} from "@/lib/utils";
import {type PagedResultDto_ListTasksDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calendar, Clock} from "lucide-react";

function TaskList({
  taskResponse,
  taskId,
  baseLink,
}: {
  taskResponse: PagedResultDto_ListTasksDto;
  taskId?: string[];
  baseLink: string;
}) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Tarih belirtilmedi";

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } catch (error) {
      return "Tarih belirtilmedi";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-gray-200 text-gray-600 font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm hover:bg-gray-200";
      case "Open":
        return "bg-green-700 text-white font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm hover:bg-green-700";
      default:
        return "bg-gray-200 text-gray-600 font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Completed":
        return "Tamamlandı";
      case "Open":
        return "Açık";
      default:
        return status || "Yeni";
    }
  };

  if (!taskResponse.items?.length) {
    return (
      <Card className="bg-muted/30 col-span-1 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground text-center">Açılmış bir destek talebi bulunamadı.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="col-span-1 mb-5 flex flex-col gap-3 md:mb-0">
      {taskResponse.items.map((item) => (
        <Link className="no-underline" href={`${baseLink}/${item.id}`} key={item.id}>
          <Card
            className={cn(
              "overflow-hidden border transition-all hover:shadow-md",
              taskId?.[0] === item.id ? "border-primary/50 shadow-md" : "border-muted shadow-sm",
            )}>
            <CardHeader
              className={cn(
                "px-4 py-3",
                taskId?.[0] === item.id ? "from-primary/10 to-primary/5 bg-gradient-to-r" : "",
              )}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base">{item.summary || "Destek Talebi"}</CardTitle>
                <Badge className={getStatusColor(item.status)}>{getStatusLabel(item.status)}</Badge>
              </div>
              <CardDescription className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(item.createDateTime || "").split(" ")[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(item.createDateTime || "").split(" ")[1] || ""}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <div className="text-muted-foreground line-clamp-2 break-all text-xs">
                {item.description.substring(0, 100) || ""}
                {item.description.length > 100 ? "..." : ""}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default TaskList;
