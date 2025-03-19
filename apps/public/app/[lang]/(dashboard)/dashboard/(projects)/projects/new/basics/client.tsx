"use client";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Form, FormControl, FormField as FormFieldUI, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "@/components/ui/sonner";
import {Textarea} from "@/components/ui/textarea";
import type {
  PagedResultDto_CategoryListDto,
  PagedResultDto_TypeListDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {zodResolver} from "@hookform/resolvers/zod";
import {postProjectApi} from "@repo/actions/upwithcrowd/project/post-action";
import type {JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import TiptapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import {handlePostResponse} from "@repo/utils/api";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {getBaseLink} from "@/utils/lib";
import {FormContainer} from "../_components/form";
import {Section} from "../_components/section";
import TextWithTitle from "../_components/text-with-title";

interface PageData {
  category: PagedResultDto_CategoryListDto | null;
  type: PagedResultDto_TypeListDto | null;
}

const projectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Proje adı zorunludur")
    .max(600, "Proje adı en fazla 600 karakter olabilir")
    .regex(/^[a-zA-Z0-9ıüğşöçĞÜŞİÖÇ ,.'-]+$/, "Geçersiz karakterler içeriyor"),

  projectDefinition: z
    .string()
    .min(1, "Proje açıklaması zorunludur")
    .max(2000, "Proje açıklaması en fazla 2000 karakter olabilir")
    .regex(/^[a-zA-Z0-9ıüğşöçĞÜŞİÖÇ ,.'-]+$/, "Geçersiz karakterler içeriyor"),

  categorys: z.array(z.string().uuid()),
  types: z.array(z.string().uuid()),
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

export default function BasicsClient({data}: {data: PageData}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const params = useParams();
  const {lang} = params;
  const baseLink = getBaseLink("dashboard", Array.isArray(lang) ? lang[0] : lang);

  // Add this helper to find the matching type ID
  const getTypeId = () => {
    if (!type || !data.type?.items) return undefined;
    const matchingType = data.type.items.find((t) => t.name === type);
    return matchingType?.id;
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    mode: "onChange", // Enable validation as the user types
    defaultValues: {
      projectName: "",
      projectDefinition: "",
      categorys: [],
      types: [],
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

  if (type !== "Project") {
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

  const onSubmit = (formData: ProjectFormValues) => {
    const typeId = getTypeId();
    if (!typeId) {
      toast.error("Geçerli bir proje tipi bulunamadı");
      return;
    }

    const finalFormData = {
      ...formData,
      types: [typeId],
    };

    void postProjectApi({
      requestBody: finalFormData,
    }).then((res) => {
      if (res.type === "success") {
        handlePostResponse(res, router, `${baseLink}/projects/${res.data.projectId}/about`);
      } else {
        toast.error(res.message || "Proje kaydedilirken bir hata oluştu");
      }
    });
  };

  const categoryOptions =
    data.category?.items?.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })) || [];

  return (
    <div className="mx-auto w-full max-w-7xl p-2 sm:p-4 md:p-8">
      <div className="container">
        <TextWithTitle
          classNames={{
            container: "mb-4 sm:mb-8",
            title: "text-2xl sm:text-3xl",
            text: "text-base sm:text-lg",
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
                        <div className="space-y-1">
                          <Input placeholder="Örnek: Sürdürülebilir Tarım Teknolojileri" {...field} />
                          <div className="text-muted-foreground flex justify-between text-xs">
                            <span>
                              {field.value.length > 0 ? `${field.value.length} / 600 karakter` : "Zorunlu alan"}
                            </span>
                            {field.value.length > 0 && !/^[a-zA-Z0-9ıüğşöçĞÜŞİÖÇ ,.'-]+$/.test(field.value) && (
                              <span className="text-destructive">Geçersiz karakterler içeriyor</span>
                            )}
                          </div>
                        </div>
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
                        <div className="space-y-1">
                          <Textarea
                            placeholder="Projenizin amacını ve hedeflerini kısaca açıklayın..."
                            {...field}
                            rows={3}
                          />
                          <div className="text-muted-foreground flex justify-between text-xs">
                            <span>
                              {field.value.length > 0 ? `${field.value.length} / 2000 karakter` : "Zorunlu alan"}
                            </span>
                            {field.value.length > 0 && !/^[a-zA-Z0-9ıüğşöçĞÜŞİÖÇ ,.'-]+$/.test(field.value) && (
                              <span className="text-destructive">Geçersiz karakterler içeriyor</span>
                            )}
                          </div>
                        </div>
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
                "Projenizin kategorisini seçin.",
                "Doğru sınıflandırma, projenizin hedef kitlesine ulaşmasını kolaylaştırır.",
              ]}
              title="Proje Sınıflandırması">
              <FormContainer className="grid gap-4">
                <FormFieldUI
                  control={form.control}
                  name="categorys"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Kategori Türleri</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
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
                      {field.value.length === 0 && (
                        <p className="text-muted-foreground text-xs">En az bir kategori seçilmelidir</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
