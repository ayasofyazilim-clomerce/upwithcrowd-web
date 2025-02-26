"use client";
import {PhoneInput} from "react-international-phone";
import "react-international-phone/style.css";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/sonner";
import type {UpwithCrowd_Members_SaveMemberDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {useMember} from "@/app/providers/member";
import {postApiMember} from "@/actions/upwithcrowd/member/post-action";
import {getApiMemberApi} from "@/actions/upwithcrowd/member/actions";
import {BusinessAccountModal} from "../../_components/business-account-modal";

const formSchema = z.object({
  identifier: z
    .string()
    .length(10, "VKN must be exactly 10 digits")
    .regex(/^[0-9]+$/, "VKN must contain only numbers"),
  title: z
    .string()
    .min(1, "Title is required")
    .regex(/^[a-zA-Z0-9*\s&,.'\-\p{L}]{1,600}$/u, "Invalid title format"),
  tel: z
    .string()
    .regex(/^(?:[+]\d{1,2})(?:\d{10})$/, "Invalid telephone format")
    .optional()
    .or(z.literal("")),
  mail: z.string().email("Invalid email address"),
  annualIncome: z.string().regex(/^(?:[1-9][0-9]{0,19})$/, "Invalid annual income"),
  name: z.string().optional(),
  surname: z.string().optional(),
  mobile: z.string().optional(),
});

export default function NewBusinessAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {setMembers, currentMember} = useMember();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      identifier: "",
      title: "",
      tel: currentMember?.mobile || "",
      mail: currentMember?.mail || "",
      annualIncome: "0",
    },
  });

  // Check if the form is valid
  const isFormValid = form.formState.isValid;

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

      const memberResult = await postApiMember({requestBody});

      if (memberResult.type === "success") {
        const memberResponse = await getApiMemberApi();
        if (memberResponse.type !== "success") {
          return;
        }
        const memberList = memberResponse.data.items || [];
        setMembers(memberList);
        setShowSuccessModal(true);
      } else {
        toast.error(memberResult.message);
      }
    } catch (error) {
      toast.error("There was an error creating your business account. Please try again.");
    }
    setIsSubmitting(false);
  }

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.replace("/profile");
    // router.refresh();
  };

  return (
    <>
      <Card className="mx-auto w-full p-2 sm:p-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold sm:text-2xl">New Business Account</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter your business account details below to get started.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={() => void form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4 sm:gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">VKN (Tax Number)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-sm sm:text-base"
                          inputMode="numeric"
                          maxLength={10}
                          onInput={(e) => {
                            const input = e.currentTarget;
                            input.value = input.value.replace(/[^0-9]/g, "");
                          }}
                          pattern="[0-9]*"
                          placeholder="Enter your 10-digit Tax Number"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="text-sm sm:text-base" placeholder="Enter title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="tel"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm sm:text-base">Telephone (Optional)</FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          className="w-full text-sm sm:text-base"
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
                      <FormLabel className="text-sm sm:text-base">Annual Income</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-sm sm:text-base"
                          inputMode="numeric"
                          onInput={(e) => {
                            const input = e.currentTarget;
                            input.value = input.value.replace(/[^0-9]/g, "");
                          }}
                          pattern="[0-9]*"
                          placeholder="Enter annual income"
                          type="text"
                        />
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
                    <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-sm sm:text-base"
                        defaultValue={currentMember?.mail || ""}
                        placeholder="Enter email"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full text-sm sm:text-base" disabled={isSubmitting || !isFormValid} type="submit">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? "Submitting..." : "Create Business Account"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <BusinessAccountModal isOpen={showSuccessModal} onClose={handleModalClose} />
    </>
  );
}
