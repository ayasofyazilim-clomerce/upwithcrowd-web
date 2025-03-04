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
import {Calendar, Clock, MessageCircle} from "lucide-react";
import {useParams} from "next/navigation";
import React, {useState} from "react";
import {postTaskCommentApi} from "@/actions/upwithcrowd/task-comment/post-action";

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

export const TaskCommentClient: React.FC<TaskCommentClientProps> = ({response, responseComment}) => {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

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
        taskId, // Use the taskId extracted from params
        comment: newComment || "",
      },
    }).then((res) => {
      handlePostResponse(res);
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4  md:px-0">
      {/* Task Details Card */}
      <Card className="mb-8 overflow-hidden border-none shadow-lg ">
        <CardHeader className="from-primary/10 to-primary/5 isolate bg-gradient-to-r ">
          <div className="flex items-center justify-between">
            <CardTitle className=" text-2xl">{currentTask.summary || "Destek Talebi"}</CardTitle>
            <Badge className={`px-3 py-1 font-medium ${getStatusColor(currentTask.status.trim() || "Yeni")}`}>
              {currentTask.status.trim() || "Yeni"}
            </Badge>
          </div>

          <CardDescription className="mt-1 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(currentTask.createDateTime || "").split(" ")[0]}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(currentTask.createDateTime || "").split(" ")[1] || ""}
            </span>
          </CardDescription>
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

      {/* Comment Dialog */}
      <Dialog onOpenChange={setIsCommentDialogOpen} open={isCommentDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full gap-2 py-6 text-base shadow-md transition-all hover:shadow-lg">
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
  );
};
