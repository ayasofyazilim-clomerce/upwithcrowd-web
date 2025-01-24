"use client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import PaymentsTable from "./_components/table";
import { Payment } from "./types";

interface PaymentsTableProps {
  payments: Payment[];
}

export default function PaymentsPage({ payments }: PaymentsTableProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Ödemeler</CardTitle>
        <CardDescription>Ödemelerinizi yönetin.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="">
                Filtreler <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtre 1</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <PaymentsTable payments={payments} />
      </CardContent>
      <Toaster />
    </Card>
  );
}
