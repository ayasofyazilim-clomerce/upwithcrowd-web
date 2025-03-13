"use client";

import type {GetApiFileResponse} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useParams, useRouter} from "next/navigation";
import {tableData} from "./file-table-data";

function FileTable({fileResponse}: {fileResponse: GetApiFileResponse}) {
  const {lang} = useParams<{lang: string}>();
  const router = useRouter();
  const columns = tableData.projects.columns(lang);
  const table = tableData.projects.table(router);
  return <TanstackTable {...table} columns={columns} data={fileResponse} />;
}
export default FileTable;
