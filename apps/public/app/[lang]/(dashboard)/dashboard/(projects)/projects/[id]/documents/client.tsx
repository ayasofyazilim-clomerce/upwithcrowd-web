"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type {
  GetApiFileTypeGroupRulesetResponse,
  GetApiPublicFileResponse,
  UpwithCrowd_Files_FileResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import type {FileTypeForFileCard} from "@repo/ayasofyazilim-ui/molecules/document-card";
import DocumentCard from "@repo/ayasofyazilim-ui/molecules/document-card";
import {FileUpload} from "@repo/ui/upwithcrowd/file-upload/index";
import Link from "next/link";
import {useState} from "react";
import {useParams} from "next/navigation";
import {getBaseLink} from "@/utils/lib";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";
import {useProject} from "../_components/project-provider";

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
  const {lang} = useParams<{lang: string}>();
  const baseLink = getBaseLink("dashboard", lang);
  // Pre-filter files for each tab directly in the client
  const {isProjectEditable} = useProject();

  const isFormDisabled = !isProjectEditable;

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

  const [legalFiles, setLegalFiles] = useState<FileTypeForFileCard[]>(
    fileData.filter((file) => file.fileTypeNamespace === "ProjectLegalDocument"),
  );
  const [patentFiles, setPatentFiles] = useState<FileTypeForFileCard[]>(
    fileData.filter((file) =>
      ["TrademarkRegistration", "ApplicationForaPatent", "Patent", "ISOCertificate", "Other"].includes(
        file.fileTypeNamespace ?? "",
      ),
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
          <FileUpload<UpwithCrowd_Files_FileResponseDto>
            classNames={{container: "md:col-span-full", multiSelect: "bg-white"}}
            disabled={isFormDisabled}
            onSuccess={(file) => {
              setPatentFiles((prev) => [
                ...prev,
                {
                  ...file,
                  fileName: file.name || "",
                  fileType: file.fullPath.split(".").at(-1) || "",
                },
              ]);
            }}
            propertyId={projectId}
            ruleset={projectRelatedFiles}
          />
        </Section>
        <Section
          className="grid-cols-1"
          text="Projenize ait gerekli belgeleri yükleyin."
          title="Hukuki Durum Belgeleri">
          <FileUpload<UpwithCrowd_Files_FileResponseDto>
            classNames={{container: "md:col-span-full", multiSelect: "bg-white"}}
            disabled={isFormDisabled}
            onSuccess={(file) => {
              setLegalFiles((prev) => [
                ...prev,
                {
                  fileName: file.name || "",
                  fileType: file.fullPath.split(".").at(-1) || "",
                },
              ]);
            }}
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

        <Link className=" w-full" href={`${baseLink}/dashboard/projects/${projectId}/information-form`}>
          <Button className="w-full">Kaydet</Button>
        </Link>
      </section>
    </div>
  );
}
