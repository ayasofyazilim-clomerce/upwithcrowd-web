"use client";
import {handlePostResponse} from "@repo/utils/api";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import type {UpwithCrowd_Members_SaveMemberDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {zodResolver} from "@hookform/resolvers/zod";
import {postApiMember} from "@repo/actions/upwithcrowd/member/post-action";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {PhoneInput} from "react-international-phone";
import "react-international-phone/style.css";
import * as z from "zod";
import {useMember} from "@/app/providers/member";
import {BusinessAccountModal} from "../../_components/business-account-modal";

const formSchema = z.object({
  identifier: z
    .string()
    .length(10, "VKN tam olarak 10 haneli olmalıdır")
    .regex(/^[0-9]+$/, "VKN sadece rakamlardan oluşmalıdır"),
  title: z
    .string()
    .min(1, "Ünvan gereklidir")
    .regex(/^[a-zA-Z0-9*\s&,.'\-\p{L}]{1,600}$/u, "Geçersiz ünvan formatı"),
  tel: z
    .string()
    .regex(/^(?:[+]\d{1,2})(?:\d{10})$/, "Geçersiz telefon formatı")
    .optional()
    .or(z.literal("")),
  mail: z.string().email("Geçersiz e-posta adresi"),
  annualIncome: z.string().regex(/^(?:[1-9][0-9]{0,19})$/, "Geçersiz yıllık gelir"),
  name: z.string().optional(),
  surname: z.string().optional(),
  mobile: z.string().optional(),
  maskInvestorProfile: z.boolean().optional(),
});

export default function NewBusinessAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {currentMember} = useMember();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      identifier: "",
      title: "",
      tel: currentMember?.mobile || "",
      mail: currentMember?.mail || "",
      annualIncome: "0",
      maskInvestorProfile: false,
    },
  });
  // Check if the form is valid
  const isFormValid = form.formState.isValid;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const requestBody: UpwithCrowd_Members_SaveMemberDto = {
      type: "Organization",
      idType: "VKN",
      identifier: values.identifier,
      title: values.title,
      tel: values.tel || "",
      mail: values.mail,
      annualIncome: parseInt(values.annualIncome),
      mobile: "",
      isValidated: false,
      maskInvestorProfile: values.maskInvestorProfile,
    };

    void postApiMember({requestBody}).then((res) => {
      handlePostResponse(res);
      setShowSuccessModal(true);
    });

    setIsSubmitting(false);
  }

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.replace("/profile");
  };

  return (
    <>
      <Card className="mx-auto w-full p-2 sm:p-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold sm:text-2xl">Yeni Kurumsal Hesap</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Başlamak için işletme hesap bilgilerinizi girin.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(onSubmit)(e);
            }}>
            <CardContent className="grid gap-4 sm:gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">VKN (Vergi Kimlik Numarası)</FormLabel>
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
                          placeholder="10 haneli Vergi Numaranızı girin"
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
                      <FormLabel className="text-sm sm:text-base">Ünvan</FormLabel>
                      <FormControl>
                        <Input {...field} className="text-sm sm:text-base" placeholder="Ünvan giriniz" />
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
                      <FormLabel className="text-sm sm:text-base">Telefon (İsteğe bağlı)</FormLabel>
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
                      <FormLabel className="text-sm sm:text-base">Yıllık Gelir</FormLabel>
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
                          placeholder="Yıllık gelir giriniz"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="mail"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">E-posta</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-sm sm:text-base"
                          defaultValue={currentMember?.mail || ""}
                          placeholder="E-posta adresinizi girin"
                          type="email"
                        />
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
                      <FormLabel className="text-sm sm:text-base">Yatırımcı profilim görünsün</FormLabel>
                      <Select
                        defaultValue={field.value ? "hayir" : "evet"}
                        onValueChange={(value) => {
                          field.onChange(value !== "evet");
                        }}>
                        <FormControl>
                          <SelectTrigger className="text-sm sm:text-base">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full text-sm sm:text-base" disabled={isSubmitting || !isFormValid} type="submit">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? "Gönderiliyor..." : "İşletme Hesabı Oluştur"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <BusinessAccountModal isOpen={showSuccessModal} onClose={handleModalClose} />
    </>
  );
}
