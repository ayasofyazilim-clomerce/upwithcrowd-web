"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { postApiMember } from "@/actions/upwithcrowd/member/post-action";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { UpwithCrowd_Members_SaveMemberDto } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { postUserMembersApi } from "@/actions/upwithcrowd/user-members/post-action";
import { useSession } from "@repo/utils/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  identifier: z
    .string()
    .length(10, "VKN must be exactly 10 digits")
    .regex(/^[0-9]+$/, "VKN must contain only numbers"),
  title: z
    .string()
    .min(1, "Title is required")
    .regex(/^[a-zA-Z0-9*\s&,.'\-p{L}]{1,600}$/, "Invalid title format"),
  tel: z
    .string()
    .regex(/^([+]\d{1,2})(\d{10})$/, "Invalid telephone format")
    .optional()
    .or(z.literal("")),
  mail: z.string().email("Invalid email address"),
  annualIncome: z
    .string()
    .regex(/^([1-9][0-9]{0,19})$/, "Invalid annual income"),
});

export default function NewBusinessAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useSession()?.session?.user?.sub;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      identifier: "",
      title: "",
      tel: "",
      mail: "",
      annualIncome: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const requestBody: UpwithCrowd_Members_SaveMemberDto = {
        type: "Organization",
        idType: "VKN",
        identifier: values.identifier,
        title: values.title,
        tel: values.tel || "",
        mail: values.mail,
        annualIncome: parseInt(values.annualIncome),
        mobile: "",
        isValidated: true,
      };

      const memberResult = await postApiMember({ requestBody });

      if (memberResult.type === "success") {
        await postUserMembersApi({
          requestBody: {
            memberId: memberResult.data.memberID || "",
            userId: currentUser || "",
          },
        });

        toast({
          title: "Success",
          description: "Your business account has been created successfully.",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: memberResult.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating business account:", error);
      toast({
        title: "Error",
        description:
          "There was an error creating your business account. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          New Business Account
        </CardTitle>
        <CardDescription>
          Enter your business account details below to get started.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VKN (Tax Number)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your 10-digit Tax Number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+12345678901" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="annualIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter annual income" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Submitting..." : "Create Business Account"}
            </Button>
          </CardFooter>
        </form>
      </Form>
      <Toaster />
    </Card>
  );
}
