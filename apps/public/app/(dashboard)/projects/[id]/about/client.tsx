"use client";
import React, {useCallback, useMemo, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/components/ui/sonner";
import {useRouter, useParams} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Search, UserPlus} from "lucide-react";
import {Combobox} from "@repo/ayasofyazilim-ui/molecules/combobox";
import type {
  PagedResultDto_ListCustomRolesDto,
  PagedResultDto_ListProjectsMembersResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {postProjectAffiliationApi} from "@/actions/upwithcrowd/project/post-action";
import {getMemberMailApi} from "@/actions/upwithcrowd/member/actions";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

const aboutSchema = z.object({
  nationality: z.string().min(1, "Uyruk zorunludur"),
  education: z.string().min(1, "Öğrenim durumu zorunludur"),
  workExperience: z.string().min(1, "İş deneyimi zorunludur"),
  expertise: z.string().min(1, "Uzmanlık alanları zorunludur"),
  cv: z.string().optional(),
  linkedin: z.string().url("Geçerli bir LinkedIn URL'si girin").optional(),
  twitter: z.string().url("Geçerli bir Twitter URL'si girin").optional(),
  website: z.string().url("Geçerli bir website URL'si girin").optional(),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

export default function ClientAbout({
  projectMember,
  aboutDetail,
  roles,
}: {
  projectMember: PagedResultDto_ListProjectsMembersResponseDto;
  aboutDetail: AboutFormValues;
  roles: PagedResultDto_ListCustomRolesDto;
}) {
  const router = useRouter();
  const {id: projectId} = useParams<{id: string}>();

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: aboutDetail,
  });

  const onSubmit = () => {
    // Mock API response
    toast.success("Ekip bilgileri başarıyla kaydedildi");
    router.push(`/projects/${projectId}/finish-project`);
  };

  // Add team management state and functions
  const [teamEmail, setTeamEmail] = useState<string>("");
  const [selectedRoleName, setSelectedRoleName] = useState<string>("");
  const [selectedRoleType, setSelectedRoleType] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  const formatRoleName = useCallback((name: string) => {
    return name
      .replace("UpwithCrowd:CustomRoles:", "")
      .split(/(?=[A-Z])/)
      .join(" ")
      .trim();
  }, []);

  const uniqueRoleNames = useMemo(() => {
    return Array.from(new Set(roles.items?.map((role) => role.name) ?? []));
  }, [roles.items]);

  const getAvailableRoleTypes = useCallback(
    (roleName: string) => {
      return roles.items?.filter((role) => role.name === roleName).map((role) => role.customRoleType) ?? [];
    },
    [roles.items],
  );

  const updateRoleId = useCallback(
    (name: string, type: string) => {
      // Change 'role' to 'matchingRole' to avoid shadowing
      const matchingRole = roles.items?.find((r) => r.name === name && r.customRoleType === type);
      setRoleId(matchingRole?.id ?? "");
    },
    [roles.items],
  );

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
          setSelectedRoleName("");
          setSelectedRoleType("");
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
            container: "mb-8",
            title: "text-3xl",
            text: "text-lg",
          }}
          text="Kendinizi potansiyel yatırımcılara tanıtın."
          title="Ekip Bilgileri"
        />
        <Form {...form}>
          <form className="space-y-8" onSubmit={() => void form.handleSubmit(onSubmit)}>
            <Section text="Who is leading this project?" title="Project leader">
              <FormContainer>
                <Combobox
                  list={[]}
                  onValueChange={() => {
                    //
                  }}
                  selectIdentifier=""
                  selectLabel=""
                />
              </FormContainer>
            </Section>

            {/* Add the team management section before the final submit button */}
            <Section text="Projenin gerçekleştirilmesinde görev alacak ekip üyelerini ekleyin." title="Proje Ekibi">
              <FormContainer>
                {/* Display existing team members */}

                <div className="space-y-4">
                  <div>
                    <FormLabel>Ekip Üyesi E-posta</FormLabel>
                    <Input
                      onChange={(e) => {
                        setTeamEmail(e.target.value);
                      }}
                      placeholder="E-posta adresi giriniz"
                      type="email"
                      value={teamEmail}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormLabel>Rol</FormLabel>
                      <select
                        className="w-full rounded-md border p-2"
                        onChange={(e) => {
                          const newRoleName = e.target.value;
                          setSelectedRoleName(newRoleName);
                          setSelectedRoleType(""); // Reset role type when role name changes
                          updateRoleId(newRoleName, "");
                        }}
                        value={selectedRoleName}>
                        <option value="">Rol seçiniz</option>
                        {uniqueRoleNames.map((name) => (
                          <option key={name} value={name}>
                            {formatRoleName(name)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FormLabel>Rol Tipi</FormLabel>
                      <select
                        className="w-full rounded-md border p-2"
                        disabled={!selectedRoleName}
                        onChange={(e) => {
                          const newRoleType = e.target.value;
                          setSelectedRoleType(newRoleType);
                          updateRoleId(selectedRoleName, newRoleType);
                        }}
                        value={selectedRoleType}>
                        <option value="">Rol tipi seçiniz</option>
                        {getAvailableRoleTypes(selectedRoleName).map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
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
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold">Mevcut Ekip Üyeleri</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>İsim</TableHead>
                            <TableHead>E-posta</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Rol Tipi</TableHead>
                            <TableHead>Durum</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projectMember.items.map((member, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  {member.name} {member.surname}
                                </TableCell>
                                <TableCell>{member.mail}</TableCell>
                                <TableCell>{member.customRoleName}</TableCell>
                                <TableCell>{member.customRoleType}</TableCell>
                                <TableCell>
                                  {member.status === "Draft" && (
                                    <span className=" rounded-full bg-yellow-100 px-2 py-1">Draft</span>
                                  )}
                                  {member.status === "Approved" && (
                                    <span className="rounded-full bg-green-100 px-2 py-1">Approved</span>
                                  )}
                                  {member.status === "DisApproved" && (
                                    <span className="rounded-full bg-red-100 px-2 py-1">DisApproved</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : null}
              </FormContainer>
            </Section>
            <Section text="Temel bilgilerinizi girin" title="Kişisel Bilgiler">
              <FormContainer>
                <div>
                  <FormLabel htmlFor="nationality">Uyruk</FormLabel>
                  <div className="relative">
                    <Input className="peer pl-8" id="nationality" placeholder="Start typing your nation..." />
                    <Search className="text-muted-foreground absolute left-2 top-0 flex h-9 w-4 peer-focus:text-black" />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="education"
                  render={({field}) => (
                    <FormItem className="mt-2">
                      <FormLabel>Öğrenim Durumu</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Eğitim geçmişinizi detaylı bir şekilde yazın" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section text="İş deneyiminiz ve uzmanlık alanlarınız" title="Profesyonel Deneyim">
              <FormContainer>
                <FormField
                  control={form.control}
                  name="workExperience"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>İş Deneyimi</FormLabel>
                      <FormControl>
                        <Textarea placeholder="İş deneyiminizi detaylı bir şekilde yazın" {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expertise"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Uzmanlık Alanları</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Uzmanlık alanlarınızı virgülle ayırarak yazın" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cv"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Özgeçmiş (Opsiyonel)</FormLabel>
                      <FormControl>
                        <Input
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          type="file"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section text="Sosyal medya ve iletişim bilgileriniz" title="İletişim Bilgileri">
              <FormContainer>
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Kişisel Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Button className="w-full" type="submit">
              Kaydet
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
