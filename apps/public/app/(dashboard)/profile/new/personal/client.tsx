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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Shield, Check } from "lucide-react";
import { postApiMember } from "@/actions/upwithcrowd/member/post-action";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  UpwithCrowd_Members_IdType,
  UpwithCrowd_Members_SaveMemberDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {
  FormMessage,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { putMyProfileApi } from "@/actions/upwithcrowd/my-profile/put-action";
import { postUserMembersApi } from "@/actions/upwithcrowd/user-members/post-action";
import { useSession } from "@repo/utils/auth";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  idType: z.enum(["NONE", "TCKN", "YKN", "MKN"]),
  identifier: z.string().min(1, "Identifier is required"),
  tel: z.string().min(10, "Phone number must be at least 10 digits"),
  mobile: z.string(),
  annualIncome: z.string().regex(/^\d+$/, "Annual income must be a number"),
  title: z.string(),
});

export default function NewPersonalAccount() {
  const currentUser = useSession()?.session?.user?.sub;
  const userName = useSession()?.session?.user?.userName || "";
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      idType: "NONE",
      identifier: "",
      tel: "",
      mobile: "",
      annualIncome: "0",
      title: "",
    },
  });

  const canStartVerification = () => {
    const values = form.getValues();
    return (
      values.idType !== "NONE" &&
      values.identifier &&
      values.name &&
      values.surname
    );
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const requestBody: UpwithCrowd_Members_SaveMemberDto = {
        type: "Individual",
        idType: values.idType as UpwithCrowd_Members_IdType,
        identifier: values.identifier,
        name: values.name,
        surname: values.surname,
        title: values.title,
        tel: values.tel,
        mail: values.email,
        annualIncome: parseInt(values.annualIncome),
        mobile: values.mobile,
        isValidated: true,
      };

      const memberResult = await postApiMember({ requestBody });
      if (memberResult.type === "success") {
        await putMyProfileApi({
          requestBody: {
            name: values.name,
            surname: values.surname,
            userName: userName,
          },
        }).then((result) => {
          toast({
            title: result.message,
            description: "Your profile has been updated successfully.",
            variant: "default",
          });
        });
        await postUserMembersApi({
          requestBody: {
            memberId: memberResult.data.memberID || "",
            userId: currentUser || "",
          },
        }).then((result) => {
          toast({
            title: result.message,
            description: "Your user account has been updated successfully.",
            variant: "default",
          });
        });
      }

      if (memberResult.type === "success") {
        toast({
          title: "Success",
          description: "Your personal account has been created successfully.",
          variant: "default",
        });
      } else {
        // Try to parse as JSON, if fails, use the message as is
        try {
          if (memberResult.message) {
            const errorMessages = JSON.parse(memberResult.message);
            // Only set errors if they exist in the parsed response
            if (errorMessages.identifier)
              form.setError("identifier", {
                message: errorMessages.identifier,
              });
            if (errorMessages.name)
              form.setError("name", { message: errorMessages.name });
            if (errorMessages.surname)
              form.setError("surname", { message: errorMessages.surname });
            if (errorMessages.tel)
              form.setError("tel", { message: errorMessages.tel });
            if (errorMessages.email)
              form.setError("email", { message: errorMessages.email });
            if (errorMessages.annualIncome)
              form.setError("annualIncome", {
                message: errorMessages.annualIncome,
              });
            if (errorMessages.mobile)
              form.setError("mobile", { message: errorMessages.mobile });
          }
        } catch (error) {
          // If parsing fails, just show the raw message
          toast({
            title: "Error",
            description: memberResult.message || "An error occurred",
            variant: "destructive",
          });
          return error;
        }
      }
    } catch (error) {
      console.error("Error creating personal account:", error);
      toast({
        title: "Error",
        description:
          "There was an error creating your personal account. Please try again.",
        variant: "destructive",
      });
    }
  }

  const startVerification = async () => {
    setIsVerifying(true);
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsVerifying(false);
    setIsVerified(true);
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Create Your Personal Account
        </CardTitle>
        <CardDescription>
          Enter your personal account details below to get started.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NONE">NONE</SelectItem>
                        <SelectItem value="TCKN">TCKN</SelectItem>
                        <SelectItem value="YKN">YKN</SelectItem>
                        <SelectItem value="MKN">MKN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifier</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter identifier" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter surname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>E-Devlet Verification</Label>
              <div className="flex flex-col gap-4">
                {!isVerifying && !isVerified && (
                  <Button
                    onClick={startVerification}
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={!canStartVerification()}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    {canStartVerification()
                      ? "Start E-Devlet Verification"
                      : "Please fill required fields first"}
                  </Button>
                )}

                {isVerifying && (
                  <Button disabled className="w-full" variant="outline">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </Button>
                )}

                {isVerified && (
                  <div className="bg-primary text-muted flex items-center justify-center rounded-md p-2 text-center">
                    <Check className="mr-2 h-5 w-5" />
                    <span>E-Devlet Verification Successful!</span>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+12345678901" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+12345678901" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
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
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter annual income"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Create Personal Account"}
            </Button>
          </CardFooter>
        </form>
      </Form>
      <Toaster />
    </Card>
  );
}
