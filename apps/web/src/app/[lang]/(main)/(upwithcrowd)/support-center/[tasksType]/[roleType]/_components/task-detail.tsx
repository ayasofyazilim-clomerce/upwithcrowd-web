"use client";
import React, {useState, useTransition} from "react";
import {MessageCircle, Calendar, Clock, CheckCircle, RefreshCw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
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
import {Textarea} from "@/components/ui/textarea";
import {Separator} from "@/components/ui/separator";
import type {
  PagedResultDto_ListTasksCommentDto,
  UpwithCrowd_Tasks_ListTasksDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {handlePostResponse} from "@repo/utils/api";
import {postTaskCommentApi} from "@upwithcrowd/task-comment/post-action";
import {putTaskByIdApi} from "@upwithcrowd/tasks/put-action";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/sonner";

function TaskDetail({
  taskData,
  taskCommentResponse,
}: {
  taskData: UpwithCrowd_Tasks_ListTasksDto;
  taskCommentResponse: PagedResultDto_ListTasksCommentDto;
}) {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isTaskResolved, setIsTaskResolved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const items = taskCommentResponse.items || [];
  const totalCount = taskCommentResponse.totalCount || 0;

  // Check if the task is already marked as resolved/closed
  const isAlreadyResolved = taskData.status === "Completed";

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
      default:
        return status || "Yeni";
    }
  };

  const handleSubmitComment = () => {
    void postTaskCommentApi({
      requestBody: {
        taskId: taskData.id || "",
        comment: newComment || "",
      },
    }).then((res) => {
      handlePostResponse(res);
      setIsCommentDialogOpen(false);
      setNewComment("");
    });
  };

  const handleMarkAsResolved = () => {
    if (isPending) return;

    startTransition(async () => {
      try {
        // Call the API to update the task status to "Completed"
        const result = await putTaskByIdApi({
          id: taskData.id || "",
          requestBody: {
            ...taskData,
            status: "Completed",
          },
        });

        if (result.type === "success") {
          setIsTaskResolved(true);
          toast.success("Talep çözüldü", {
            description: "Destek talebi başarıyla kapatıldı.",
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
      }
    });
  };

  const handleReopenTask = () => {
    if (isPending) return;

    startTransition(async () => {
      try {
        // Call the API to update the task status to "Open"
        const result = await putTaskByIdApi({
          id: taskData.id || "",
          requestBody: {
            ...taskData,
            status: "Open",
          },
        });

        if (result.type === "success") {
          setIsTaskResolved(false);
          toast.success("Talep yeniden açıldı", {
            description: "Destek talebi yeniden açıldı.",
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
      }
    });
  };

  // Determine if commenting should be disabled
  const isCommentingDisabled = isTaskResolved || isAlreadyResolved;

  return (
    <div className="container col-span-1 mx-auto px-4 md:col-span-2 md:px-0">
      {/* Task Details Card */}
      <Card className="mb-8 overflow-hidden border-none shadow-lg">
        <CardHeader className="from-primary/10 to-primary/5 isolate bg-gradient-to-r">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <CardTitle className="text-lg sm:text-xl md:text-2xl">{taskData.summary || "Destek Talebi"}</CardTitle>
            <div className="mt-1 sm:mt-0">
              <Badge className={getStatusColor(taskData.status)}>{getStatusLabel(taskData.status)}</Badge>
            </div>
          </div>

          <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(taskData.createDateTime || "").split(" ")[0]}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(taskData.createDateTime || "").split(" ")[1] || ""}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {taskData.description || "Açıklama bulunmuyor"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="mb-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold sm:text-xl">
          <MessageCircle className="h-5 w-5" />
          Yorumlar
          <Badge className="ml-2" variant="outline">
            {totalCount}
          </Badge>
        </h2>
        <Separator className="mb-6" />

        {items.length > 0 ? (
          <div className="space-y-6 p-0 sm:p-2">
            {items.map((comment, index) => (
              <Card
                className="isolate overflow-hidden break-words border-none shadow-md transition-shadow hover:shadow-lg"
                key={comment.id}>
                <CardHeader className="px-3 pb-2 pt-3 sm:px-4 sm:pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback
                          className={`${index % 2 === 0 ? "bg-primary/20" : "bg-secondary/20"} text-foreground`}>
                          {getInitials(comment.fullname || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium sm:text-base">{comment.fullname || "Bilinmeyen"}</p>
                        <p className="text-muted-foreground text-xs">{formatDate(comment.createDateTime || "")}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-3 py-2 sm:px-4">
                  <p className="text-sm leading-relaxed" contentEditable={false}>
                    {comment.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
              <MessageCircle className="text-muted-foreground/50 mb-4 h-8 w-8 sm:h-12 sm:w-12" />
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                Bu destek talebi için henüz yorum bulunmamaktadır.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Info message when task is resolved */}
      {(isTaskResolved || isAlreadyResolved) && taskData.status === "Completed" ? (
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
        {taskData.status === "Completed" ? (
          <Button
            className="w-full gap-2 bg-amber-600 py-4 text-sm shadow-md transition-all hover:bg-amber-600 hover:shadow-lg sm:py-6 sm:text-base"
            disabled={isPending}
            onClick={() => {
              handleReopenTask();
            }}>
            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Yeniden Aç</span>
          </Button>
        ) : (
          !isAlreadyResolved && (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                className="w-full gap-2 py-4 text-sm shadow-md transition-all hover:shadow-lg sm:py-6 sm:text-base"
                disabled={isPending || isTaskResolved}
                onClick={() => {
                  handleMarkAsResolved();
                }}>
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Sorunum Çözüldü</span>
              </Button>
              {/* Comment Dialog */}
              <Dialog onOpenChange={setIsCommentDialogOpen} open={isCommentDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="text-primary border-primary hover:text-primary gap-2 border bg-white py-4 text-sm shadow-md transition-all hover:bg-white hover:shadow-lg sm:py-6 sm:text-base"
                    disabled={isCommentingDisabled}>
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Yanıt Yaz</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95%] max-w-[95%] sm:w-full sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Yeni Yorum</DialogTitle>
                    <DialogDescription>
                      Destek talebine yanıt yazın. Gönderildikten sonra yanıtınız kaydedilecektir.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      className="min-h-[120px] sm:min-h-[150px]"
                      onChange={(e) => {
                        setNewComment(e.target.value);
                      }}
                      placeholder="Yorumunuzu buraya yazın..."
                      value={newComment}
                    />
                  </div>
                  <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-0">
                    <Button
                      className="sm:mr-2"
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

export default TaskDetail;
