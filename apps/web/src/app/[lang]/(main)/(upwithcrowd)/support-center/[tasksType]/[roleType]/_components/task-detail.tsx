"use client";
import React, {useState} from "react";
import {MessageCircle, Calendar, Clock} from "lucide-react";
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

function TaskDetail({
  taskData,
  taskCommentResponse,
}: {
  taskData: UpwithCrowd_Tasks_ListTasksDto;
  taskCommentResponse: PagedResultDto_ListTasksCommentDto;
}) {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const items = taskCommentResponse.items || [];
  const totalCount = taskCommentResponse.totalCount || 0;

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
    switch (status.toLowerCase()) {
      case "açık":
        return "bg-green-100 text-green-800 border-green-200";
      case "beklemede":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "kapalı":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
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

  return (
    <div className="container col-span-1 mx-auto px-4 md:col-span-2 md:px-0">
      {/* Task Details Card */}
      <Card className="mb-8 overflow-hidden border-none shadow-lg">
        <CardHeader className="from-primary/10 to-primary/5 isolate bg-gradient-to-r">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <CardTitle className="text-lg sm:text-xl md:text-2xl">{taskData.summary || "Destek Talebi"}</CardTitle>
            <Badge className={`w-fit px-3 py-1 font-medium ${getStatusColor(taskData.status.trim() || "Yeni")}`}>
              {taskData.status.trim() || "Yeni"}
            </Badge>
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

      {/* Comment Dialog */}
      <Dialog onOpenChange={setIsCommentDialogOpen} open={isCommentDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full gap-2 py-4 text-sm shadow-md transition-all hover:shadow-lg sm:py-6 sm:text-base">
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
  );
}

export default TaskDetail;
