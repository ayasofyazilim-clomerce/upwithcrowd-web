"use client";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField as FormFieldUI, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as SheetRoot from "@/components/ui/sheet";
import {toast} from "@/components/ui/sonner";
import {Textarea} from "@/components/ui/textarea";
import type {UpwithCrowd_Projects_ProjectsDetailResponseDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {zodResolver} from "@hookform/resolvers/zod";
import {Combobox} from "@repo/ayasofyazilim-ui/molecules/combobox";
import type {JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import TiptapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import {Globe, Instagram, Linkedin, Search, Twitter, UserPlus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import Image from "next/image";
import {putProjectBasicsByIdApi} from "@/actions/upwithcrowd/project/put-action";
import {FormContainer, FormField} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

const CategoryType = {
  Technology: "Technology",
  Production: "Production",
} as const;

const ProjectType = {
  Initiative: "Initiative",
  Project: "Project",
} as const;

const projectSchema = z.object({
  projectName: z.string().min(1, "Proje adı zorunludur").max(60, "Proje adı en fazla 60 karakter olabilir"),
  projectDefinition: z.string().max(135, "Proje açıklaması en fazla 135 karakter olabilir").nullable(),
  sectorId: z.string().nullable(),
  categoryTypes: z.array(z.enum([CategoryType.Technology, CategoryType.Production])),
  projectTypes: z.array(z.enum([ProjectType.Initiative, ProjectType.Project])),
  projectLogo: z.string().optional(),
  projectImage: z.string().optional(),
  projectVideo: z.string().optional(),
  websiteUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  projectContent: z.string().optional(), // Sadece story field'ı yeterli
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ClientBasics({projectDetail}: {projectDetail: UpwithCrowd_Projects_ProjectsDetailResponseDto}) {
  const router = useRouter();
  const {id: projectId} = useParams<{id: string}>();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: projectDetail.projectName ?? "",
      projectDefinition: projectDetail.projectDefinition ?? "",
      sectorId: projectDetail.sectorId ?? "",
      categoryTypes:
        projectDetail.categoryTypes?.map((category: string) => CategoryType[category as keyof typeof CategoryType]) ??
        [],
      projectTypes:
        projectDetail.projectTypes?.map((type: string) => ProjectType[type as keyof typeof ProjectType]) ?? [],
      projectContent: projectDetail.projectContent ?? "",
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    void putProjectBasicsByIdApi({
      requestBody: data,
      id: projectId,
    }).then((res) => {
      if (res.type === "success") {
        toast.success("Proje başarıyla kaydedildi");
        router.push(`/projects/${res.data.projectId}/about`);
      } else {
        toast.error(res.message || "Proje kaydedilirken bir hata oluştu");
      }
    });
  };

  return (
    <div className="bg-muted w-full overflow-auto pb-8">
      <section className="mx-auto w-full max-w-7xl p-4  md:p-8">
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
              void form.handleSubmit(onSubmit)(e);
            }}>
            {/* Proje Özeti Section */}
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
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

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
                            editorContent={JSON.parse(field.value || "{}") as JSONContent}
                            editorId="story"
                            minWordCount={1}
                            onSaveFunction={async (id, content) => {
                              field.onChange(content);
                              return await Promise.resolve(id);
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

            {/* Görsel Kimlik Section */}
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
                          <Image alt="Logo preview" className="h-full w-full object-cover" src={field.value} />
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
                          <Image alt="Project preview" className="h-full w-full object-cover" src={field.value} />
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

            {/* Proje Konumu Section */}
            <Section text="Projenizin yürütüleceği veya etki edeceği lokasyonu belirtin." title="Proje Konumu">
              <FormContainer>
                <div className="mb-4 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                  <p>
                    Not: Konum entegrasyonu şu anda geliştirme aşamasındadır. Bu alanları şimdilik boş bırakabilirsiniz.
                  </p>
                </div>
                <FormField htmlFor="location">
                  <div className="relative">
                    <Input className="peer pl-8" id="location" placeholder="Şehir veya bölge adı girin..." />
                    <Search className="text-muted-foreground absolute left-2 top-0 flex h-9 w-4 peer-focus:text-black" />
                  </div>
                </FormField>
              </FormContainer>
            </Section>

            {/* Proje Sınıflandırması Section */}
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
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(CategoryType).map(([key, value]) => (
                            <Button
                              key={key}
                              onClick={() => {
                                const newValue = field.value.includes(value)
                                  ? field.value.filter((v) => v !== value)
                                  : [...field.value, value];
                                field.onChange(newValue);
                              }}
                              type="button"
                              variant={field.value.includes(value) ? "default" : "outline"}>
                              {key}
                            </Button>
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
                <div className="mb-4 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                  <p>
                    Not: Proje liderleri seçimi şu anda geliştirme aşamasındadır. Bu alanları şimdilik boş
                    bırakabilirsiniz.
                  </p>
                </div>
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

            <Section text="Projenin gerçekleştirilmesinde görev alacak ekip üyelerini ekleyin." title="Proje Ekibi">
              <FormContainer>
                <div className="mb-4 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                  <p>
                    Not: Proje ekibi seçimi şu anda geliştirme aşamasındadır. Bu alanları şimdilik boş bırakabilirsiniz.
                  </p>
                </div>
                <SheetRoot.Sheet>
                  <SheetRoot.SheetTrigger asChild>
                    <Button variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add member
                    </Button>
                  </SheetRoot.SheetTrigger>
                  <SheetRoot.SheetContent />
                </SheetRoot.Sheet>
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

            {/* Continue with other sections from the new version */}
            {/* ... */}

            <Button className="w-full" type="submit">
              Değişiklikleri Kaydet
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
