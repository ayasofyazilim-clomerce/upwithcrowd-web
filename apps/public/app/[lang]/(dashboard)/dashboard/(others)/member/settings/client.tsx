"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "@/components/ui/sonner";
import {
  type GetApiFileTypeGroupRulesetResponse,
  type GetApiPublicFileResponse,
  type UpwithCrowd_Members_SaveMemberDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {putMemberApiById} from "@repo/actions/upwithcrowd/member/put-action";
import {FileUpload} from "@repo/ui/upwithcrowd/file-upload";
import {useMember} from "@/app/providers/member";
import {IndividualForm} from "../_components/indiviual-form";
import {OrganizationForm} from "../_components/organization-form";
import OrganizationFormTable from "../_components/table";

export default function NewPersonalAccount({
  memberDocuments,
  fileResponse,
}: {
  memberDocuments: GetApiFileTypeGroupRulesetResponse;
  fileResponse: GetApiPublicFileResponse;
}) {
  const {setCurrentMember, currentMember} = useMember();

  async function onSubmit(values: unknown) {
    try {
      const result = await putMemberApiById({
        id: currentMember?.id || "",
        requestBody: {
          ...(values as UpwithCrowd_Members_SaveMemberDto),
          type: currentMember?.type || "Organization",
          isValidated: true,
        },
      });

      if (result.type === "success") {
        //@ts-expect-error we know it's a Member
        //eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- This is safe
        setCurrentMember({...currentMember, ...values});
        toast.success("Hesabınız başarıyla güncellendi.");
      } else {
        toast.error(result.message || "Hesabınız güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      toast.error("Hesabınız güncellenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }

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

      <Card className="mx-auto w-full p-2 sm:p-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold sm:text-2xl">Belgeleriniz</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Hesabınıza ait belgeleri yükleyebilir ve düzenleyebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:gap-6">
          <FileUpload
            classNames={{container: "md:col-span-full", multiSelect: "bg-white"}}
            propertyId={currentMember?.id || ""}
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
          <OrganizationFormTable response={fileResponse} />
        </CardContent>
      </Card>
    </div>
  );
}
