"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {PhoneInput} from "react-international-phone";
import "react-international-phone/style.css";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import {useMember} from "@/app/providers/member";

const formSchema = z.object({
  idType: z.literal("VKN").optional(),
  tel: z
    .string()
    .regex(/^([+]\d{1,2})(\d{10})$/, "Invalid telephone format")
    .optional()
    .or(z.literal("")),
  mail: z.string().email("Invalid email address"),
  annualIncome: z.string().regex(/^([1-9][0-9]{0,19})$/, "Invalid annual income"),
  mobile: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface OrganizationFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
}

export function OrganizationForm({onSubmit}: OrganizationFormProps) {
  const {currentMember} = useMember();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      idType: "VKN",
      tel: currentMember?.tel || "",
      mail: currentMember?.mail || "",
      annualIncome: String(currentMember?.annualIncome || "0"),
      mobile: currentMember?.mobile || "",
    },
  });

  console.log("form", form);

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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Identifier</FormLabel>
            <Input value={currentMember?.identifier || ""} readOnly disabled />
          </FormItem>
          <FormItem>
            <FormLabel>Title</FormLabel>
            <Input value={currentMember?.title || ""} readOnly disabled />
          </FormItem>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tel"
            render={({field}) => (
              <FormItem>
                <FormLabel>Telephone</FormLabel>
                <FormControl>
                  <PhoneInput
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    className="w-full"
                    inputClassName="w-full"
                    countrySelectorStyleProps={{flagClassName: "pl-0.5"}}
                    defaultCountry="tr"
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
                <FormLabel>Annual Income</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter annual income" />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {form.formState.isSubmitting ? "Updating..." : "Update Organization Account"}
        </Button>
      </form>
    </Form>
  );
}
