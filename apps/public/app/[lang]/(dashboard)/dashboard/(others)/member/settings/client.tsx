"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
  type GetApiFileTypeGroupRulesetResponse,
  type GetApiPublicFileResponse,
  type UpwithCrowd_Files_FileResponseDto,
  type UpwithCrowd_Members_SaveMemberDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putMemberApiById} from "@repo/actions/upwithcrowd/member/put-action";
import {FileUpload} from "@repo/ui/upwithcrowd/file-upload/index";
import {handlePutResponse} from "@repo/utils/api";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useMember} from "@/app/providers/member";
import {IndividualForm} from "../_components/indiviual-form";
import {OrganizationForm} from "../_components/organization-form";
import OrganizationFormTable from "../_components/table";

export default function NewPersonalAccount({
  memberDocuments,
  memberId,
  fileResponse,
}: {
  memberDocuments: GetApiFileTypeGroupRulesetResponse;
  fileResponse: GetApiPublicFileResponse;
  memberId: string;
}) {
  const router = useRouter();
  const {currentMember} = useMember();
  function onSubmit(values: unknown) {
    void putMemberApiById({
      id: currentMember?.id || "",
      requestBody: {
        ...(values as UpwithCrowd_Members_SaveMemberDto),
        type: currentMember?.type || "Organization",
        isValidated: true,
      },
    }).then((result) => {
      handlePutResponse(result, router);
    });
  }
  const [files, setFiles] = useState<GetApiPublicFileResponse>(fileResponse);
  useEffect(() => {
    setFiles(fileResponse);
  }, [memberId]);
  return (
    <div className="mb-4 space-y-8">
      <Card className="mx-auto  w-full p-2 sm:p-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold sm:text-2xl">Hesabınızı Düzenleyin</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Hesap bilgilerinizi aşağıdan güncelleyebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:gap-6">
          {currentMember?.type === "Organization" ? (
            <OrganizationForm onSubmit={onSubmit} />
          ) : (
            <IndividualForm onSubmit={onSubmit} />
          )}
        </CardContent>
      </Card>

      {currentMember?.type === "Organization" ? (
        <>
          <Card className="mx-auto w-full p-2 sm:p-6" id="document">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold sm:text-2xl">Belgeleriniz</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Hesabınıza ait belgeleri yükleyebilir ve düzenleyebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:gap-6">
              <FileUpload<UpwithCrowd_Files_FileResponseDto>
                classNames={{container: "md:col-span-full", multiSelect: "bg-white"}}
                onSuccess={(file) => {
                  setFiles((prev) => [...prev, {...file, fileId: file.id || ""}]);
                }}
                propertyId={currentMember.id || ""}
                ruleset={memberDocuments}
              />
            </CardContent>
          </Card>

          <Card className="mx-auto w-full p-2 sm:p-6">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold sm:text-2xl">Yüklenen Belgeleriniz</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Hesabınıza yüklediğiniz belgeleri görüntüleyebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationFormTable key={currentMember.id} response={files} />
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}
