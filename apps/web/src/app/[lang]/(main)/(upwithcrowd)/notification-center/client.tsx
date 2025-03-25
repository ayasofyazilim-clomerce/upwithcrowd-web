"use client";
import type {ActivityStatsResponseDto} from "@repo/actions/core/NovuService/types";
import Infocard from "@repo/ayasofyazilim-ui/molecules/infocard";
import {Bell} from "lucide-react";
import SendNotificationForm from "@repo/ui/upwithcrowd/novu/send-notification-form";

function Form({notificationStats}: {notificationStats: ActivityStatsResponseDto | undefined}) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <Infocard
            content={notificationStats?.weeklySent.toString() || "0"}
            description="gönderilen bildirimler"
            icon={<Bell className="h-5 w-5" />}
            title="Bu hafta"
          />
          <Infocard
            content={notificationStats?.monthlySent.toString() || "0"}
            description="gönderilen bildirimler"
            icon={<Bell className="h-5 w-5" />}
            title="Bu ay"
          />
        </div>
      </div>
      <SendNotificationForm notificationType="broadcast" />
    </div>
  );
}

export default Form;
