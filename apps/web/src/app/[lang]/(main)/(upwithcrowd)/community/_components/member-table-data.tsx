import type {UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Members_ListMemberResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {TanstackTableCreationProps} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {CheckCircle, XCircle} from "lucide-react";
import {getBaseLink} from "@/utils";

type MemberTable = TanstackTableCreationProps<UpwithCrowd_Members_ListMemberResponseDto>;

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
const memberColumns = (locale: string) => {
  return tanstackTableCreateColumnsByRowData<UpwithCrowd_Members_ListMemberResponseDto>({
    rows: $UpwithCrowd_Members_ListMemberResponseDto.properties,
    languageData: {
      title: "Tam Adı",
      isValidated: "Onay Durumu",
    },
    custom: {
      title: {
        showHeader: true,
        content(row) {
          return <div>{row.title || `${row.name} ${row.surname}`}</div>;
        },
      },
    },
    links: {
      title: {
        prefix: getBaseLink("community/detail", locale),
        targetAccessorKey: "id",
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

function memberTable() {
  const table: MemberTable = {
    fillerColumn: "title",
    columnVisibility: {
      type: "show",
      columns: ["title", "mail", "mobile", "isEntrepreneur", "isInvestor", "isValidated"],
    },
  };
  return table;
}

export const tableData = {
  member: {
    columns: memberColumns,
    table: memberTable,
  },
};
