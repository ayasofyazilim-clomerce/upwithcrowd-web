"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const paymentData: UpwithCrowd_Payment_ListPaymentTransactionDto[] = [
  {
    projectID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    memberID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    amount: 100.0,
    paymentType: 1,
    type: 2,
    relatedTransactionID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    remainingAmount: 50.0,
    paymentStatus: 0,
  },
  {
    projectID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    memberID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    amount: 200.0,
    paymentType: 2,
    type: 1,
    relatedTransactionID: null,
    remainingAmount: null,
    paymentStatus: 2,
  },
  {
    projectID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    memberID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    amount: 200.0,
    paymentType: 2,
    type: 1,
    relatedTransactionID: null,
    remainingAmount: null,
    paymentStatus: 1,
  },
  {
    projectID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    memberID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    amount: 200.0,
    paymentType: 2,
    type: 1,
    relatedTransactionID: null,
    remainingAmount: null,
    paymentStatus: 2,
  },
  {
    projectID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    memberID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    amount: 200.0,
    paymentType: 2,
    type: 1,
    relatedTransactionID: null,
    remainingAmount: null,
    paymentStatus: 2,
  },
  {
    projectID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    memberID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    amount: 200.0,
    paymentType: 2,
    type: 1,
    relatedTransactionID: null,
    remainingAmount: null,
    paymentStatus: 2,
  },
  {
    projectID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    memberID: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    amount: 200.0,
    paymentType: 2,
    type: 1,
    relatedTransactionID: null,
    remainingAmount: null,
    paymentStatus: 2,
  },
  // Add more items as needed
];

import {
  $UpwithCrowd_Payment_ListPaymentTransactionDto,
  UpwithCrowd_Payment_ListPaymentTransactionDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { tanstackTableCreateColumnsByRowData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PaymentsTable() {
  const [open, setOpen] = useState(false);
  const [infoContent, setInfoContent] = useState("");

  const handleInfoClick = (content: string) => {
    setInfoContent(content);
    setOpen(true);
    console.log("info clicked");
  };

  const columns =
    tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListPaymentTransactionDto>(
      {
        rows: $UpwithCrowd_Payment_ListPaymentTransactionDto.properties,
        custom: {
          type: {
            showHeader: true,
            content: (row) => {
              const options = {
                className: "bg-green-100 text-green-700",
                label: "Success",
                onClick: () => handleInfoClick("Success info"),
              };
              switch (row.paymentStatus) {
                case 0:
                  options.className = "bg-red-200 text-red-700";
                  options.label = "Failed";
                  options.onClick = () => handleInfoClick("Failed");
                  break;
                case 1:
                  options.className = "bg-green-200 text-green-700";
                  options.label = "Successed";
                  options.onClick = () => handleInfoClick("Successed");
                  break;
                case 2:
                  options.className = "bg-yellow-100 text-yellow-700";
                  options.label = "Processing";
                  options.onClick = () => handleInfoClick("Processing");
                  break;
              }
              return (
                <Badge
                  className={cn(
                    "flex items-center justify-center rounded-2xl px-2 py-0 text-white",
                    options.className,
                  )}
                  variant={"outline"}
                >
                  {options.label}
                  <Button
                    onClick={() => options.onClick()}
                    size={"icon"}
                    variant={"ghost"}
                    className="hover:text-muted text-white hover:bg-transparent"
                  >
                    <Info
                      className={cn(
                        "inline w-4 cursor-pointer",
                        options.className,
                      )}
                    />
                  </Button>
                </Badge>
              );
            },
          },
        },
      },
    );

  return (
    <>
      <TanstackTable
        columns={columns}
        data={paymentData}
        fillerColumn="projectID"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Info</DialogTitle>
          <p>Transaction {infoContent}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
