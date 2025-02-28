"use client";

import {cn} from "@/lib/utils";
import {
  $UpwithCrowd_TasksComment_TasksCommentDto,
  type PagedResultDto_ListTasksDto,
  type UpwithCrowd_Tasks_ListTasksDto,
  type UpwithCrowd_TasksComment_TasksCommentDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {handlePostResponse} from "@repo/utils/api";
import {postTaskCommentApi} from "@upwithcrowd/task-comment/post-action";
import {useState, useTransition} from "react";

export default function ClientPage({taskResponse}: {taskResponse: PagedResultDto_ListTasksDto}) {
  const [selectedTask, setSelectedTask] = useState<UpwithCrowd_Tasks_ListTasksDto | null>(
    taskResponse.items?.[0] ?? null,
  );
  const [isPending, startTransition] = useTransition();
  return (
    <div className="my-2 grid grid-cols-3 gap-3">
      <div className="col-span-1 flex flex-col gap-3">
        {taskResponse.items?.map((item) => (
          <button
            key={item.id}
            className={cn(
              "hover:bg-accent flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all",
              selectedTask?.id === item.id && "bg-muted",
            )}
            onClick={() => setSelectedTask(item)}>
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">John Doe</div>
                  {/* {!item.read && (
                  <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                )} */}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selectedTask?.id === item.id ? "text-foreground" : "text-muted-foreground",
                  )}>
                  {/* {formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                })} */}
                </div>
              </div>
              <div className="break-all text-xs font-medium">{item.summary}</div>
            </div>
            <div className="text-muted-foreground line-clamp-2 break-all text-xs">
              {item.description.substring(0, 300)}
            </div>
          </button>
        ))}
      </div>
      <div className="col-span-2">
        {selectedTask && (
          <div className="flex flex-col gap-3 rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="font-semibold">John Doe</div>
                {/* {!item.read && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              )} */}
              </div>
              <div className="text-muted-foreground text-xs">
                {/* {formatDistanceToNow(new Date(item.date), {
                addSuffix: true,
              })} */}
              </div>
            </div>
            <div className="break-all text-sm font-medium">{selectedTask.summary}</div>
            <div className="break-all">{selectedTask.description}</div>
            <hr />
            <SchemaForm<UpwithCrowd_TasksComment_TasksCommentDto>
              className="flex flex-col gap-4"
              disabled={isPending}
              filter={{
                type: "exclude",
                keys: ["tasksId", "memberId", "projectId"],
              }}
              // formData={response}
              onSubmit={({formData}) => {
                startTransition(() => {
                  if (formData?.comment)
                    void postTaskCommentApi({
                      requestBody: {
                        memberId: selectedTask?.memberId || "",
                        projectId: selectedTask?.projectId || "",
                        tasksId: selectedTask?.id || "",
                        comment: formData?.comment || "",
                      },
                    }).then((res) => {
                      handlePostResponse(res);
                    });
                });
              }}
              schema={$UpwithCrowd_TasksComment_TasksCommentDto}
              submitText={"Gönder"}
              uiSchema={{
                comment: {
                  "ui:title": "Yorum",
                  "ui:widget": "textarea",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
