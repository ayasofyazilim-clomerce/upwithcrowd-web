"use client";

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/sonner";
import {Textarea} from "@/components/ui/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

const faqSchema = z.object({
  newQuestion: z.string().min(1, "Soru zorunludur"),
  newAnswer: z.string().min(1, "Cevap zorunludur"),
});

type FAQFormValues = z.infer<typeof faqSchema>;

export default function ClientFAQ({faqList}: {faqList: {question: string; answer: string}[]}) {
  const [faqs, setFaqs] = useState(faqList);

  const form = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      newQuestion: "",
      newAnswer: "",
    },
  });

  const onSubmit = (data: FAQFormValues) => {
    const newFaq = {
      question: data.newQuestion,
      answer: data.newAnswer,
    };

    setFaqs([...faqs, newFaq]);
    form.reset();
    toast.success("Yeni SSS başarıyla eklendi");
  };

  return (
    <div className="h-full">
      <section className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <TextWithTitle
          classNames={{
            container: "mb-8",
            title: "text-3xl",
            text: "text-lg",
          }}
          text="Projeniz hakkında sık sorulan soruları ve cevaplarını görüntüleyin ve yönetin."
          title="Sıkça Sorulan Sorular"
        />

        <Form {...form}>
          <form className="mt-8 space-y-8" onSubmit={() => void form.handleSubmit(onSubmit)}>
            <Section text="Projenize yeni bir sıkça sorulan soru ekleyin" title="Yeni SSS Ekle">
              <FormContainer>
                <FormField
                  control={form.control}
                  name="newQuestion"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Soru</FormLabel>
                      <FormControl>
                        <Input placeholder="Yeni soruyu girin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newAnswer"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Cevap</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Sorunun cevabını girin" {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>
            <Button className="w-full" type="submit">
              Yeni SSS Ekle
            </Button>

            <Section text="Projeniz için mevcut sıkça sorulan sorular" title="Mevcut SSS">
              <Accordion className="w-full" collapsible type="single">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Section>
          </form>
        </Form>
      </section>
    </div>
  );
}
