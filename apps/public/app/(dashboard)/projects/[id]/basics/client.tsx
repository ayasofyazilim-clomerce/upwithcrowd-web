"use client";
import { putProjectBasicsByIdApi } from "@/actions/upwithcrowd/project/put-action";
import type {
  UpwithCrowd_Projects_CategoryType,
  UpwithCrowd_Projects_ProjectDto,
  UpwithCrowd_Projects_ProjectType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as SheetRoot from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@repo/ayasofyazilim-ui/molecules/combobox";
import { Search, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { FormContainer, FormField } from "../../new/_components/form";
import { Section } from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";

const CategoryType = {
  Technology: "Technology",
  Production: "Production",
} as const;

const ProjectType = {
  Initiative: "Initiative",
  Project: "Project",
} as const;

const projectSchema = z.object({
  projectName: z
    .string()
    .min(1, "Proje adı zorunludur")
    .max(60, "Proje adı en fazla 60 karakter olabilir"),
  projectDefinition: z
    .string()
    .max(135, "Proje açıklaması en fazla 135 karakter olabilir"),
  projectStartDate: z.string(),
  projectEndDate: z.string().optional(),
  categoryTypes: z.array(
    z.enum([CategoryType.Technology, CategoryType.Production]),
  ),
  projectTypes: z.array(z.enum([ProjectType.Initiative, ProjectType.Project])),
  sectorId: z.string(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ClientBasics({
  projectDetail,
}: {
  projectDetail: UpwithCrowd_Projects_ProjectDto;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { id: projectId } = useParams<{ id: string }>();

  const [spesifDate, setSpesifDate] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      ...projectDetail,
      categoryTypes: projectDetail.categoryTypes.map(
        (category) => CategoryType[category as keyof typeof CategoryType],
      ),
      projectTypes: projectDetail.projectTypes.map(
        (type) => ProjectType[type as keyof typeof ProjectType],
      ),
    },
    // {
    // ...projectDetail,
    // projectName: projectDetail.projectName,
    // projectDefinition: ,
    // projectStartDate: new Date().toISOString(),
    // projectEndDate: "",
    // categoryTypes: [],
    // projectTypes: [],
    // sectorId: "e9c0723e-5862-4c1a-9801-530cc4c4a2bd",
    // },
  });

  useEffect(() => {
    if (!spesifDate) {
      const startDate = form.getValues("projectStartDate");
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 60);
      form.setValue("projectEndDate", endDate.toISOString());
    }
  }, [spesifDate, form]);

  const onSubmit = (data: ProjectFormValues) => {
    const projectEndDate = data.projectEndDate
      ? new Date(data.projectEndDate)
      : new Date(data.projectStartDate).setDate(
          new Date(data.projectStartDate).getDate() + 60,
        );

    putProjectBasicsByIdApi({
      requestBody: {
        ...data,
        projectEndDate: new Date(projectEndDate).toISOString(),
      },
      id: projectId,
    }).then((res) => {
      if (res.type === "success") {
        toast({
          title: "Başarılı",
          description: res.message || "Proje başarıyla kaydedildi",
        });
        router.push(`/projects/${res.data.projectId}/basics`);
      } else {
        toast({
          title: "Hata",
          description: res.message || "Proje kaydedilirken bir hata oluştu",
          variant: "destructive",
        });
      }
    });
  };

  const categoryOptions = [
    {
      label: "Technology",
      value: CategoryType.Technology as UpwithCrowd_Projects_CategoryType,
    },
    {
      label: "Production",
      value: CategoryType.Production as UpwithCrowd_Projects_CategoryType,
    },
  ];

  const projectTypeOptions = [
    {
      label: "Initiative",
      value: ProjectType.Initiative as UpwithCrowd_Projects_ProjectType,
    },
    {
      label: "Project",
      value: ProjectType.Project as UpwithCrowd_Projects_ProjectType,
    },
  ];

  return (
    <div className="bg-muted w-full">
      <section className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <TextWithTitle
          title="Temel bilgilerle başlayın"
          text="İnsanların projeniz hakkında bilgi edinmesini kolaylaştırın."
          classNames={{
            container: "mb-8",
            title: "text-3xl",
            text: "text-lg",
          }}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Section
              title="Proje başlığı"
              text={[
                "Projenizi hızlıca anlamalarına yardımcı olacak net ve kısa bir başlık yazın.",
                "Potansiyel destekçiler, projeniz kategori sayfalarında, arama sonuçlarında veya topluluğumuza gönderdiğimiz e-postalarda görüntülendiğinde bunları görecektir.",
              ]}
            >
              <FormContainer>
                <FormFieldUI
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Papercuts: A Party Game for Rude and Well-Read"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormFieldUI
                  control={form.control}
                  name="projectDefinition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alt başlık</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Papercuts is a rowdy card game about books and writing brougth to you by Electric Literature."
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

            <Section
              title="Proje kategorisi"
              text={[
                "Projenizi en iyi tanımlayan kategorileri ve türleri seçin.",
                "Bu seçimler, destekçilerin projenizi bulmasına ve size uygun rehberlik sağlamamıza yardımcı olacaktır.",
              ]}
            >
              <FormContainer className="grid gap-4">
                <FormFieldUI
                  control={form.control}
                  name="categoryTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori Türleri</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {categoryOptions.map((category) => (
                            <Button
                              key={category.value}
                              type="button"
                              variant={
                                field.value.includes(category.value)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                const newValue = field.value.includes(
                                  category.value,
                                )
                                  ? field.value.filter(
                                      (v) => v !== category.value,
                                    )
                                  : [...field.value, category.value];
                                field.onChange(newValue);
                              }}
                            >
                              {category.label}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormFieldUI
                  control={form.control}
                  name="projectTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proje Türleri</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {projectTypeOptions.map((type) => (
                            <Button
                              key={type.value}
                              type="button"
                              variant={
                                field.value.includes(type.value)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                const newValue = field.value.includes(
                                  type.value,
                                )
                                  ? field.value.filter((v) => v !== type.value)
                                  : [...field.value, type.value];
                                field.onChange(newValue);
                              }}
                            >
                              {type.label}
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

            <Section title="Project leader" text="Who is leading this project?">
              <FormContainer>
                <Combobox
                  list={[]}
                  onValueChange={() => {}}
                  selectIdentifier={""}
                  selectLabel={""}
                />
              </FormContainer>
            </Section>
            <Section
              title="Project members"
              text="Who is working on this project?"
            >
              <FormContainer>
                <SheetRoot.Sheet>
                  <SheetRoot.SheetTrigger asChild>
                    <Button variant={"outline"}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add member
                    </Button>
                  </SheetRoot.SheetTrigger>
                  <SheetRoot.SheetContent></SheetRoot.SheetContent>
                </SheetRoot.Sheet>
              </FormContainer>
            </Section>
            <Section
              title="Project location"
              text="Enter the location that best describes where your project is based."
            >
              <FormContainer>
                <FormField htmlFor="location">
                  <div className="relative">
                    <Input
                      id="location"
                      className="peer pl-8"
                      placeholder="Start typing your location..."
                    />
                    <Search className="text-muted-foreground absolute left-2 top-0 flex h-9 w-4 peer-focus:text-black" />
                  </div>
                </FormField>
              </FormContainer>
            </Section>

            <Section
              title="Proje tarihleri"
              text="Projenizin başlangıç ve bitiş tarihlerini seçin."
            >
              <FormContainer>
                <div className="flex flex-col gap-4">
                  <FormFieldUI
                    control={form.control}
                    name="projectStartDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Başlangıç Tarihi</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={
                              field.value ? new Date(field.value) : undefined
                            }
                            setDate={(date?: Date) => {
                              field.onChange(date?.toISOString() || "");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="overfunding"
                      checked={spesifDate}
                      onCheckedChange={(checked) => {
                        setSpesifDate(checked as boolean);
                      }}
                    />
                    <Label
                      htmlFor="overfunding"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      End Spesific Date
                    </Label>
                  </div>

                  <FormFieldUI
                    control={form.control}
                    name="projectEndDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Bitiş Tarihi</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={
                              field.value ? new Date(field.value) : undefined
                            }
                            setDate={(date?: Date) => {
                              field.onChange(date?.toISOString() || "");
                            }}
                            disabled={!spesifDate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormContainer>
            </Section>

            <Button type="submit" className="w-full">
              Kaydet
            </Button>
          </form>
        </Form>
        <Toaster />
      </section>
    </div>
  );
}
// function DateInputs({
//   dayId = "day",
//   monthId = "month",
//   yearId = "year",
//   fullDateId = "fullDate",
//   onDateChange,
// }: {
//   dayId?: string
//   monthId?: string
//   yearId?: string
//   fullDateId?: string
//   onDateChange?: (date: Date | undefined) => void
// }) {
//   return (
//     <div className="flex max-w-80 flex-col gap-4 md:flex-row md:items-end">
//       <FormField htmlFor={dayId} label="Day">
//         <Input
//           className="min-w-20"
//           id={dayId}
//           placeholder="DD"
//           type="number"
//           min="1"
//           max="31"
//           defaultValue={new Date().getDate()}
//         />
//       </FormField>
//       <FormField htmlFor={monthId} label="Month">
//         <Input
//           className="min-w-20"
//           id={monthId}
//           type="number"
//           placeholder="MM"
//           min="1"
//           max="12"
//           defaultValue={new Date().getMonth() + 1}
//         />
//       </FormField>
//       <FormField htmlFor={yearId} label="Year">
//         <Input
//           className="min-w-20"
//           id={yearId}
//           type="number"
//           placeholder="YYYY"
//           defaultValue={new Date().getFullYear()}
//           min={new Date().getFullYear()}
//           max="2099"
//         />
//       </FormField>
//       <DatePicker
//         className="md:max-w-24"
//         date={new Date()}
//         setDate={(date?: Date) => {
//           if (onDateChange) onDateChange(date)
//         }}
//       />
//     </div>
//   )
// }
