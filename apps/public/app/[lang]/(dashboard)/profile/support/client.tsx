"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import type {PagedResultDto_ListTasksDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import SupportTable from "./_components/table";

interface PaymentsTableProps {
  taskResponse: PagedResultDto_ListTasksDto;
}

export default function SupportClient({taskResponse}: PaymentsTableProps) {
  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">Taleplerim</CardTitle>
            <CardDescription className="text-sm">Taleplerinizi Takip Edin</CardDescription>
          </div>
          <Link href="support/support-form">
            <Button className="flex items-center gap-2" variant="default">
              Yeni Talep <PlusCircle className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <SupportTable taskResponse={taskResponse} />
      </CardContent>
    </Card>
  );
}
