"use client";
import {Button} from "@repo/ayasofyazilim-ui/atoms/button";
import {Card, CardContent, CardHeader, CardTitle} from "@repo/ayasofyazilim-ui/atoms/card";

import {Textarea} from "@repo/ayasofyazilim-ui/atoms/textarea";
import {postNovuBroadcast, postNovuTrigger} from "@repo/actions/core/NovuService/actions";
import {Input} from "@repo/ayasofyazilim-ui/atoms/input";
import {Combobox} from "@repo/ayasofyazilim-ui/molecules/combobox";
import {MultiSelect} from "@repo/ayasofyazilim-ui/molecules/multi-select";
import SelectTabs, {SelectTabsContent} from "@repo/ayasofyazilim-ui/molecules/select-tabs";
import {handlePostResponse} from "@repo/utils/api";
import {GalleryVerticalEnd, Send, Users} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";

function SendNotificationForm({
  broadcastEnabled,
  membersEnabled,
  workflow,
}: {
  broadcastEnabled?: boolean;
  membersEnabled?: boolean;
  workflow?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notificationType, setNotificationType] = useState<string>(() => {
    if (membersEnabled && !broadcastEnabled) return "members";
    if (!membersEnabled && broadcastEnabled) return "broadcast";
    return "";
  });

  const [workflowType, setWorkflowType] = useState<{value: string; label: string} | null | undefined>(
    workflow ? {value: workflow, label: workflow} : null,
  );
  const [receivers, setReceivers] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>();
  const [message, setMessage] = useState<string>();

  const isFormDisabled =
    !notificationType ||
    !workflowType ||
    !subject ||
    !message ||
    (notificationType === "members" && receivers.length === 0) ||
    isPending;

  function handleSendNotification() {
    if (isFormDisabled) return;

    startTransition(async () => {
      if (notificationType === "members") {
        await postNovuTrigger(workflowType.value, {subject, message}, receivers).then((response) => {
          handlePostResponse(response, router);
        });
      } else {
        await postNovuBroadcast(workflowType.value, {subject, message}).then((response) => {
          handlePostResponse(response, router);
        });
      }
    });
  }

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <CardTitle className="text-lg sm:text-xl">Bildirim Oluştur</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6 sm:pt-0">
        <div>
          <div className="my-2">
            <label className="text-bold mb-0.5 block text-sm" htmlFor="subject">
              Konu
            </label>
            <Input
              id="subject"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              placeholder="Konu"
            />
          </div>
          <div className="my-2">
            <label className="text-bold mb-0.5 block text-sm " htmlFor="message">
              Mesaj
            </label>
            <Textarea
              id="message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Mesaj"
            />
          </div>
          {broadcastEnabled && membersEnabled && (
            <div className="my-2">
              <div className="text-bold mb-0.5 block text-sm ">Bildirim Tipi</div>
              <SelectTabs
                deselect
                onValueChange={setNotificationType}
                disabled={!broadcastEnabled || !membersEnabled}
                value={notificationType}>
                <SelectTabsContent value="broadcast">
                  <div className="flex flex-row items-center gap-1">
                    <GalleryVerticalEnd />
                    Herkes
                  </div>
                </SelectTabsContent>
                <SelectTabsContent value="members">
                  <div className="flex flex-row items-center gap-1">
                    <Users />
                    Members
                  </div>
                </SelectTabsContent>
              </SelectTabs>
            </div>
          )}
          {!workflow && (
            <div className="my-2">
              <label className="text-bold mb-0.5 block text-sm " htmlFor="workflow">
                Workflow
              </label>
              <Combobox
                id="workflow"
                list={[
                  {value: "upwithcrowd-projeniz-onaylandi", label: "UpwithcrowdProjenizOnaylandı"},
                  {value: "on-boarding-notification-w5ZrZcvEu", label: "On-boarding Notification"},
                ]}
                onValueChange={setWorkflowType}
                selectIdentifier="value"
                selectLabel="label"
                value={workflowType}
              />
            </div>
          )}

          {notificationType === "members" && (
            <div className="my-2">
              <label className="text-bold mb-0.5 block text-sm " htmlFor="receivers">
                Alıcılar
              </label>
              <MultiSelect
                id="receivers"
                onValueChange={setReceivers}
                options={[
                  {value: "investors", label: "Investors"},
                  {value: "entrepreneurs", label: "Entrepreneurs"},
                ]}
                value={receivers}
              />
            </div>
          )}

          <Button disabled={isFormDisabled} onClick={handleSendNotification} type="submit">
            {isPending ? (
              <span className="flex items-center gap-1">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Gönderiliyor...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Send className="h-4 w-4" />
                Bildirimi Gönder
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SendNotificationForm;
