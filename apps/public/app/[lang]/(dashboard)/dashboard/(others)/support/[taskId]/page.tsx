import {getTaskCommentApi} from "@repo/actions/upwithcrowd/task-comment/action";
import {getTaskApi} from "@repo/actions/upwithcrowd/tasks/action";
import {TaskCommentClient} from "./client";

export default async function SupportPage({
  params,
}: {
  params: {
    taskId: string;
    lang: string;
  };
}) {
  const {taskId} = params;
  const response = await getTaskApi();

  const responseComment = await getTaskCommentApi({tasksId: taskId});

  return <TaskCommentClient response={response} responseComment={responseComment} />;
}
