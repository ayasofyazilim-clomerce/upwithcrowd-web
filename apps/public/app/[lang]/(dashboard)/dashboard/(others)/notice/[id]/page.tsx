"use client";
import SendNotificationForm from "@repo/ui/upwithcrowd/novu/send-notification-form";

function NoticePage({params}: {params: {id: string}}) {
  const topics = [
    {
      value: `${params.id}_followers`,
      label: "Proje takipçileri",
    },
    {
      value: `${params.id}_investors`,
      label: "Proje yatırımcıları",
    },
    {
      value: `${params.id}_entrepreneurs`,
      label: "Proje ekibi",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl">
      <SendNotificationForm notificationType="topics" topics={topics} />
    </div>
  );
}

export default NoticePage;
