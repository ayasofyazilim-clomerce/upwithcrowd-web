"use client";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {DatePicker} from "@/components/ui/date-picker";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import type {UpwithCrowd_Projects_UpdateProjectFundingDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {$UpwithCrowd_Projects_FundCollectionType} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {zodResolver} from "@hookform/resolvers/zod";
import {putProjectFundingByIdApi} from "@repo/actions/upwithcrowd/project/put-action";
import {handlePutResponse} from "@repo/utils/api";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

const fundingSchema = z.object({
  fundCollectionType: z.enum($UpwithCrowd_Projects_FundCollectionType.enum).optional(),
  fundNominalAmount: z.coerce.number().min(0, "Amount must be greater than or equal to 0"),
  fundableAmount: z.coerce.number().min(0, "Amount must be greater than or equal to 0"),
  additionalFundRate: z.string(),
  qualifiedFundRate: z.string(),
  overFunding: z.boolean().optional().nullable(),
  minimumFundAmount: z.number().nullable(),
  privilege: z.string().max(135, "Privilege must be less than 135 characters").optional().nullable(),
  projectStartDate: z.string(),
  projectEndDate: z.string().optional(),
  cashValue: z.coerce.number().min(0, "Cash value must be greater than or equal to 0"),
});

// Add this mapping object for fund collection type labels
const fundCollectionTypeLabels: Record<string, string> = {
  NONE: "Seçiniz",
  SHRE: "Paya Dayalı",
  DBIT: "Borca Dayalı",
  SHRE_DBIT: "Paya ve Borca Dayalı",
};

export type FundingFormValues = z.infer<typeof fundingSchema>;
export default function ClientFunding({fundingDetail}: {fundingDetail: UpwithCrowd_Projects_UpdateProjectFundingDto}) {
  const {id: projectId} = useParams<{id: string}>();

  const router = useRouter();

  const form = useForm<FundingFormValues>({
    resolver: zodResolver(fundingSchema),
    defaultValues: {
      ...fundingDetail,
      cashValue: fundingDetail.cashValue ?? 0,
    },
    mode: "onChange", // Enable validation as the user types
    reValidateMode: "onChange", // Re-validate when inputs change
  });

  const [spesifDate, setSpesifDate] = useState(false);

  const fundCollectionType = form.watch("fundCollectionType");
  const showCashValue = fundCollectionType === "DBIT" || fundCollectionType === "SHRE_DBIT";

  useEffect(() => {
    if (!spesifDate) {
      const startDate = form.getValues("projectStartDate");
      if (!startDate) {
        // Set current date as start date
        const currentDate = new Date();
        form.setValue("projectStartDate", currentDate.toISOString());

        // Set end date as 30 days from now
        const endDate = new Date(currentDate);
        endDate.setDate(endDate.getDate() + 30);
        form.setValue("projectEndDate", endDate.toISOString());
      } else {
        const startDateTime = new Date(startDate);
        if (!isNaN(startDateTime.getTime())) {
          const endDate = new Date(startDateTime);
          endDate.setDate(endDate.getDate() + 60);
          form.setValue("projectEndDate", endDate.toISOString());
        }
      }
    }
  }, [spesifDate, form]);

  useEffect(() => {
    if (!showCashValue) {
      form.setValue("cashValue", 1000);
    }
  }, [showCashValue, form]);

  const onSubmit = (data: FundingFormValues) => {
    // The values are already converted to numbers by the schema
    const formattedData = {
      ...data,
      overFunding: Boolean(data.overFunding),
    };

    void putProjectFundingByIdApi({
      requestBody: formattedData,
      id: projectId,
    }).then((response) => {
      handlePutResponse(response, router, `/projects/${projectId}/information-form`);
    });
  };
  return (
    <div className="bg-muted w-full">
      <section className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <TextWithTitle
          classNames={{
            container: "mb-8",
            title: "text-3xl",
            text: "text-lg",
          }}
          text="Projenizin finansmanını planlayın ve yönetin."
          title="Finansman detayları"
        />

        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}>
            {/* Privilege Section */}

            {/* Fund Collection Type Section */}
            <Section text={["Select the funding type"]} title="Fund Collection Type">
              <FormContainer>
                <FormField
                  control={form.control}
                  name="fundCollectionType"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Fonlama Tipi</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fund collection type">
                            {field.value
                              ? fundCollectionTypeLabels[field.value] || field.value
                              : "Select fund collection type"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {$UpwithCrowd_Projects_FundCollectionType.enum.map((type) => (
                            <SelectItem key={type} value={type}>
                              {fundCollectionTypeLabels[type] || type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section text="Projenizin başlangıç ve bitiş tarihlerini seçin." title="Proje tarihleri">
              <FormContainer>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="projectStartDate"
                    render={({field}) => (
                      <FormItem className="flex-1">
                        <FormLabel>Başlangıç Tarihi</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={
                              field.value && !isNaN(new Date(field.value).getTime())
                                ? new Date(field.value)
                                : new Date()
                            }
                            setDate={(date?: Date) => {
                              field.onChange(date?.toISOString() || "");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={spesifDate}
                      id="spesificDate"
                      onCheckedChange={(checked) => {
                        setSpesifDate(checked as boolean);
                      }}
                    />
                    <Label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="spesificDate">
                      Özel Bitiş Tarihi
                    </Label>
                  </div>

                  <FormField
                    control={form.control}
                    name="projectEndDate"
                    render={({field}) => (
                      <FormItem className="flex-1">
                        <FormLabel>Bitiş Tarihi</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value ? new Date(field.value) : undefined}
                            disabled={!spesifDate}
                            setDate={(date?: Date) => {
                              field.onChange(date?.toISOString() || "");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormContainer>
            </Section>

            {showCashValue ? (
              <Section className="border-b-0" text={["Enter the cash value for the debit type."]} title="Cash Value">
                <FormContainer className="">
                  <FormField
                    control={form.control}
                    name="cashValue"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Nakit Değeri</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                            <Input
                              className="pl-7"
                              min="0"
                              placeholder="0"
                              type="number"
                              {...field}
                              value={field.value.toString()}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormContainer>
              </Section>
            ) : null}

            {/* Continue with other form fields similarly... */}

            {/* Funding Goals Section Begin */}
            <Section
              className="border-b-0"
              text={["Proje için gerekli minimum fon miktarını girin."]}
              title="Fonlanabilir Miktar">
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="fundableAmount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Fundable Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₺</span>
                          <Input
                            className="pl-7"
                            min="0"
                            placeholder="1"
                            type="number"
                            {...field}
                            value={field.value.toString() || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section
              className="border-b-0"
              text={["Yatırımcıların yapabileceği minimum yatırım miktarı."]}
              title="Minimum Yatırım Miktarı">
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="minimumFundAmount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Min Fund Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₺</span>
                          <Input
                            className="pl-7"
                            min="0"
                            placeholder="1"
                            type="number"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.valueAsNumber);
                            }}
                            value={field.value ?? ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section
              className="border-b-0"
              text={["Nominal değer, projenin temel finansman ihtiyacını temsil eder."]}
              title="Nominal Değer">
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="fundNominalAmount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nominal Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₺</span>
                          <Input
                            className="pl-7"
                            min="0"
                            placeholder="1"
                            type="number"
                            {...field}
                            value={field.value.toString()}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section
              className="border-b-0"
              text={["İşaretlenirse, proje hedef fonlama miktarını aşabilir."]}
              title="Ek Fonlama">
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="overFunding"
                  render={({field}) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Allow over funding</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section
              className="border-b-0"
              text={["Ek fonlama oranı. Toplam fonlanabilir miktara eklenebilecek yüzdeyi belirler."]}
              title="Ek Fonlama Oranı">
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="additionalFundRate"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Additional Fund Rate</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                          <Input className="pl-7" placeholder="0" type="text" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>
            <Section
              className="border-b-0"
              text={["Nitelikli yatırımcılar için fonlama oranı."]}
              title="Nitelikli Fonlama Oranı">
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="qualifiedFundRate"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Qualified Fund Rate</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                          <Input className="pl-7" placeholder="0" type="text" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            <Section text={["Yatırımcılara sağlanacak ayrıcalıkları açıkça belirtin."]} title="Ayrıcalıklar">
              <FormContainer>
                <FormField
                  control={form.control}
                  name="privilege"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Privilege</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            {/* <Section
              text={[
                "Google Sheets şablonumuzu kullanarak projenizi hayata geçirmek için gereken maliyetleri belirleyin.",
                "Belgenize erişimimiz olacak, ancak bilgileriniz hiçbir zaman başkalarıyla paylaşılmayacak.",
              ]}
              title="Proje bütçesi BETA(opsiyonel)">
              <FormContainer className="">
                <BudgetCard />
              </FormContainer>
            </Section> */}
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
