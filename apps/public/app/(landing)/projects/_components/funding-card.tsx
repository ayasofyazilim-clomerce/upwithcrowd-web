"use client";

import {Info} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Badge} from "@/components/ui/badge";
import type {UpwithCrowd_Projects_ProjectsDetailResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

interface FundingTableProps {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
}

export default function FundingTable({data}: FundingTableProps) {
  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatPercentage = (value: string | null | undefined) => {
    if (value === null || value === undefined) return "-";
    return `${value}%`;
  };

  const getFundCollectionTypeLabel = (type: string | undefined) => {
    if (!type) return "None";

    const types: Record<string, string> = {
      NONE: "None",
      SHRE: "Share",
      DBIT: "Debit",
      SHRE_DBIT: "Share & Debit",
    };
    return types[type] || type;
  };

  return (
    <TooltipProvider>
      <div className="mt-8 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl font-semibold text-black">Investment Information</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Nominal Fund Amount
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>The base funding amount for the project</TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{formatCurrency(data.fundNominalAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Additional Fund Rate
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Extra funding rate applied to the nominal amount</TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{formatPercentage(data.additionalFundRate)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Qualified Fund Rate
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Rate applied for qualified funding scenarios</TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{formatPercentage(data.qualifiedFundRate)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Over Funding
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Indicates if the project is over its funding target</TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Badge variant={data.overFunding ? "default" : "secondary"}>{data.overFunding ? "Yes" : "No"}</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Cash Value
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Current cash value of the funding</TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{formatCurrency(data.cashValue)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Fundable Amount
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Maximum amount that can be funded</TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{formatCurrency(data.fundableAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Fund Collection Type
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Method of fund collection</TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getFundCollectionTypeLabel(data.fundCollectionType)}</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
