"use client";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField as FormFieldUI, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/sonner";
import {Textarea} from "@/components/ui/textarea";
import type {
  PagedResultDto_CategoryListDto,
  PagedResultDto_TypeListDto,
  UpwithCrowd_Projects_ProjectsResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {zodResolver} from "@hookform/resolvers/zod";
import {putProjectBasicsByIdApi} from "@repo/actions/upwithcrowd/project/put-action";
import type {JSONContent} from "@repo/ayasofyazilim-ui/organisms/tiptap";
import TiptapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

const projectSchema = z.object({
  projectName: z.string().min(1, "Proje adı zorunludur").max(60, "Proje adı en fazla 60 karakter olabilir"),
  projectDefinition: z.string().max(135, "Proje açıklaması en fazla 135 karakter olabilir").nullable(),
  sectorId: z.string().nullable(),
  categoryTypes: z.array(z.string()), // Changed to accept any string from category items
  projectTypes: z.array(z.string()), // Changed to accept any string from type items
  projectLogo: z.string().optional(),
  projectImage: z.string().optional(),
  projectVideo: z.string().optional(),
  websiteUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  projectContent: z.string().optional(),
});

interface ProjectFormValues {
  projectName: string;
  projectDefinition: string | null;
  sectorId: string | null;
  categoryTypes: string[];
  projectTypes: string[];
  projectLogo?: string;
  projectImage?: string;
  projectVideo?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  projectContent?: string;
}

interface PageData {
  projectDetail: UpwithCrowd_Projects_ProjectsResponseDto;
  category: PagedResultDto_CategoryListDto | null;
  type: PagedResultDto_TypeListDto | null;
}

interface CategoryItem {
  id: string;
  name: string;
}

export default function ClientBasics({data}: {data: PageData}) {
  const router = useRouter();
  const {id: projectId} = useParams<{id: string}>();
  const search = useSearchParams();
  const params = new URLSearchParams(search);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: data.projectDetail.projectName ?? "",
      projectDefinition: data.projectDetail.projectDefinition ?? "",
      sectorId: data.projectDetail.sectorId ?? "",
      categoryTypes: data.category?.items?.map((category) => category.id) ?? [],
      projectTypes: (() => {
        const typeId = data.type?.items?.find((type) => type.name === params.get("type"))?.id;
        return typeId ? [typeId] : [];
      })(),
      projectContent: data.projectDetail.projectContent ?? "",
    },
  });

  const onSubmit = (values: ProjectFormValues) => {
    void putProjectBasicsByIdApi({
      requestBody: values,
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
      <section className="mx-auto w-full max-w-7xl p-2 sm:p-4 md:p-8">
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
                            onSaveFunction={async (content) => {
                              field.onChange(content);
                              return await Promise.resolve("OK");
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
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                          {data.category?.items?.map((cat: CategoryItem) => (
                            <Button
                              key={cat.id}
                              onClick={() => {
                                const newValue = field.value.includes(cat.id)
                                  ? field.value.filter((v) => v !== cat.id)
                                  : [...field.value, cat.id];
                                field.onChange(newValue);
                              }}
                              type="button"
                              variant={field.value.includes(cat.id) ? "default" : "outline"}>
                              {cat.name}
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

            <Button className="w-full" type="submit">
              Değişiklikleri Kaydet
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
