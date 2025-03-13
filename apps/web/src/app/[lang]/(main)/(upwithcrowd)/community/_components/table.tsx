"use client";

import type {GetApiMemberResponse} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useParams, useRouter} from "next/navigation";
import {tableData} from "./member-table-data";

function CommunityTable({response}: {response: GetApiMemberResponse}) {
  const {lang} = useParams<{lang: string}>();
  const router = useRouter();
  const columns = tableData.projects.columns(lang);
  const table = tableData.projects.table(router);

  return <TanstackTable {...table} columns={columns} data={response.items || []} rowCount={response.totalCount} />;
}
export default CommunityTable;
