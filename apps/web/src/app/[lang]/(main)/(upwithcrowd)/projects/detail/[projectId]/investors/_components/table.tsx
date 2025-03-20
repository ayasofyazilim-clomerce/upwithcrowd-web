"use client";

import type {PagedResultDto_ListProjectInvestorDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useParams} from "next/navigation";
import {tableData} from "./investors-table-data";

function InvestorsTable({investorsResponse}: {investorsResponse: PagedResultDto_ListProjectInvestorDto}) {
  const {lang} = useParams<{lang: string}>();
  const columns = tableData.projects.columns(lang);
  const table = tableData.projects.table();
  return (
    <TanstackTable
      {...table}
      columns={columns}
      data={investorsResponse.items || []}
      rowCount={investorsResponse.totalCount}
    />
  );
}
export default InvestorsTable;
