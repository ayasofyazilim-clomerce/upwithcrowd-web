"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, MoreVertical } from "lucide-react";
import { useState } from "react";

interface Payment {
  projectName: string;
  transactionId: string;
  amount: number;
  paymentStatus: string;
  paymentDate: string;
  currency: string;
  paymentType: string;
}

interface PaymentsTableProps {
  payments: Payment[];
}

export default function PaymentsTable({ payments }: PaymentsTableProps) {
  const [selectedRows, setSelectedRows] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleCheckboxChange = (isChecked: boolean) => {
    setSelectedRows((prev) => (isChecked ? prev + 1 : prev - 1));
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  const paginatedPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <Card className="w-full ">
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  onCheckedChange={(isChecked) => {
                    setSelectedRows(isChecked ? paginatedPayments.length : 0);
                  }}
                />
              </TableHead>
              <TableHead>Proje Adı</TableHead>
              <TableHead>İşlem Numarası</TableHead>
              <TableHead>Tutar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Ödeme Tarihi</TableHead>
              <TableHead>Para Birimi</TableHead>
              <TableHead>Ödeme Türü</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    onCheckedChange={(isChecked) =>
                      handleCheckboxChange(isChecked === true)
                    }
                  />
                </TableCell>
                <TableCell>{payment.projectName}</TableCell>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      payment.paymentStatus === "Success"
                        ? "bg-green-100 text-green-700"
                        : payment.paymentStatus === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>{payment.paymentDate}</TableCell>
                <TableCell>{payment.currency}</TableCell>
                <TableCell>{payment.paymentType}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {selectedRows} / {payments.length} satır seçildi.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange("prev")}
            >
              Önceki
            </Button>
            <span className="text-sm">
              Sayfa {currentPage} / {Math.ceil(payments.length / itemsPerPage)}
            </span>
            <Button
              variant="outline"
              disabled={currentPage * itemsPerPage >= payments.length}
              onClick={() => handlePageChange("next")}
            >
              Sonraki
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
