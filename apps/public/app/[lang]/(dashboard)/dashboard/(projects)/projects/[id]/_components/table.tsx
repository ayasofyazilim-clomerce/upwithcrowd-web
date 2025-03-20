"use client";
import type {
  PagedResultDto_ListProjectInvestorDto,
  UpwithCrowd_Payment_ListProjectInvestorDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Payment_ListProjectInvestorDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {formatCurrency} from "@repo/ui/utils";

interface ProjectInvestorProps {
  investorResponse: PagedResultDto_ListProjectInvestorDto;
}

function AmountRow(row: UpwithCrowd_Payment_ListProjectInvestorDto) {
  return <div>{formatCurrency(row.amount)}</div>;
}

export default function ProjectInvestorTable({investorResponse}: ProjectInvestorProps) {
  const columns = tanstackTableCreateColumnsByRowData<UpwithCrowd_Payment_ListProjectInvestorDto>({
    rows: $UpwithCrowd_Payment_ListProjectInvestorDto.properties,
    custom: {
      amount: {
        content: (row) => AmountRow(row),
      },
    },
    languageData: {
      name: "Yatırımcı Adı",
      amount: "Miktar",
      creationTime: "Oluşturulma Tarihi",
    },
  });

  return (
    <TanstackTable
      columnOrder={["name", "amount", "creationTime"]}
      columnVisibility={{
        columns: ["name", "amount", "creationTime"],
        type: "show",
      }}
      columns={columns}
      data={investorResponse.items || []}
    />
  );
}
