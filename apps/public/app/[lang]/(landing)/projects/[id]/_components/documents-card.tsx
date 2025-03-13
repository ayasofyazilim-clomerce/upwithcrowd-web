import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import type {UpwithCrowd_Files_FileResponseListDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {Download, File, FileImage, FileText} from "lucide-react";

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
      return <FileText />;
    case "image":
      return <FileImage />;
    default:
      return <File />;
  }
};

// Reusable component for rendering file lists
function FileList({files}: {files: UpwithCrowd_Files_FileResponseListDto[]}) {
  return (
    <div className="space-y-4">
      {files.map((file) => {
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
                  <Download />
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
  );
}

export default function DocumentsCard({fileResponse}: {fileResponse: UpwithCrowd_Files_FileResponseListDto[]}) {
  // Split files into two categories based on file.category
  // For demo purposes, I'm splitting the array in half
  // In a real implementation, you would categorize based on file properties
  const patentFiles = fileResponse.filter(
    (file, index) =>
      // Replace this with actual categorization logic
      file.fileDescription?.toLowerCase().includes("patent") ||
      file.fileDescription?.toLowerCase().includes("marka") ||
      file.fileDescription?.toLowerCase().includes("tescil") ||
      index < fileResponse.length / 2,
  );

  const legalFiles = fileResponse.filter(
    (file) =>
      // Replace this with actual categorization logic
      file.fileDescription?.toLowerCase().includes("hukuk") || !patentFiles.includes(file),
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold md:text-2xl">Dokümanlar</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs className="w-full" defaultValue="patent">
          <TabsList className="mb-12 grid w-full grid-cols-1 gap-2 md:mb-4 md:flex md:flex-row">
            <TabsTrigger className="w-full md:flex-1" value="patent">
              Patent, Marka ve Tescil Bilgileri
            </TabsTrigger>
            <TabsTrigger className="w-full md:flex-1" value="legal">
              Hukuki Durum
            </TabsTrigger>
          </TabsList>

          <TabsContent className="h-[350px]" value="patent">
            <ScrollArea className="h-full w-full">
              <div className="pr-4">
                <FileList files={patentFiles} />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent className="h-[350px]" value="legal">
            <ScrollArea className="h-full w-full">
              <div className="pr-4">
                <FileList files={legalFiles} />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
