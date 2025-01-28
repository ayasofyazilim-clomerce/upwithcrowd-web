import ClientFunding from "./client";
import { getPublicProjectDetailsFundingApi } from "@/actions/upwithcrowd/project/action";
import { UpwithCrowd_Projects_UpdateProjectFundingDto } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

export default async function Funding({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const projectDetail = await getPublicProjectDetailsFundingApi(id);

  if (projectDetail.type !== "success") return <>yok</>;

  const fundingDetail: Required<UpwithCrowd_Projects_UpdateProjectFundingDto> =
    {
      fundCollectionType: projectDetail.data.fundCollectionType || "NONE",
      fundNominalAmount: projectDetail.data.fundNominalAmount || 0,
      fundableAmount: projectDetail.data.fundableAmount || 0,
      additionalFundRate: projectDetail.data.additionalFundRate || "",
      qualifiedFundRate: projectDetail.data.qualifiedFundRate || "",
      overFunding: projectDetail.data.overFunding || false,
      cashValue: projectDetail.data.cashValue || 0,
      minimumFundAmount: projectDetail.data.minimumFundAmount || 0,
      privilege: projectDetail.data.privilege || "",
    };
  return (
    <div>
      <ClientFunding fundingDetail={fundingDetail} />
    </div>
  );
}
