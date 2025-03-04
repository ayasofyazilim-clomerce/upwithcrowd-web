"use client";

import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useParams} from "next/navigation";
import type {FileType} from "../type";
import {tableData} from "./file-table-data";

const fileData: FileType[] = [
  {
    id: "1",
    fileExtension: "pdf",
    fileType: "İmza Sürkileri",
    fileName: "imza-surkileri.pdf",
    fileSize: 10,
    creationDate: new Date("Tue Mar 02 2025 08:42:17 GMT+0300 (GMT+03:00)"),
    fileLink: "https://google.com",
  },
  {
    id: "2",
    fileExtension: "doc",
    fileType: "Başvuru Formu",
    fileName: "basvuru-formu.doc",
    fileSize: 12,
    creationDate: new Date("Tue Mar 01 2025 08:42:17 GMT+0300 (GMT+03:00)"),
    fileLink: "https://google.com",
  },
  {
    id: "3",
    fileExtension: "png",
    fileType: "Logo",
    fileName: "gorsel.png",
    fileSize: 12,
    creationDate: new Date("Tue Mar 03 2025 08:42:17 GMT+0300 (GMT+03:00)"),
    fileLink: "https://google.com",
  },
];

function FileTable() {
  const {lang} = useParams<{lang: string}>();
  const columns = tableData.projects.columns(lang);
  const table = tableData.projects.table();
  return <TanstackTable {...table} columns={columns} data={fileData} />;
}
export default FileTable;
