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
      <CardHeader>
        <CardTitle className="text-lg">Ödemeler</CardTitle>
        <CardDescription>Ödemelerinizi yönetin.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className="mb-4 flex items-center justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="" variant="outline">
                Filtreler <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtre 1</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        <PaymentsTable amount={amount} payments={payments} projectID={projectID} />
      </CardContent>
    </Card>
  );
}
