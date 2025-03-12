"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Bell, Send} from "lucide-react";
import {useParams} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/sonner";
import {Textarea} from "@/components/ui/textarea";

const formSchema = z.object({
  recipients: z.array(z.string()).refine((value) => value.length > 0, {
    message: "En az bir alıcı grubu seçmelisiniz",
  }),
  channels: z.array(z.string()).refine((value) => value.length > 0, {
    message: "En az bir bildirim kanalı seçmelisiniz",
  }),
  subject: z.string().min(5, {
    message: "Konu en az 5 karakter olmalıdır",
  }),
  message: z.string().min(10, {
    message: "Mesaj en az 10 karakter olmalıdır",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProjectNotificationsPage() {
  const params = useParams();
  const _projectId = params.id as string; // Renamed to _projectId with underscore prefix
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipients: [],
      channels: [],
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // This would be replaced with your actual API call

      // Simulate API call - removed 'return' keyword
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      toast.success("Bildirim gönderildi", {
        description: `Mesajınız şu alıcılara gönderildi: ${data.recipients.join(", ")}`,
      });

      form.reset();
    } catch (error) {
      toast.error("Bildirim gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const recipientOptions = [
    {id: "investors", label: "Yatırımcılar"},
    {id: "members", label: "Takım Üyeleri"},
    {id: "followers", label: "Takipçiler"},
  ];

  return (
    <div className="container max-w-7xl ">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="text-primary h-5 w-5" />
            <CardTitle className="text-base sm:text-lg">Proje Bildirimi Gönder</CardTitle>
          </div>
          <CardDescription>Projenizle ilgilenen kişilere bildirim gönderin</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="recipients"
                render={() => (
                  <FormItem>
                    <FormLabel>Alıcılar</FormLabel>
                    <div className="space-y-2">
                      {recipientOptions.map((option) => (
                        <FormField
                          control={form.control}
                          key={option.id}
                          name="recipients"
                          render={({field}) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0" key={option.id}>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      checked
                                        ? field.onChange([...field.value, option.id])
                                        : field.onChange(field.value.filter((value) => value !== option.id));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{option.label}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Konu</FormLabel>
                    <FormControl>
                      <Input placeholder="Bildirim konusunu giriniz" {...field} />
                    </FormControl>
                    <FormDescription>Açık bir konu, alıcıların mesajınızı anlamasına yardımcı olur</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Mesaj</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[150px]" placeholder="Bildirim mesajınızı buraya giriniz" {...field} />
                    </FormControl>
                    <FormDescription>Mesajınız seçilen tüm alıcı gruplarına gönderilecektir</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => {
                  form.reset();
                }}
                type="button"
                variant="outline">
                İptal
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <span className="flex items-center gap-1">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Gönderiliyor...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Send className="h-4 w-4" />
                    Bildirimi Gönder
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
