import type {UpwithCrowd_Projects_UpdateProjectFundingDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getPublicProjectDetailsFundingApi} from "@repo/actions/upwithcrowd/project/action";
import ClientFunding from "./client";

export default async function Funding({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const {id} = params;
  const projectDetail = await getPublicProjectDetailsFundingApi(id);

  if (projectDetail.type !== "success") return <>veri bulunamadı</>;

  const fundingDetail: Required<UpwithCrowd_Projects_UpdateProjectFundingDto> = {
    fundCollectionType: projectDetail.data.fundCollectionType || "NONE",
    projectStartDate: projectDetail.data.projectStartDate || "",
    projectEndDate: projectDetail.data.projectEndDate || "",
    fundNominalAmount: projectDetail.data.fundNominalAmount || 0,
    fundableAmount: projectDetail.data.fundableAmount || 0,
    additionalFundRate: projectDetail.data.additionalFundRate || "",
    qualifiedFundRate: projectDetail.data.qualifiedFundRate || "",
    overFunding: projectDetail.data.overFunding || false,
    cashValue: 1000,
    minimumFundAmount: projectDetail.data.minimumFundAmount || 0,
    privilege: projectDetail.data.privilege || "",
  };
  return (
    <div>
      <ClientFunding fundingDetail={fundingDetail} />
    </div>
  );
}
