"use client";
import React from "react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Form, FormControl, FormField as FormFieldUI, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "@/components/ui/sonner";
import {Textarea} from "@/components/ui/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {Combobox} from "@repo/ayasofyazilim-ui/molecules/combobox";
import type {JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import TiptapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import {Globe, Instagram, Linkedin, Search, Twitter} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {postProjectApi} from "@/actions/upwithcrowd/project/post-action";
import {signUpServerApi} from "@/actions/core/AccountService/actions";
import {FormContainer, FormField} from "../_components/form";
import {Section} from "../_components/section";
import TextWithTitle from "../_components/text-with-title";

const CategoryType = {
  Technology: {
    label: "Technology",
    value: "11111111-1111-1111-1111-111111111111", // Replace with actual UUID
  },
  Production: {
    label: "Production",
    value: "22222222-2222-2222-2222-222222222222", // Replace with actual UUID
  },
} as const;

const projectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Proje adı zorunludur")
    .max(60, "Proje adı en fazla 60 karakter olabilir")
    .regex(/[a-zA-Z0-9ıüğşöçĞÜŞİÖÇ ,.'-]{1,600}/, "Geçersiz karakterler içeriyor"),
  projectDefinition: z
    .string()
    .min(1, "Proje açıklaması zorunludur")
    .regex(/[a-zA-Z0-9ıüğşöçĞÜŞİÖÇ ,.'-]{1,2000}/, "Geçersiz karakterler içeriyor"),
  categoryTypes: z.array(z.string().uuid()),
  sectorId: z.string().uuid(),
  projectLogo: z.string().optional(), // Made optional
  projectImage: z.string().optional(), // Made optional
  projectVideo: z.string().optional(), // Removed .url() validation since it's optional
  websiteUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  projectContent: z.string().optional(), // Add projectContent to schema
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      projectDefinition: "",
      categoryTypes: [],
      sectorId: "e9c0723e-5862-4c1a-9801-530cc4c4a2bd",
      projectLogo: "",
      projectImage: "",
      projectVideo: "",
      websiteUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
    },
  });

  const [memberType, setMemberType] = React.useState<"existing" | "invite">("existing");
  const [selectedMember, setSelectedMember] = React.useState<string>("");
  const [inviteEmail, setInviteEmail] = React.useState<string>("");
  const generateUsername = (email: string) => {
    // Remove domain and special characters, keep only the local part
    const localPart = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
    // Add random numbers to ensure uniqueness
    const randomSuffix = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${localPart}${randomSuffix}`;
  };

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*";

    // Ensure at least one of each character type
    const password = [
      lowercase[Math.floor(Math.random() * lowercase.length)],
      lowercase[Math.floor(Math.random() * lowercase.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      special[Math.floor(Math.random() * special.length)],
    ];

    // Add 3 more random characters
    for (let i = 0; i < 3; i++) {
      const allChars = lowercase + uppercase + numbers + special;
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle the password array
    return password.sort(() => Math.random() - 0.5).join("");
  };

  const handleAddMember = async () => {
    if (memberType === "existing" && selectedMember) {
      // Add existing member logic
      toast.success("Üye eklendi");
    } else if (memberType === "invite" && inviteEmail) {
      try {
        const username = generateUsername(inviteEmail);
        const password = generatePassword();

        const result = await signUpServerApi({
          tenantId: "", // Add appropriate tenant ID
          userName: username,
          email: inviteEmail,
          password,
        });

        if (result.type === "success") {
          toast.success("Davetiye gönderildi");
          // You might want to save or send these credentials securely to the user
        } else {
          toast.error(result.message || "Üye daveti başarısız oldu");
        }
      } catch (error) {
        toast.error("Üye daveti sırasında bir hata oluştu");
      }
      setInviteEmail("");
    }
  };

  if (type !== "project") {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-semibold">Geçersiz Proje Oluşturma İşlemi</h1>
        <p className="text-muted-foreground">Proje oluşturmak için lütfen doğru yolu takip edin.</p>
        <Button
          className="mt-4"
          onClick={() => {
            router.push("/projects/new");
          }}>
          Proje Oluşturmaya Başla
        </Button>
      </div>
    );
  }

  // const [spesifDate, setSpesifDate] = useState(false);

  const onSubmit = (data: ProjectFormValues) => {
    void postProjectApi({
      requestBody: {
        ...data,
        projectTypes: ["44444444-4444-4444-4444-444444444444"], // Default Project type ID
      },
    }).then((res) => {
      if (res.type === "success") {
        toast.success("Proje başarıyla kaydedildi");
        router.push(`/projects/${res.data.projectId}/funding`);
      } else {
        toast.error(res.message || "Proje kaydedilirken bir hata oluştu");
      }
    });
  };

  const categoryOptions = [
    {
      label: CategoryType.Technology.label,
      value: CategoryType.Technology.value,
    },
    {
      label: CategoryType.Production.label,
      value: CategoryType.Production.value,
    },
  ];

  return (
    <div className="container">
      <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <TextWithTitle
          classNames={{
            container: "mb-8",
            title: "text-3xl",
            text: "text-lg",
          }}
          text="Projenizin kimliğini oluşturacak temel bilgileri ekleyin ve potansiyel destekçilerinize projenizi tanıtın."
          title="Projenizin Temel Bilgileri"
        />
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(onSubmit)(e); // void kullanımı
            }}>
            <Section
              text={[
                "Projenizi kısaca tanımlayan bir başlık ve açıklama ekleyin.",
                "Bu bilgiler, projenizin ilk izlenimini oluşturacak ve destekçilerinizin dikkatini çekecektir.",
              ]}
              title="Proje Özeti">
              <FormContainer>
                <FormFieldUI
                  control={form.control}
                  name="projectName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Proje Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Örnek: Sürdürülebilir Tarım Teknolojileri" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormFieldUI
                  control={form.control}
                  name="projectDefinition"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Proje Açıklaması</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Projenizin amacını ve hedeflerini kısaca açıklayın..."
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            {/* Add Project Story Section */}
            <Section
              text={[
                "Projenizi kısaca tanımlayan bir başlık ve açıklama ekleyin.",
                "Bu bilgiler, projenizin ilk izlenimini oluşturacak ve destekçilerinizin dikkatini çekecektir.",
              ]}
              title="Proje Hikayesi">
              <FormContainer className="w-full">
                <FormFieldUI
                  control={form.control}
                  name="projectContent"
                  render={({field}) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Proje Hikayesi</FormLabel>
                        <FormControl>
                          <TiptapEditor
                            canEditable
                            editOnStart
                            editorClassName="overflow-y-auto max-h-[500px]"
                            editorContent={(field.value ? JSON.parse(field.value) : {}) as JSONContent}
                            editorId="story"
                            minWordCount={1}
                            onSaveFunction={async (id, content) => {
                              field.onChange(content);
                              return Promise.resolve(id);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormContainer>
            </Section>

            <Section
              text={[
                "Projenizi görsel olarak temsil edecek logo ve görselleri ekleyin.",
                "Kaliteli görseller, projenizin profesyonelliğini artırır ve destekçilerinizin güvenini kazanmanıza yardımcı olur.",
              ]}
              title="Görsel Kimlik">
              <FormContainer>
                <div className="mb-4 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                  <p>
                    Not: Görsel yükleme özelliği şu anda geliştirme aşamasındadır. Bu alanları şimdilik boş
                    bırakabilirsiniz.
                  </p>
                </div>
                <FormFieldUI
                  control={form.control}
                  name="projectLogo"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Proje Logo (1:1)</FormLabel>
                      <FormControl>
                        <Input
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file ? URL.createObjectURL(file) : "");
                          }}
                          type="file"
                        />
                      </FormControl>
                      {field.value ? (
                        <div className="mt-2 h-32 w-32 overflow-hidden rounded-lg border">
                          <img alt="Logo preview" className="h-full w-full object-cover" src={field.value} />
                        </div>
                      ) : null}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormFieldUI
                  control={form.control}
                  name="projectImage"
                  render={({field}) => (
                    <FormItem className="mt-2">
                      <FormLabel>Proje Görseli (16:9)</FormLabel>
                      <FormControl>
                        <Input
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file ? URL.createObjectURL(file) : "");
                          }}
                          type="file"
                        />
                      </FormControl>
                      {field.value ? (
                        <div className="mt-2 h-[180px] w-[320px] overflow-hidden rounded-lg border">
                          <img alt="Project  preview" className="h-full w-full object-cover" src={field.value} />
                        </div>
                      ) : null}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormFieldUI
                  control={form.control}
                  name="projectVideo"
                  render={({field}) => (
                    <FormItem className="mt-2">
                      <FormLabel>Proje Videosu (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/... (Opsiyonel)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section text="Projenizin yürütüleceği veya etki edeceği lokasyonu belirtin." title="Proje Konumu">
              <FormContainer>
                <FormField htmlFor="location">
                  <div className="relative">
                    <Input className="peer pl-8" id="location" placeholder="Şehir veya bölge adı girin..." />
                    <Search className="text-muted-foreground absolute left-2 top-0 flex h-9 w-4 peer-focus:text-black" />
                  </div>
                </FormField>
              </FormContainer>
            </Section>

            <Section
              text={[
                "Projenizin kategorisini seçin.",
                "Doğru sınıflandırma, projenizin hedef kitlesine ulaşmasını kolaylaştırır.",
              ]}
              title="Proje Sınıflandırması">
              <FormContainer className="grid gap-4">
                <FormFieldUI
                  control={form.control}
                  name="categoryTypes"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Kategori Türleri</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-4">
                          {categoryOptions.map((category) => (
                            <div className="flex items-center space-x-2" key={category.value}>
                              <Checkbox
                                checked={field.value.includes(category.value)}
                                id={category.value}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, category.value]
                                    : field.value.filter((v) => v !== category.value);
                                  field.onChange(newValue);
                                }}
                              />
                              <Label htmlFor={category.value}>{category.label}</Label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section text="Projeyi yönetecek ve temsil edecek kişiyi belirleyin." title="Proje Lideri">
              <FormContainer>
                <Combobox
                  list={[]}
                  onValueChange={() => {
                    return undefined;
                  }}
                  selectIdentifier=""
                  selectLabel=""
                />
              </FormContainer>
            </Section>

            <Section text="Projenin gerçekleştirilmesinde görev alacak ekip üyelerini ekleyin." title="Proje Ekibi">
              <FormContainer>
                <div className="space-y-6">
                  <RadioGroup
                    defaultValue="existing"
                    onValueChange={(value) => {
                      setMemberType(value as "existing" | "invite");
                    }}
                    value={memberType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="existing" value="existing" />
                      <Label htmlFor="existing">Mevcut Üye</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="invite" value="invite" />
                      <Label htmlFor="invite">Yeni Üye Davet Et</Label>
                    </div>
                  </RadioGroup>

                  {memberType === "existing" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="existing-email">Email</Label>
                        <Input
                          id="existing-email"
                          onChange={(e) => {
                            setSelectedMember(e.target.value);
                          }}
                          placeholder="ornek@email.com"
                          type="email"
                          value={selectedMember}
                        />
                      </div>
                      <Button
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedMember("");
                        }}
                        type="button">
                        Üyeyi Ekle
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          onChange={(e) => {
                            setInviteEmail(e.target.value);
                          }}
                          placeholder="ornek@email.com"
                          type="email"
                          value={inviteEmail}
                        />
                      </div>
                      <Button
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          void handleAddMember();
                        }}
                        type="button">
                        Davet Gönder
                      </Button>
                    </div>
                  )}
                </div>
              </FormContainer>
            </Section>

            <Section
              text={[
                "Projenizin web sitesini ve sosyal medya hesaplarını ekleyin.",
                "Bu bilgiler, destekçilerinizin sizinle iletişim kurmasını ve projenizi takip etmesini sağlar.",
              ]}
              title="İletişim ve Sosyal Medya">
              <FormContainer>
                <div className="mb-4 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                  <p>
                    Not: Sosyal medya entegrasyonu şu anda geliştirme aşamasındadır. Bu alanları şimdilik boş
                    bırakabilirsiniz.
                  </p>
                </div>
                <div className="space-y-6">
                  <FormFieldUI
                    control={form.control}
                    name="websiteUrl"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Website </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="text-muted-foreground absolute left-2 top-2 h-5 w-5" />
                            <Input className="pl-9" placeholder="https://www.example.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormFieldUI
                    control={form.control}
                    name="instagramUrl"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Instagram </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Instagram className="text-muted-foreground absolute left-2 top-2.5 h-5 w-5" />
                            <Input className="pl-9" placeholder="https://instagram.com/username" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormFieldUI
                    control={form.control}
                    name="twitterUrl"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Twitter </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Twitter className="text-muted-foreground absolute left-2 top-2.5 h-5 w-5" />
                            <Input className="pl-9" placeholder="https://twitter.com/username" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormFieldUI
                    control={form.control}
                    name="linkedinUrl"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>LinkedIn </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Linkedin className="text-muted-foreground absolute left-2 top-2.5 h-5 w-5" />
                            <Input className="pl-9" placeholder="https://linkedin.com/in/username" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormContainer>
            </Section>

            <Button className="w-full" type="submit">
              Projeyi Kaydet ve İlerle
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
