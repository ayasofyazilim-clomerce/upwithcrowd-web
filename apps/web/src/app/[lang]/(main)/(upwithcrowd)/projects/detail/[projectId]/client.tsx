"use client";
import type {UpwithCrowd_Projects_ListProjectsResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import SendNotificationForm from "@repo/ui/upwithcrowd/novu/send-notification-form";
import FundingCard from "@repo/ui/upwithcrowd/project-components/funding-card";

function ClientPage({projectDetail}: {projectDetail: UpwithCrowd_Projects_ListProjectsResponseDto}) {
  const topics = [
    {
      value: `${projectDetail.id}_followers`,
      label: "Proje takipçileri",
    },
    {
      value: `${projectDetail.id}_investors`,
      label: "Proje yatırımcıları",
    },
    {
      value: `${projectDetail.id}_entrepreneurs`,
      label: "Proje ekibi",
    },
  ];
  return (
    <div className="mt-2 grid grid-cols-2 gap-3">
      <FundingCard projectDetail={projectDetail} />
      <SendNotificationForm notificationType="topics" topics={topics} />
    </div>
  );
}

export default ClientPage;
