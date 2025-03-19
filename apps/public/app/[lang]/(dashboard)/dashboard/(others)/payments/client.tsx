"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import PaymentsTable from "./_components/table";
import type {Payment} from "./types";

interface PaymentsTableProps {
  payments: Payment[];
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
        <PaymentsTable amount={amount} payments={payments} projectID={projectID} />
      </CardContent>
    </Card>
  );
}
