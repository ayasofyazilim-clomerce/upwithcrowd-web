"use client";
import {postApiMember} from "@repo/actions/upwithcrowd/member/post-action";
import {putMyProfileApi} from "@repo/actions/upwithcrowd/my-profile/put-action";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "@/components/ui/sonner";
import type {
  UpwithCrowd_Members_IdType,
  UpwithCrowd_Members_SaveMemberDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {zodResolver} from "@hookform/resolvers/zod";
import EDevletIcon from "@public/e-devlet-icon.png";
import EDevletWhiteIcon from "@public/e-devlet-white-icon.png";
import {handlePostResponse} from "@repo/utils/api";
import {useSession} from "@repo/utils/auth";
import {AlertCircle, CheckCircle2, Loader2} from "lucide-react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {PhoneInput} from "react-international-phone";
import "react-international-phone/style.css";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır.")
    .regex(/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/, "İsim yalnızca harf içermelidir."),
  surname: z
    .string()
    .min(2, "Soyisim en az 2 karakter olmalıdır.")
    .regex(/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/, "Soyisim yalnızca harf içermelidir."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  idType: z.enum(["NONE", "TCKN", "YKN", "MKN"]),
  identifier: z
    .string()
    .min(11, "Kimlik numarası 11 haneli olmalıdır.")
    .max(11, "Kimlik numarası 11 haneli olmalıdır.")
    .regex(/^\d{11}$/, "Kimlik numarası sadece rakam içermelidir."),
  mobile: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Geçerli bir telefon numarası giriniz."),
  annualIncome: z.string().regex(/^\d+$/, "Yıllık gelir sadece rakam içermelidir."),
  title: z.string().optional(),
  tel: z.string().optional(),
  maskInvestorProfile: z.boolean().default(false),
});

export default function NewPersonalAccount() {
  const router = useRouter();
  const {session} = useSession();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: session?.user?.email || "",
      idType: "NONE",
      identifier: "",
      mobile: "",
      annualIncome: "0",
      title: "",
      maskInvestorProfile: false,
    },
  });

  const canStartVerification = () => {
    const values = form.getValues();
    return values.idType !== "NONE" && values.identifier;
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const requestBody: UpwithCrowd_Members_SaveMemberDto = {
      type: "Individual",
      idType: values.idType as UpwithCrowd_Members_IdType,
      identifier: values.identifier,
      name: values.name,
      surname: values.surname,
      title: values.title,
      tel: "", // Set tel as empty string
      mail: values.email,
      annualIncome: parseInt(values.annualIncome),
      mobile: values.mobile,
      isValidated: isVerified, // Change this line to use the isVerified state
      maskInvestorProfile: values.maskInvestorProfile,
    };
    postApiMember({requestBody})
      .then(async (response) => {
        if (response.type === "success") {
          await putMyProfileApi({
            requestBody: {
              name: values.name,
              surname: values.surname,
              userName: session?.user?.name || "",
            },
          });
          handlePostResponse(response, router);
        } else {
          toast.error(response.message);
        }
      })
      .catch(() => {
        toast.error("There was an error creating your personal account. Please try again.");
      });
  }

  const startVerification = async () => {
    setIsVerifying(true);
    // Simulate verification process
    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 2000);
    });
    setIsVerifying(false);
    setIsVerified(true); // This will now control both the UI state and the isValidated value in the request
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Yeni Kişisel Hesap Oluştur</CardTitle>
        <CardDescription>Kişisel hesap bilgilerinizi aşağıya girerek başlayın.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(onSubmit)(e);
          }}>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="idType"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Kimlik Türü *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kimlik türünü seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NONE">YOK</SelectItem>
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
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Kimlik Numarası *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Kimlik numarasını girin" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* New Verification Section */}
            <div className="relative space-y-4 rounded-lg border p-4">
              {!isVerified && (
                <Alert variant={canStartVerification() ? "default" : "destructive"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Doğrulama Gerekli</AlertTitle>
                  <AlertDescription>
                    Kayıt işlemine devam etmeden önce kimliğinizi E-Devlet üzerinden doğrulayın.
                  </AlertDescription>
                </Alert>
              )}

              {isVerified ? (
                <Alert className="border-green-200 bg-green-50" variant="default">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">Doğrulama Başarılı</AlertTitle>
                  <AlertDescription className="text-green-600">
                    Kimliğiniz doğrulandı. Şimdi kaydınızı tamamlayabilirsiniz.
                  </AlertDescription>
                </Alert>
              ) : null}

              {!isVerified && (
                <div className="flex justify-center">
                  <Button
                    className={`gap-2 ${
                      canStartVerification() ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-100 text-gray-400"
                    }`}
                    disabled={!canStartVerification() || isVerifying}
                    onClick={() => void startVerification()}
                    size="lg"
                    type="button">
                    <Image
                      alt="E-Devlet"
                      className="rounded-full"
                      height={24}
                      src={canStartVerification() ? EDevletWhiteIcon.src : EDevletIcon.src}
                      width={24}
                    />
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Doğrulanıyor...
                      </>
                    ) : (
                      "E-Devlet ile Doğrula"
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Rest of the form fields - disabled until verification */}
            <div className={`space-y-6 ${!isVerified ? "opacity-50" : ""}`}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>İsim</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="İsim girin" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Soyisim</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Soyisim girin" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="E-posta girin" type="email" />
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Mobil</FormLabel>
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
                        <Input {...field} placeholder="Yıllık geliri girin" type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={form.formState.isSubmitting || !isVerified} type="submit">
              {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {form.formState.isSubmitting ? "Gönderiliyor..." : "Kişisel Hesap Oluştur"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
