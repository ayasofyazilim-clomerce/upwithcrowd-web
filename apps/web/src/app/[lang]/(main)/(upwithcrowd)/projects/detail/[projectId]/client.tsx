"use client";
import type {
  UpwithCrowd_Projects_ListProjectsResponseDto,
  UpwithCrowd_Projects_ProjectStatisticsDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import SendNotificationForm from "@repo/ui/upwithcrowd/novu/send-notification-form";
import FundingCard from "@repo/ui/upwithcrowd/project-components/funding-card";

function ClientPage({
  projectDetail,
  stats,
}: {
  projectDetail: UpwithCrowd_Projects_ListProjectsResponseDto;
  stats: UpwithCrowd_Projects_ProjectStatisticsDto | null;
}) {
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
    <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2">
      <FundingCard projectDetail={projectDetail} statsResponse={stats} />
      <SendNotificationForm notificationType="topics" topics={topics} />
    </div>
  );
}

export default ClientPage;
