import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {
  GetApiFileTypeGroupRulesetResponse,
  GetApiPublicFileResponse,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import DocumentCard from "@repo/ayasofyazilim-ui/molecules/document-card";
import {FileUpload} from "@repo/ui/upwithcrowd/file-upload";
import Link from "next/link";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

export default function DocumentsClient({
  projectRelatedFiles,
  projectLegalSituation,
  fileResponse,
  projectId,
}: {
  projectRelatedFiles: GetApiFileTypeGroupRulesetResponse;
  projectLegalSituation: GetApiFileTypeGroupRulesetResponse;
  fileResponse: GetApiPublicFileResponse;
  projectId: string;
}) {
  // Pre-filter files for each tab directly in the client

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
  const legalFiles = fileData.filter((file) => file.fileTypeNamespace === "ProjectLegalDocument");
  const patentFiles = fileData.filter((file) =>
    ["TrademarkRegistration", "ApplicationForaPatent", "Patent", "ISOCertificate", "Other"].includes(
      file.fileTypeNamespace ?? "",
    ),
  );
  // Create custom tabs with pre-filtered files
  const documentTabs = [
    {
      value: "patent",
      label: "Patent, Marka ve Tescil Bilgileri",
      files: patentFiles,
    },
    {
      value: "legal",
      label: "Hukuki Durum",
      files: legalFiles,
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
          text="Projenize ait dökümanları yükleyin ve düzenleyin."
          title="Belge, Ödül, Hukuki Durum"
        />

        <Section
          className="grid-cols-1"
          text="Projenize ait gerekli belgeleri yükleyin."
          title="Patent, Marka ve Tescil Belgeleri">
          <FileUpload
            classNames={{container: "md:col-span-full", multiSelect: "bg-white"}}
            propertyId={projectId}
            ruleset={projectRelatedFiles}
          />
        </Section>
        <Section
          className="grid-cols-1"
          text="Projenize ait gerekli belgeleri yükleyin."
          title="Hukuki Durum Belgeleri">
          <FileUpload
            classNames={{container: "md:col-span-full", multiSelect: "bg-white"}}
            propertyId={projectId}
            ruleset={projectLegalSituation}
          />
        </Section>
        <Card className="mb-4 mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold md:text-2xl">Dokümanlar</CardTitle>
          </CardHeader>

          <CardContent>
            <DocumentCard activeDefaultTab="patent" documentTabs={documentTabs} />
          </CardContent>
        </Card>

        <Link className=" w-full" href={`/projects/${projectId}/information-form`}>
          <Button className="w-full">Kaydet</Button>
        </Link>
      </section>
    </div>
  );
}
