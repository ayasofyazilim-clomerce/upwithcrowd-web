"use client";

import type {GetApiPublicFileResponse} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useParams} from "next/navigation";
import {tableData} from "./member-file-table-data";

function OrganizationFormTable({response}: {response: GetApiPublicFileResponse}) {
  const {lang} = useParams<{lang: string}>();
  const columns = tableData.organization.columns(lang);
  const table = tableData.organization.table();

  return <TanstackTable {...table} columns={columns} data={response} rowCount={response.length} />;
}
export default OrganizationFormTable;
