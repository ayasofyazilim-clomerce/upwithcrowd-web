"use client";
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
import * as SheetRoot from "@/components/ui/sheet";
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

export default function ClientAbout({aboutDetail}: {aboutDetail: AboutFormValues}) {
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
            <Section text="Who is working on this project?" title="Project members">
              <FormContainer>
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

            <Button className="w-full" type="submit">
              Kaydet
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
