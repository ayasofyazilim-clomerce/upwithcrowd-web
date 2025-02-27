import type {UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {CheckCircle, XCircle} from "lucide-react";

type ProjectsTable = TanstackTableCreationProps<UpwithCrowd_Members_ListMemberResponseDto>;

const facetedOptions = [
  {
    label: "Yes",
    when: (value: string | number | boolean | Date) => {
      return Boolean(value);
    },
    value: "true",
    icon: CheckCircle,
    iconClassName: "text-green-700",
    hideColumnValue: true,
  },
  {
    label: "No",
    when: (value: string | number | boolean | Date) => {
      return !value;
    },
    value: "false",
    icon: XCircle,
    iconClassName: "text-red-700",
    hideColumnValue: true,
  },
];
const projectsColumns = (locale: string) => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Members_ListMemberResponseDto>({
    rows: $UpwithCrowd_Members_ListMemberResponseDto.properties,
    languageData: {
      title: "Tam Adı",
      isValidated: "Onay Durumu",
      projectStartDate: "Başlangıç Tarihi",
      projectEndDate: "Bitiş Tarihi",
      overFunding: "Ek Fonlama",
    },
    // links: {
    //   projectName: {
    //     prefix: getBaseLink("projects", locale),
    //     targetAccessorKey: "id",
    //   },
    // },
    // faceted: {
    //   overFunding: {
    //     options: [
    //       {
    //         label: "Yes",
    //         when: (value) => {
    //           return Boolean(value);
    //         },
    //         value: "true",
    //         icon: CheckCircle,
    //         iconClassName: "text-green-700",
    //         hideColumnValue: true,
    //       },
    //       {
    //         label: "No",
    //         when: (value) => {
    //           return !value;
    //         },
    //         value: "false",
    //         icon: XCircle,
    //         iconClassName: "text-red-700",
    //         hideColumnValue: true,
    //       },
    //     ],
    //   },
    // },
    custom: {
      title: {
        showHeader: true,
        content(row) {
          return <div>{row.title || `${row.name} ${row.surname}`}</div>;
        },
      },
    },
    faceted: {
      isValidated: {
        options: facetedOptions,
      },
      isEntrepreneur: {
        options: facetedOptions,
      },
      isInvestor: {
        options: facetedOptions,
      },
    },
    config: {
      locale,
    },
  });
};

function projectsTable() {
  const table: ProjectsTable = {
    columnVisibility: {
      type: "show",
      columns: ["title", "mail", "mobile", "isEntrepreneur", "isInvestor", "isValidated"],
    },
  };
  return table;
}

export const tableData = {
  projects: {
    columns: projectsColumns,
    table: projectsTable,
  },
};
