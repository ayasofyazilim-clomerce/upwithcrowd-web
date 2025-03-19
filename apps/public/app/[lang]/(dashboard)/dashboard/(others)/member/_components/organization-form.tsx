"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {PhoneInput} from "react-international-phone";
import "react-international-phone/style.css";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Loader2} from "lucide-react";
import {useMember} from "@/app/providers/member";

const formSchema = z.object({
  identifier: z.string(),
  idType: z.literal("VKN").optional(),
  tel: z
    .string()
    .regex(/^(?:[+]\d{1,2})(?:\d{10})$/, "Geçersiz telefon formatı")
    .optional()
    .or(z.literal("")),
  mail: z.string().email("Geçersiz e-posta adresi"),
  annualIncome: z.string().regex(/^(?:[1-9][0-9]{0,19})$/, "Geçersiz yıllık gelir"),
  mobile: z.string().optional(),
  maskInvestorProfile: z.boolean().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

interface OrganizationFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
}

export function OrganizationForm({onSubmit}: OrganizationFormProps) {
  const {currentMember} = useMember();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      identifier: currentMember?.identifier || "",
      idType: "VKN",
      tel: currentMember?.tel || "",
      mail: currentMember?.mail || "",
      annualIncome: String(currentMember?.annualIncome || "0"),
      mobile: currentMember?.mobile || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // Ensure idType is VKN before submitting
    const submitData = {
      ...values,
      idType: "VKN" as const,
    };
    await onSubmit(submitData);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(async (values) => {
            await handleSubmit(values);
          })(e);
        }}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="identifier"
            render={({field}) => (
              <FormItem>
                <FormLabel>Kimlik Numarası</FormLabel>
                <FormControl>
                  <Input {...field} disabled readOnly />
                </FormControl>
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Ünvan</FormLabel>
            <Input disabled readOnly value={currentMember?.title || ""} />
          </FormItem>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tel"
            render={({field}) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <PhoneInput
                    className="w-full"
                    countrySelectorStyleProps={{flagClassName: "pl-0.5"}}
                    defaultCountry="tr"
                    inputClassName="w-full"
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <FormField
            control={form.control}
            name="maskInvestorProfile"
            render={({field}) => (
              <FormItem>
                <FormLabel>Yatırımcı profilim görünsün</FormLabel>
                <Select
                  defaultValue={field.value ? "hayir" : "evet"}
                  onValueChange={(value) => {
                    field.onChange(value !== "evet");
                  }}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="evet">Evet</SelectItem>
                    <SelectItem value="hayir">Hayır</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {form.formState.isSubmitting ? "Güncelleniyor..." : "Kurumsal Hesabı Güncelle"}
        </Button>
      </form>
    </Form>
  );
}
