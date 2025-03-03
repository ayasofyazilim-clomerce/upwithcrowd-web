"use client";
import {
  $UpwithCrowd_TasksComment_TasksCommentDto,
  type PagedResultDto_ListTasksCommentDto,
  type UpwithCrowd_Tasks_ListTasksDto,
  type UpwithCrowd_TasksComment_TasksCommentDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {handlePostResponse} from "@repo/utils/api";
import {postTaskCommentApi} from "@upwithcrowd/task-comment/post-action";
import {formatDistanceToNow} from "date-fns";
import {useTransition} from "react";

function TaskDetail({
  taskData,
  taskCommentResponse,
}: {
  taskData: UpwithCrowd_Tasks_ListTasksDto;
  taskCommentResponse: PagedResultDto_ListTasksCommentDto;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="col-span-2">
      <div className="flex flex-col gap-3 rounded-lg border p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{taskData.fullname}</div>
          </div>
          <div className="text-muted-foreground text-xs">
            {formatDistanceToNow(new Date(taskData.createDateTime), {addSuffix: true})}
          </div>
        </div>
        <div className="break-all text-sm font-medium">{taskData.summary}</div>
        <div className="-mx-3 break-all border-b px-3 pb-4">{taskData.description}</div>

        {taskCommentResponse.items?.map((comment) => (
          <div className="-mx-3 flex flex-col gap-2 border-b px-3 pb-4" key={comment.id}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="font-semibold">John Doe</div>
              </div>
              <div className="text-muted-foreground text-xs">{formatDistanceToNow(new Date(), {addSuffix: true})}</div>
            </div>
            <div className="break-all text-xs font-medium">{comment.comment}</div>
          </div>
        ))}
        <SchemaForm<UpwithCrowd_TasksComment_TasksCommentDto>
          className="flex flex-col gap-4"
          disabled={isPending}
          filter={{
            type: "exclude",
            keys: ["taskId"],
          }}
          onSubmit={({formData}) => {
            startTransition(() => {
              if (formData?.comment)
                void postTaskCommentApi({
                  requestBody: {
                    taskId: taskData.id || "",
                    comment: formData.comment || "",
                  },
                }).then((res) => {
                  handlePostResponse(res);
                });
            });
          }}
          schema={$UpwithCrowd_TasksComment_TasksCommentDto}
          submitText="Gönder"
          uiSchema={{
            comment: {
              "ui:title": "Yorum",
              "ui:widget": "textarea",
            },
          }}
        />
      </div>
    </div>
  );
}

export default TaskDetail;
