"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import type {PagedResultDto_ListPaymentTransactionDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import PaymentsTable from "./_components/table";

interface PaymentsTableProps {
  payments: PagedResultDto_ListPaymentTransactionDto;
  projectID: string;
  amount: number;
}

export default function PaymentsPage({payments, projectID, amount}: PaymentsTableProps) {
  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-base sm:text-lg">Ödemeler</CardTitle>
        <CardDescription className="text-sm">Ödemelerinizi yönetin.</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <PaymentsTable amount={amount} paymentsResponse={payments} projectID={projectID} />
      </CardContent>
    </Card>
  );
}
