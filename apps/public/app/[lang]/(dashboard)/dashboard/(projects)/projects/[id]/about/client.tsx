"use client";
import {Button} from "@/components/ui/button";
import {Form, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/sonner";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import type {
  PagedResultDto_ListCustomRolesDto,
  PagedResultDto_ListProjectsMembersResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {zodResolver} from "@hookform/resolvers/zod";
import {getMemberMailApi} from "@repo/actions/upwithcrowd/member/actions";
import {postProjectAffiliationApi} from "@repo/actions/upwithcrowd/project/post-action";
import {UserPlus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {getBaseLink} from "@/utils/lib";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

const aboutSchema = z.object({
  nationality: z.string().optional(),
  education: z.string().optional(),
  workExperience: z.string().optional(),
  expertise: z.string().optional(),
  cv: z.string().optional(),
  linkedin: z.string().url("Geçerli bir LinkedIn URL'si girin").optional().or(z.literal("")),
  twitter: z.string().url("Geçerli bir Twitter URL'si girin").optional().or(z.literal("")),
  website: z.string().url("Geçerli bir website URL'si girin").optional().or(z.literal("")),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

export default function ClientAbout({
  projectMember,
  roles,
}: {
  projectMember: PagedResultDto_ListProjectsMembersResponseDto;
  roles: PagedResultDto_ListCustomRolesDto;
}) {
  const router = useRouter();
  const {id: projectId} = useParams<{id: string}>();
  const paramsBaseLink = useParams();
  const {lang} = paramsBaseLink;
  const baseLink = getBaseLink("dashboard", Array.isArray(lang) ? lang[0] : lang);

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
  });

  const onSubmit = () => {
    // Mock API response
    toast.success("Ekip bilgileri başarıyla kaydedildi");
    router.push(`${baseLink}/projects/${projectId}/funding`);
  };

  // Add team management state and functions
  const [teamEmail, setTeamEmail] = useState<string>("");
  const [selectedRoleName, setSelectedRoleName] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  const formatRoleName = useCallback((name: string) => {
    return name
      .replace("UpwithCrowd:CustomRoles:", "")
      .split(/(?=[A-Z])/)
      .join(" ")
      .trim();
  }, []);

  const uniqueRoleNames = useMemo(() => {
    // Check if roles.items exists and has length
    if (!roles.items || roles.items.length === 0) {
      return [];
    }

    // Get all role names, filter out undefined/null, and create a Set of unique names
    const names = Array.from(new Set(roles.items.map((role) => role.name).filter(Boolean)));
    return names;
  }, [roles.items]);

  const updateRoleId = useCallback(
    (name: string) => {
      // Always use "Entrepreneur" as the role type
      const matchingRole = roles.items?.find((r) => r.name === name && r.customRoleType === "Entrepreneur");
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

  // // Replace the single selectedLeader state with an array
  // const [selectedLeaders, setSelectedLeaders] = useState<
  //   {
  //     id: string;
  //     name?: string;
  //     surname?: string;
  //     title?: string;
  //     mail?: string;
  //     role?: string; // Add role field to the type
  //   }[]
  // >([]);

  // const leaderOptions = useMemo(() => {
  //   const options = [];
  //   const addedIds = new Set(); // Track already added members to prevent duplicates

  // Add current member (project creator)
  // if (currentMember) {
  //   const displayName =
  //     currentMember.name && currentMember.surname
  //       ? `${currentMember.name} ${currentMember.surname}`
  //       : currentMember.title || currentMember.mail;

  //   options.push({
  //     id: currentMember.id,
  //     name: currentMember.name || undefined,
  //     surname: currentMember.surname || undefined,
  //     title: currentMember.title || undefined,
  //     mail: currentMember.mail || undefined,
  //     role: "Proje Sahibi", // Default role for project creator
  //     label: displayName,
  //   });

  //   addedIds.add(currentMember.id);
  // }

  // // Add project members (excluding those already added)
  // if (projectMember.items) {
  //   projectMember.items.forEach((member) => {
  //     // Skip if member ID is already in the list, if it's missing an ID, or if status is not Approved
  //     if (!member.customRoleID || addedIds.has(member.customRoleID) || member.status !== "Approved") return;

  //     const displayName = member.name && member.surname ? `${member.name} ${member.surname}` : member.mail;
  //     const roleName = member.customRoleName ? formatRoleName(member.customRoleName) : "Ekip Üyesi";

  //     options.push({
  //       id: member.customRoleID,
  //       name: member.name || undefined,
  //       surname: member.surname || undefined,
  //       mail: member.mail || undefined,
  //       role: roleName,
  //       label: displayName,
  //     });

  //     addedIds.add(member.customRoleID);
  //   });
  // }

  // return options;
  // }, [currentMember, projectMember.items, formatRoleName]);

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
        <Form {...form}>
          <form
            className="w-full space-y-8"
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}>
            {/* <Section text="Bu projeyi kimler yönetiyor?" title="Proje Liderleri">
              <FormContainer>
                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <select
                        className="w-full rounded-md border p-2 text-sm"
                        onChange={(e) => {
                          const leader = leaderOptions.find((option) => option.id === e.target.value);
                          if (leader && !selectedLeaders.some((l) => l.id === leader.id)) {
                            setSelectedLeaders([...selectedLeaders, leader]);
                          }
                        }}
                        value="">
                        <option value="">Lider ekle</option>
                        {leaderOptions
                          .filter((option) => !selectedLeaders.some((leader) => leader.id === option.id))
                          .map((option) => {
                            const fullName =
                              option.name && option.surname
                                ? `${option.name} ${option.surname}`
                                : option.title || "İsimsiz";

                            return (
                              <option key={option.id} value={option.id} className="py-2">
                                {fullName} • {option.mail} • {option.role || "Rol belirtilmemiş"}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="grid gap-3">
                      {selectedLeaders.map((leader) => (
                        <div className="flex items-center justify-between rounded-md border p-4" key={leader.id}>
                          <div>
                            <h4 className="font-medium">
                              {leader.name && leader.surname ? `${leader.name} ${leader.surname}` : leader.title}
                            </h4>
                            <div className="text-sm text-gray-600">
                              <p>{leader.mail}</p>
                              {leader.role && <p className="font-medium text-gray-700">{leader.role}</p>}
                            </div>
                          </div>
                          <Button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              setSelectedLeaders(selectedLeaders.filter((l) => l.id !== leader.id));
                            }}
                            size="sm"
                            variant="ghost">
                            Kaldır
                          </Button>
                        </div>
                      ))}
                    </div>

                    {selectedLeaders.length === 0 && (
                      <p className="py-4 text-center text-sm text-gray-500">
                        Henüz proje lideri seçilmedi. Lütfen en az bir lider ekleyin.
                      </p>
                    )}
                  </div>
                </div>
              </FormContainer>
            </Section> */}

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

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <FormLabel>Rol</FormLabel>
                      <select
                        className="w-full rounded-md border p-2"
                        onChange={(e) => {
                          const newRoleName = e.target.value;
                          setSelectedRoleName(newRoleName);
                          updateRoleId(newRoleName);
                        }}
                        value={selectedRoleName}>
                        <option value="">Rol seçiniz</option>
                        {uniqueRoleNames.length > 0 ? (
                          uniqueRoleNames.map((name) => (
                            <option key={name} value={name}>
                              {formatRoleName(name)}
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
            {/* <Section text="Temel bilgilerinizi girin" title="Kişisel Bilgiler">
              <FormContainer>
                <div className="space-y-4">
                  <div className="w-full md:w-2/3">
                    <FormLabel htmlFor="nationality">Uyruk</FormLabel>
                    <div className="relative">
                      <Input className="peer pl-8" id="nationality" placeholder="Uyruğunuzu yazmaya başlayın..." />
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
                </div>
              </FormContainer>
            </Section> */}

            {/* <Section text="İş deneyiminiz ve uzmanlık alanlarınız" title="Profesyonel Deneyim">
              <FormContainer>
                <div className="space-y-4">
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

                  <div className="w-full md:w-2/3">
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
                  </div>
                </div>
              </FormContainer>
            </Section> */}

            {/* <Section text="Sosyal medya ve iletişim bilgileriniz" title="İletişim Bilgileri">
              <FormContainer>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                </div>
              </FormContainer>
            </Section> */}

            <Button className="w-full " type="submit">
              Devam Et
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
