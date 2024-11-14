"use client";

import type {
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractsForMerchantDto,
  PagedResultDto_ContractHeaderDetailForMerchantDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantDto as $ContractsForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import { tanstackTableCreateColumnsByRowData as columnsByData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import type { ContractServiceResource } from "src/language-data/ContractService";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";

export default function Contracts({
  crmLanguageData,
  contractsLanguageData,
  contractsData,
  partyId,
  partyName,
  lang,
}: {
  crmLanguageData: CRMServiceServiceResource;
  contractsLanguageData: ContractServiceResource;
  contractsData: PagedResultDto_ContractHeaderDetailForMerchantDto;
  partyId: string;
  partyName: "merchants";
  lang: string;
}) {
  const router = useRouter();
  const customColumns = columnsByData<ContractsForMerchantDto>({
    row: $ContractsForMerchantDto.properties,
    languageData: {
      constantKey: "Contracts.Form",
      languageData: contractsLanguageData,
    },
    badges: {
      name: {
        targetAccessorKey: "isDraft",
        values: [
          {
            label: "Draft",
            value: true,
          },
        ],
      },
    },
    links: {
      name: {
        prefix: `/app/admin/parties/${partyName}/${partyId}/contracts`,
        targetAccessorKey: "id",
      },
    },
    dates: {
      validFrom: {
        locale: lang,
      },
      validTo: {
        locale: lang,
      },
    },
    icons: {
      name: {
        icon: OpenInNewWindowIcon,
        position: "before",
      },
    },
  });

  return (
    <SectionLayoutContent sectionId="contracts">
      <TanstackTable
        columnVisibility={{
          type: "show",
          columns: ["name", "validFrom", "validTo"],
        }}
        columns={customColumns}
        data={contractsData.items || []}
        tableActions={[
          {
            type: "simple",
            actionLocation: "table",
            cta: crmLanguageData["Contracts.New"],
            onClick: () => {
              router.push(
                getBaseLink(
                  `/app/admin/parties/${partyName}/${partyId}/contracts/new/`,
                ),
              );
            },
          },
          {
            type: "simple",
            actionLocation: "table",
            cta: crmLanguageData.ExportCSV,
            onClick: () => {
              router.push(
                getBaseLink(
                  `/app/admin/parties/${partyName}/${partyId}/contracts/new/`,
                ),
              );
            },
          },
        ]}
      />
    </SectionLayoutContent>
  );
}
