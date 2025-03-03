"use client";

import {Info} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Badge} from "@/components/ui/badge";
import type {UpwithCrowd_Projects_ProjectsDetailResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

function InfoButton({href}: {href: string}) {
  const router = useRouter();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="h-4 w-4"
          onClick={() => {
            router.push(href);
          }}
          size="icon"
          variant="ghost">
          <Info className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Bu bölümü düzenlemek için tıklayın</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface FundingTableProps {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
  editLink: string;
}

export default function FundingTable({data, editLink}: FundingTableProps) {
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
            <div className="flex items-start">
              <TableHead className="text-xl font-semibold text-black">Yatırım Bilgileri</TableHead>
              <InfoButton href={editLink} />
            </div>
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
              Ek Fonlama Oranı
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Nominal miktara uygulanan ek fonlama oranı</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>{formatPercentage(data.additionalFundRate)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              Nitelikli Fonlama Oranı
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
              Ek Fonlama
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Projenin fonlama hedefini aşıp aşamayacağını gösterir</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Badge variant={data.overFunding ? "default" : "secondary"}>{data.overFunding ? "Evet" : "Hayır"}</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              Nakit Değeri
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Fonlamanın mevcut nakit değeri</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>{formatCurrency(data.cashValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              Fonlanabilir Miktar
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Fonlanabilecek maksimum miktar</TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>{formatCurrency(data.fundableAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 font-medium">
              Fonlama Tipi
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Fon toplama yöntemi</TooltipContent>
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
