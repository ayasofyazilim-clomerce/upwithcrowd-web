"use client";
import type {
  PagedResultDto_FileTypeMimeTypesListDto,
  UpwithCrowd_FileTypes_ListFileTypeDto,
  UpwithCrowd_Members_MimeTypeListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useGrantedPolicies} from "@repo/utils/policies";
import {useRouter} from "next/navigation";
import type {DefaultResource} from "@/language-data/core/Default";
import {tableData} from "./file-type-mime-type-table-data";

function FileTypeMimeTypesTable({
  locale,
  languageData,
  response,
  mimeTypeData,
  fileTypeData,
}: {
  locale: string;
  languageData: DefaultResource;
  response: PagedResultDto_FileTypeMimeTypesListDto;
  mimeTypeData: UpwithCrowd_Members_MimeTypeListDto[];
  fileTypeData: UpwithCrowd_FileTypes_ListFileTypeDto[];
}) {
  const router = useRouter();
  const {grantedPolicies} = useGrantedPolicies();
  const columns = tableData.fileTypeMimeTypes.columns(locale);
  const table = tableData.fileTypeMimeTypes.table(languageData, router, grantedPolicies, mimeTypeData, fileTypeData);
  return <TanstackTable {...table} columns={columns} data={response.items || []} rowCount={response.totalCount} />;
}

export default FileTypeMimeTypesTable;
