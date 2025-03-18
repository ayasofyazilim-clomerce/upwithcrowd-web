import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {
  GetApiFileTypeGroupFileTypeGroupRulesetResponse,
  GetApiPublicFileResponse,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import DocumentCard from "@repo/ayasofyazilim-ui/molecules/document-card";
import {FileUpload} from "@repo/ui/upwithcrowd/file-upload";
import Link from "next/link";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

export default function InformationFormClient({
  fileTypeGroupResponse,
  fileResponse,
  projectId,
}: {
  fileTypeGroupResponse: GetApiFileTypeGroupFileTypeGroupRulesetResponse;
  fileResponse: GetApiPublicFileResponse;
  projectId: string;
}) {
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

  const fileData = fileResponse.map((i) => {
    const fileName = getFileNameFromPath(i.fullPath || "");
    const fileType = getFileType(fileName);
    return {...i, fileId: i.fileId || "", fileName, fileType};
  });
  const informationFiles = fileData.filter((file) =>
    [
      "ArticlesOfAssociation",
      "InformationForm",
      "FundUsageForm",
      "ShareSalesReport",
      "Attachments",
      "Swot",
      "InvestorPresentation",
      "Cv",
    ].includes(file.fileTypeNamespace ?? ""),
  );

  const documentTabs = [
    {
      value: "information",
      label: "Bilgi Formu",
      files: informationFiles,
    },
  ];

  return (
    <div className="bg-muted min-h-screen w-full">
      <section className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <TextWithTitle
          classNames={{
            container: "mb-8",
            title: "text-3xl font-bold",
            text: "text-lg",
          }}
          text="Projenize ait görselleri yükleyin."
          title="Bilgi Formu"
        />
        <Section
          className="w-full grid-cols-1"
          text="Bilgi Formu proje hakkında detaylı bilgiler içeren bir belgeler bütünüdür. Projenizin detaylarını ve hedeflerinizi içeren bu belgeleri yükleyerek projenizi daha iyi tanıtabilirsiniz."
          title="Bilgi Formu">
          <FileUpload
            classNames={{container: "md:col-span-full ", multiSelect: "bg-white"}}
            propertyId={projectId}
            ruleset={fileTypeGroupResponse}
          />
        </Section>
        <Card className="mb-4 mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold md:text-2xl">Bilgi Formu</CardTitle>
          </CardHeader>

          <CardContent>
            <DocumentCard activeDefaultTab="information" documentTabs={documentTabs} />
          </CardContent>
        </Card>
        <Link className="w-full" href={`/projects/${projectId}/images`}>
          <Button className="w-full">Kaydet</Button>
        </Link>
      </section>
    </div>
  );
}
