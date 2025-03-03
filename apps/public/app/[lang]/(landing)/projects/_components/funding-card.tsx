"use client";

import {Info} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
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
    <div className="mt-8 rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-semibold text-black">Yatırım Bilgileri</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              Nominal Fon Miktarı
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Proje için temel fonlama miktarı</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>{formatCurrency(data.fundNominalAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              Ek Fon Oranı
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Nominal tutara uygulanan ek fonlama oranı</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>{formatPercentage(data.additionalFundRate)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              Nitelikli Fon Oranı
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Nitelikli fonlama senaryoları için uygulanan oran</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>{formatPercentage(data.qualifiedFundRate)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              Aşırı Fonlama
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Projenin fonlama hedefini aşıp aşmadığını gösterir</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Badge variant={data.overFunding ? "default" : "secondary"}>{data.overFunding ? "Evet" : "Hayır"}</Badge>
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
  );
}
