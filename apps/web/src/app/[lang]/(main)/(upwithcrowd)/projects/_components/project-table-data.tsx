import {Progress} from "@/components/ui/progress";
import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {handlePutResponse} from "@repo/utils/api";
import {putProjectStatusByIdApi} from "@repo/actions/upwithcrowd/project/put-action";
import {Ban, CheckCircle, XCircle} from "lucide-react";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {getBaseLink} from "@/utils";

type ProjectsTable = TanstackTableCreationProps<UpwithCrowd_Projects_ListProjectsResponseDto>;

const projectsColumns = (locale: string) => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Projects_ListProjectsResponseDto>({
    rows: $UpwithCrowd_Projects_ListProjectsResponseDto.properties,
    languageData: {
      projectName: "Proje Adı",
      fundableAmount: "Fonlanma Durumu",
      projectStartDate: "Başlangıç Tarihi",
      projectEndDate: "Bitiş Tarihi",
      overFunding: "Ek Fonlama",
    },
    links: {
      projectName: {
        prefix: getBaseLink("projects/detail", locale),
        targetAccessorKey: "id",
      },
    },
    faceted: {
      overFunding: {
        options: [
          {
            label: "Yes",
            when: (value) => {
              return Boolean(value);
            },
            value: "true",
            icon: CheckCircle,
            iconClassName: "text-green-700",
            hideColumnValue: true,
          },
          {
            label: "No",
            when: (value) => {
              return !value;
            },
            value: "false",
            icon: XCircle,
            iconClassName: "text-red-700",
            hideColumnValue: true,
          },
        ],
      },
    },
    custom: {
      fundableAmount: {
        showHeader: true,

        content(row) {
          return (
            <div className="w-full min-w-80 px-4">
              <div className="my-2 flex justify-between text-xs">
                <div>
                  <div>{row.fundNominalAmount}₺</div>
                </div>
                <div className="text-right">
                  <div>{row.fundableAmount}₺</div>
                </div>
              </div>
              <Progress className="w-full" value={(row.fundNominalAmount / row.fundableAmount) * 100} />
              <div className="my-2 flex justify-between text-xs">
                <div>
                  <div className="text-muted-foreground">Fonlanan Tutar</div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground">Fonlanabilir Tutar</div>
                </div>
              </div>
            </div>
          );
        },
      },
    },
    config: {
      locale,
    },
  });
};

function projectsTable(router: AppRouterInstance) {
  const table: ProjectsTable = {
    fillerColumn: "projectName",
    columnVisibility: {
      type: "show",
      columns: ["projectName", "projectStartDate", "projectEndDate", "fundableAmount", "overFunding"],
    },
    columnOrder: ["fundableAmount", "projectName"],
    rowActions: [
      {
        actionLocation: "row",
        cta: "Projeyi Onayla",
        onClick(row) {
          void putProjectStatusByIdApi({
            id: row.id,
            status: "Approved",
          }).then((response) => {
            handlePutResponse(response, router);
          });
        },
        type: "simple",
        icon: CheckCircle,
        condition: (row) => row.status === "Pending",
      },
      {
        actionLocation: "row",
        cta: "Projeyi Reddet",

        onClick(row) {
          void putProjectStatusByIdApi({
            id: row.id,
            status: "Rejected",
          }).then((response) => {
            handlePutResponse(response, router);
          });
        },
        type: "simple",
        icon: XCircle,
        condition: (row) => row.status === "Pending",
      },
      {
        actionLocation: "row",
        cta: "Projeyi İptal Et",

        onClick(row) {
          void putProjectStatusByIdApi({
            id: row.id,
            status: "Cancelled",
          }).then((response) => {
            handlePutResponse(response, router);
          });
        },
        type: "simple",
        icon: Ban,
        condition: (row) => row.status === "Pending",
      },
    ],
  };
  return table;
}

export const tableData = {
  projects: {
    columns: projectsColumns,
    table: projectsTable,
  },
};
