import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import type {UpwithCrowd_Files_FileResponseListDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

const getFileNameFromPath = (fullPath: string): string => {
  const matches = /[^/]+$/.exec(fullPath);
  return matches ? matches[0] : fullPath;
};

const getFileType = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  if (extension === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image";
  return "doc";
};

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return (
        <svg
          className="lucide lucide-file-text"
          fill="none"
          height="20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
      );
    case "image":
      return (
        <svg
          className="lucide lucide-image"
          fill="none"
          height="20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="20"
          xmlns="http://www.w3.org/2000/svg">
          <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      );
    default:
      return (
        <svg
          className="lucide lucide-file"
          fill="none"
          height="20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
  }
};

export default function DocumentsCard({fileResponse}: {fileResponse: UpwithCrowd_Files_FileResponseListDto[]}) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold md:text-2xl">Belge, Ödül, Hukuki Durum</CardTitle>
      </CardHeader>

      <CardContent className="h-[400px]">
        <ScrollArea className="h-full w-full">
          <div className="pr-4">
            <div className="space-y-4">
              {fileResponse.map((file) => {
                const fileName = getFileNameFromPath(file.fullPath || "");
                const fileType = getFileType(fileName);
                return (
                  <div
                    className="hover:bg-muted/50 group flex items-center gap-3 rounded-lg border p-3 transition-all"
                    key={file.fileId}>
                    <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                      {getFileIcon(fileType)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{file.fileDescription || "Açıklama yok"}</h4>
                        <Button
                          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                          size="icon"
                          variant="ghost">
                          <svg
                            className="lucide lucide-download"
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          <span className="sr-only">İndir</span>
                        </Button>
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm">{fileName}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="bg-muted-foreground inline-flex h-1.5 w-1.5 rounded-full" />
                        <span className="text-muted-foreground text-xs uppercase">{fileType}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
