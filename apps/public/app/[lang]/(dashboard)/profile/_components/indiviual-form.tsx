"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {PhoneInput} from "react-international-phone";
import "react-international-phone/style.css";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import {useMember} from "@/app/providers/member";

const formSchema = z.object({
  identifier: z.string(),
  mail: z.string().email("Geçerli bir e-posta adresi giriniz."),
  mobile: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Geçerli bir telefon numarası giriniz."),
  annualIncome: z.string().regex(/^\d+$/, "Yıllık gelir sadece rakam içermelidir."),
  title: z.string().optional(),
  tel: z.string().optional(),
});

export type IndividualFormValues = z.infer<typeof formSchema>;

interface IndividualFormProps {
  onSubmit: (values: IndividualFormValues) => Promise<void>;
}

export function IndividualForm({onSubmit}: IndividualFormProps) {
  const {currentMember} = useMember();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      identifier: currentMember?.identifier || "",
      mail: currentMember?.mail || "",
      mobile: currentMember?.mobile || "",
      annualIncome: String(currentMember?.annualIncome || "0"),
      title: currentMember?.title || "",
      tel: currentMember?.tel || "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormItem>
            <FormLabel>Kimlik Türü</FormLabel>
            <Input disabled readOnly value={currentMember?.idType || ""} />
          </FormItem>
          <FormField
            control={form.control}
            name="identifier"
            render={({field}) => (
              <FormItem>
                <FormLabel>Kimlik Numarası</FormLabel>
                <FormControl>
                  <Input {...field} disabled readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormItem>
            <FormLabel>Ad</FormLabel>
            <Input disabled readOnly value={currentMember?.name || ""} />
          </FormItem>
          <FormItem>
            <FormLabel>Soyad</FormLabel>
            <Input disabled readOnly value={currentMember?.surname || ""} />
          </FormItem>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="mobile"
            render={({field}) => (
              <FormItem>
                <FormLabel>Cep Telefonu</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    className="w-full"
                    countrySelectorStyleProps={{flagClassName: "pl-0.5"}}
                    defaultCountry="tr"
                    inputClassName="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annualIncome"
            render={({field}) => (
              <FormItem>
                <FormLabel>Yıllık Gelir</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Yıllık gelir giriniz" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="mail"
          render={({field}) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="E-posta giriniz" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {form.formState.isSubmitting ? "Güncelleniyor..." : "Kişisel Hesabı Güncelle"}
        </Button>
      </form>
    </Form>
  );
}
