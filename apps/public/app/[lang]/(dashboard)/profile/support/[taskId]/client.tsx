"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import type {
  PagedResultDto_ListTasksCommentDto,
  PagedResultDto_ListTasksDto,
  UpwithCrowd_Tasks_ListTasksDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {handlePostResponse} from "@repo/utils/api";
import {Calendar, CheckCircle, Clock, MessageCircle, RefreshCw} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import React, {useState} from "react";
import {toast} from "@/components/ui/sonner";
import {postTaskCommentApi} from "@/actions/upwithcrowd/task-comment/post-action";
import {putTaskByIdApi} from "@/actions/upwithcrowd/tasks/put-action";

interface TaskCommentClientProps {
  response: {
    type: "success";
    data: PagedResultDto_ListTasksDto; // Replace with actual task type if available
    message: string;
  };
  responseComment: {
    type: "success";
    data: PagedResultDto_ListTasksCommentDto;
    message: string;
  };
}

// Changed from arrow function with React.FC to function declaration
export function TaskCommentClient({response, responseComment}: TaskCommentClientProps) {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isTaskResolved, setIsTaskResolved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {data} = responseComment;
  const taskData = response.data;
  const items = data.items || [];
  const totalCount = data.totalCount || 0;
  const params = useParams();
  const taskId = params.taskId as string;

  // Filter task data to find the matching task and specify the type
  const currentTask = Array.isArray(taskData.items)
    ? taskData.items.find((item: UpwithCrowd_Tasks_ListTasksDto) => item.id === taskId) ??
      // Default empty task object to avoid undefined errors - use proper type casting
      ({
        summary: "",
        status: "",
        createDateTime: "",
        description: "",
        id: "",
        tasksType: "",
        roleType: "",
        projectId: "",
      } as unknown as UpwithCrowd_Tasks_ListTasksDto)
    : (taskData as UpwithCrowd_Tasks_ListTasksDto);

  // Check if the task is already marked as resolved/closed
  const isAlreadyResolved = currentTask.status.toLowerCase() === "kapalı" || currentTask.status === "Completed";

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Tarih belirtilmedi";

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } catch (error) {
      return "Tarih belirtilmedi";
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-gray-200 text-gray-600 font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm hover:bg-gray-200";
      case "Open":
        return "bg-green-700 text-white font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm hover:bg-green-700";
      case "Draft":
        return "bg-gray-50 text-gray-600 font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm hover:bg-gray-50";
      default:
        return "bg-gray-200 text-gray-600 font-medium px-2.5 py-0.5 rounded-full text-xs shadow-sm";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "Completed":
        return "Tamamlandı";
      case "Open":
        return "Açık";
      case "Draft":
        return "Taslak";
      default:
        return status || "Yeni";
    }
  };

  const handleSubmitComment = () => {
    void postTaskCommentApi({
      requestBody: {
        taskId, // Use the taskId extracted from params
        comment: newComment || "",
      },
    }).then((res) => {
      handlePostResponse(res);
    });
  };

  const handleMarkAsResolved = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Call the API to update the task status to "Completed"
      const result = await putTaskByIdApi({
        id: taskId,
        requestBody: {
          ...currentTask,
          status: "Completed",
        },
      });

      if (result.type === "success") {
        setIsTaskResolved(true);
        toast.success("Talep çözüldü", {
          description: "Destek talebiniz başarıyla kapatıldı.",
        });

        // Refresh the page to show updated status
        router.refresh();
      } else {
        toast.error("Hata", {
          description: "İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        });
      }
    } catch (error) {
      toast.error("Hata", {
        description: "İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReopenTask = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Call the API to update the task status to "Open"
      const result = await putTaskByIdApi({
        id: taskId,
        requestBody: {
          ...currentTask,
          status: "Open",
        },
      });

      if (result.type === "success") {
        setIsTaskResolved(false);
        toast.success("Talep yeniden açıldı", {
          description: "Destek talebiniz yeniden açıldı.",
        });

        // Refresh the page to show updated status
        router.refresh();
      } else {
        toast.error("Hata", {
          description: "İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        });
      }
    } catch (error) {
      toast.error("Hata", {
        description: "İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if commenting should be disabled
  const isCommentingDisabled = isTaskResolved || isAlreadyResolved;

  return (
    <div className="container mx-auto max-w-7xl p-4  md:px-0">
      {/* Task Details Card */}
      <Card className="mb-8 overflow-hidden border-none shadow-lg ">
        <CardHeader className="from-primary/10 to-primary/5 isolate bg-gradient-to-r pb-6">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{currentTask.summary}</CardTitle>
                <Badge className={getStatusColor(currentTask.status)}>{getStatusLabel(currentTask.status)}</Badge>
              </div>

              <CardDescription className="mt-1 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="text-muted-foreground h-3.5 w-3.5" />
                  {formatDate(currentTask.createDateTime || "").split(" ")[0]}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="text-muted-foreground h-3.5 w-3.5" />
                  {formatDate(currentTask.createDateTime || "").split(" ")[1] || ""}
                </span>
              </CardDescription>
            </div>

            <div className="flex items-center">
              {currentTask.status === "Completed" && (
                <Button
                  className="gap-2 bg-amber-600 py-2 text-sm text-white shadow-md transition-all hover:bg-amber-600 hover:text-white hover:shadow-lg"
                  disabled={isSubmitting}
                  onClick={() => void handleReopenTask()}
                  size="sm"
                  variant="outline">
                  <RefreshCw className="h-4 w-4" />
                  <span>Yeniden Aç</span>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">{currentTask.description || "Açıklama bulunmuyor"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="mb-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <MessageCircle className="h-5 w-5" />
          Yorumlar
          <Badge className="ml-2" variant="outline">
            {totalCount}
          </Badge>
        </h2>
        <Separator className="mb-6" />

        {items.length > 0 ? (
          <div className="space-y-6 p-2">
            {items.map((comment, index) => (
              <Card
                className="isolate overflow-hidden break-words border-none shadow-md transition-shadow hover:shadow-lg"
                key={comment.id}>
                <CardHeader className="pb-2 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="https://placehold.co/200x200" />
                        <AvatarFallback
                          className={`${index % 2 === 0 ? "bg-primary/20" : "bg-secondary/20"} text-foreground`}>
                          {getInitials(comment.fullname || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{comment.fullname || "Bilinmeyen"}</p>
                        <p className="text-muted-foreground text-xs">{formatDate(comment.createDateTime || "")}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed" contentEditable={false}>
                    {comment.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageCircle className="text-muted-foreground/50 mb-4 h-12 w-12" />
              <p className="text-muted-foreground text-center">Bu destek talebi için henüz yorum bulunmamaktadır.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Info message when task is resolved */}
      {(isTaskResolved || isAlreadyResolved) && currentTask.status === "Completed" ? (
        <div className="my-4 flex items-center gap-2 rounded-md bg-green-50 p-4 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <p>
            Bu destek talebi çözüldü olarak işaretlenmiş. Yeniden açmak için &quot;Yeniden Aç&quot; butonunu
            kullanabilirsiniz.
          </p>
        </div>
      ) : null}

      {/* Actions Section */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Conditional Render: Mark as Resolved or Reopen Button */}
        {currentTask.status === "Completed" ? (
          <Button
            className="w-full gap-2 bg-amber-600 py-6 text-base shadow-md transition-all hover:bg-amber-600 hover:shadow-lg"
            disabled={isSubmitting}
            onClick={() => void handleReopenTask()}>
            <RefreshCw className="h-5 w-5" />
            <span>Yeniden Aç</span>
          </Button>
        ) : (
          !isAlreadyResolved && (
            <div className="grid w-full grid-cols-2 gap-4">
              <Button
                className="w-full gap-2 py-6 text-base shadow-md transition-all hover:shadow-lg"
                disabled={isSubmitting || isTaskResolved}
                onClick={() => void handleMarkAsResolved()}>
                <CheckCircle className="h-5 w-5" />
                <span>Sorunum Çözüldü</span>
              </Button>
              {/* Comment Dialog */}
              <Dialog onOpenChange={setIsCommentDialogOpen} open={isCommentDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="text-primary border-primary hover:text-primary gap-2 border bg-white py-6 shadow-md transition-all hover:bg-white hover:shadow-lg"
                    disabled={isCommentingDisabled}>
                    <MessageCircle className="h-5 w-5" />
                    <span>Yanıt Yaz</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Yeni Yorum</DialogTitle>
                    <DialogDescription>
                      Destek talebine yanıt yazın. Gönderildikten sonra yanıtınız kaydedilecektir.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      className="min-h-[150px]"
                      onChange={(e) => {
                        setNewComment(e.target.value);
                      }}
                      placeholder="Yorumunuzu buraya yazın..."
                      value={newComment}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        setIsCommentDialogOpen(false);
                      }}
                      variant="outline">
                      İptal
                    </Button>
                    <Button
                      disabled={!newComment.trim()}
                      onClick={() => {
                        handleSubmitComment();
                      }}>
                      Gönder
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )
        )}
      </div>
    </div>
  );
}
