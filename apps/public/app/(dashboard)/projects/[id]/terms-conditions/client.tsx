"use client";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {ScrollArea} from "@/components/ui/scroll-area";
import {toast} from "@/components/ui/sonner";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

const termsSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val, {
    message: "Genel Şartlar ve Koşullar'ı kabul etmelisiniz.",
  }),
  privacyAccepted: z.boolean().refine((val) => val, {
    message: "Gizlilik Politikası'nı kabul etmelisiniz.",
  }),
  cookieAccepted: z.boolean().refine((val) => val, {
    message: "Çerez Politikası'nı kabul etmelisiniz.",
  }),
});

type TermsFormValues = z.infer<typeof termsSchema>;

interface Term {
  id: string;
  title: string;
  content: string;
}

export default function ClientTerms({terms}: {terms: Term[]}) {
  const [openTermId, setOpenTermId] = useState<string | null>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState<Record<string, boolean>>({});

  const form = useForm<TermsFormValues>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      termsAccepted: false,
      privacyAccepted: false,
      cookieAccepted: false,
    },
  });

  const onSubmit = () => {
    toast.success("Şartlar ve koşullar kabul edildi");
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>, termId: string) => {
    const {scrollTop, scrollHeight, clientHeight} = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      setHasScrolledToBottom((prev) => ({...prev, [termId]: true}));
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
          text="Lütfen aşağıdaki şartları ve koşulları dikkatlice okuyup onaylayın."
          title="Şartlar ve Koşullar"
        />

        <Form {...form}>
          <form className="space-y-8" onSubmit={() => void form.handleSubmit(onSubmit)}>
            <Section text="Aşağıdaki belgeleri okuyup onaylamanız gerekmektedir." title="Onay Gerektiren Belgeler">
              <FormContainer>
                {terms.map((term) => (
                  <FormField
                    control={form.control}
                    key={term.id}
                    name={term.id as keyof TermsFormValues}
                    render={({field}) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <Button
                              className="h-auto p-0 font-normal"
                              onClick={() => {
                                setOpenTermId(term.id);
                              }}
                              variant="link">
                              {term.title}
                            </Button>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </FormContainer>
            </Section>

            <Button className="w-full" type="submit">
              Onayla ve Devam Et
            </Button>
          </form>
        </Form>

        {terms.map((term) => (
          <Dialog
            key={term.id}
            onOpenChange={() => {
              setOpenTermId(null);
            }}
            open={openTermId === term.id}>
            <DialogContent className="flex h-[80vh] max-w-3xl flex-col">
              <DialogHeader>
                <DialogTitle>{term.title}</DialogTitle>
                <DialogDescription>Lütfen aşağıdaki metni dikkatlice okuyunuz.</DialogDescription>
              </DialogHeader>
              <ScrollArea
                className="flex-grow"
                onScroll={(e) => {
                  handleScroll(e, term.id);
                }}>
                <div className="p-4">{term.content}</div>
              </ScrollArea>
              <DialogFooter>
                <Button
                  disabled={!hasScrolledToBottom[term.id]}
                  onClick={() => {
                    if (hasScrolledToBottom[term.id]) {
                      form.setValue(term.id as keyof TermsFormValues, true);
                      setOpenTermId(null);
                    } else {
                      toast.error("Lütfen sözleşmenin sonuna kadar okuyunuz.");
                    }
                  }}>
                  Okudum ve Onaylıyorum
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </div>
  );
}
