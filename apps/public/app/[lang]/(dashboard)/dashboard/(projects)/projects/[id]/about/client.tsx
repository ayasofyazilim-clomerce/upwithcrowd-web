"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/sonner";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import type {
  PagedResultDto_ListCustomRolesDto,
  PagedResultDto_ListProjectsMembersResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {getMemberMailApi} from "@repo/actions/upwithcrowd/member/actions";
import {postProjectAffiliationApi} from "@repo/actions/upwithcrowd/project/post-action";
import {UserPlus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {getBaseLink} from "@/utils/lib";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";
import {FormContainer} from "../../new/_components/form";

export default function ClientAbout({
  projectMember,
  roles,
}: {
  projectMember: PagedResultDto_ListProjectsMembersResponseDto;
  roles: PagedResultDto_ListCustomRolesDto;
}) {
  const router = useRouter();
  const {id: projectId, lang} = useParams<{id: string; lang: string}>();
  const baseLink = getBaseLink("dashboard", lang);

  // Add team management state and functions
  const [teamEmail, setTeamEmail] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  const formatRoleName = useCallback((name: string) => {
    return name
      .replace("UpwithCrowd:CustomRoles:", "")
      .split(/(?=[A-Z])/)
      .join(" ")
      .trim();
  }, []);

  const uniqueRoleNames = roles.items || [];

  const handleAddMember = async () => {
    try {
      const memberResponse = await getMemberMailApi({mail: teamEmail});

      if (memberResponse.type === "success" && memberResponse.data.length > 0) {
        const memberId = memberResponse.data[0].id;

        const affiliationResponse = await postProjectAffiliationApi({
          requestBody: {
            customRoleID: roleId,
            projectId,
            memberId,
          },
        });

        if (affiliationResponse.type === "success") {
          toast.success("Ekip üyesi başarıyla eklendi");
          // Reset only team member form fields
          setTeamEmail("");
          setRoleId("");
          // Refresh the page to update the team members list
          router.refresh();
        } else {
          toast.error("Üye eklenirken bir hata oluştu");
        }
      } else {
        toast.error("Bu e-posta adresiyle kayıtlı üye bulunamadı");
      }
    } catch (error) {
      toast.error("İşlem sırasında bir hata oluştu");
    }
  };

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <TextWithTitle
          classNames={{
            container: "mb-6 md:mb-8",
            title: "text-2xl md:text-3xl",
            text: "text-base md:text-lg",
          }}
          text="Kendinizi potansiyel yatırımcılara tanıtın."
          title="Ekip Bilgileri"
        />
        <Section
          className="md:grid-cols-1"
          text="Projenin gerçekleştirilmesinde görev alacak ekip üyelerini ekleyin."
          title="Proje Ekibi">
          <FormContainer>
            <div className="space-y-4">
              <div>
                <Label>Ekip Üyesi E-posta</Label>
                <Input
                  onChange={(e) => {
                    setTeamEmail(e.target.value);
                  }}
                  placeholder="E-posta adresi giriniz"
                  type="email"
                  value={teamEmail}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Rol</Label>
                  <select
                    className="w-full rounded-md border p-2"
                    onChange={(e) => {
                      const newRoleName = e.target.value;
                      setRoleId(newRoleName);
                    }}
                    value={roleId}>
                    <option value="">Rol seçiniz</option>
                    {uniqueRoleNames.length > 0 ? (
                      uniqueRoleNames.map((name) => (
                        <option key={name.id} value={name.id}>
                          {formatRoleName(name.name)}
                        </option>
                      ))
                    ) : (
                      <option disabled value="">
                        Roller yükleniyor veya mevcut değil
                      </option>
                    )}
                  </select>
                  {uniqueRoleNames.length === 0 && (
                    <p className="mt-1 text-xs text-red-500">Roller yüklenemedi veya mevcut değil</p>
                  )}
                </div>
              </div>

              <Button
                className="w-full"
                disabled={!teamEmail || !roleId}
                onClick={() => void handleAddMember()}
                type="button">
                <UserPlus className="mr-2 h-4 w-4" />
                Ekip Üyesi Ekle
              </Button>
            </div>
            {projectMember.items && projectMember.items.length > 0 ? (
              <div className="mt-6 md:mt-8">
                <h3 className="mb-3 text-base font-semibold md:mb-4 md:text-lg">Mevcut Ekip Üyeleri</h3>

                {/* Mobile View - Card Layout */}
                <div className="block space-y-4 md:hidden">
                  {projectMember.items.map((member) => (
                    <div className="space-y-2 rounded-lg border p-4" key={member.customRoleID}>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{member.fullname || member.title}</h4>
                        {member.status === "Draft" && (
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-sm">Draft</span>
                        )}
                        {member.status === "Approved" && (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-sm">Approved</span>
                        )}
                        {member.status === "Rejected" && (
                          <span className="rounded-full bg-red-100 px-2 py-1 text-sm">DisApproved</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>E-posta: {member.mail}</p>
                        <p>Rol: {formatRoleName(member.customRoleName ?? "")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View - Table Layout */}
                <div className="hidden md:block">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>İsim</TableHead>
                          <TableHead>E-posta</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Durum</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectMember.items.map((member) => (
                          <TableRow key={member.customRoleID}>
                            <TableCell className="font-medium">{member.fullname || member.title}</TableCell>
                            <TableCell>{member.mail}</TableCell>
                            <TableCell>{formatRoleName(member.customRoleName ?? "")}</TableCell>
                            <TableCell>
                              {member.status === "Draft" && (
                                <span className="rounded-full bg-yellow-100 px-2 py-1">Draft</span>
                              )}
                              {member.status === "Approved" && (
                                <span className="rounded-full bg-green-100 px-2 py-1">Approved</span>
                              )}
                              {member.status === "Rejected" && (
                                <span className="rounded-full bg-red-100 px-2 py-1">DisApproved</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            ) : null}
          </FormContainer>
        </Section>
        <Link className="w-full" href={`${baseLink}/projects/${projectId}/funding`}>
          <Button className="mt-6 w-full" type="button">
            Devam Et
          </Button>
        </Link>
      </section>
    </div>
  );
}
