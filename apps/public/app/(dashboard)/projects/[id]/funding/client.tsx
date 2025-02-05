"use client";
import {putProjectFundingByIdApi} from "@/actions/upwithcrowd/project/put-action";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
  $UpwithCrowd_Projects_FundCollectionType,
  UpwithCrowd_Projects_UpdateProjectFundingDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {useParams, useRouter} from "next/navigation";
import BudgetCard from "../../new/_components/budget-card";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "@/components/ui/sonner";

const fundingSchema = z.object({
  fundCollectionType: z.enum($UpwithCrowd_Projects_FundCollectionType.enum).optional(),
  fundNominalAmount: z.coerce.number().min(0, "Amount must be greater than or equal to 0"),
  fundableAmount: z.coerce.number().min(0, "Amount must be greater than or equal to 0"),
  additionalFundRate: z.string(),
  qualifiedFundRate: z.string(),
  overFunding: z.boolean().optional().nullable(),
  cashValue: z.number().nullable(),
  minimumFundAmount: z.number().nullable(),
  privilege: z.string().max(135, "Privilege must be less than 135 characters").optional().nullable(),
});

export type FundingFormValues = z.infer<typeof fundingSchema>;
export default function ClientFunding({fundingDetail}: {fundingDetail: UpwithCrowd_Projects_UpdateProjectFundingDto}) {
  const {id: projectId} = useParams<{id: string}>();

  const router = useRouter();

  const form = useForm<FundingFormValues>({
    resolver: zodResolver(fundingSchema),
    defaultValues: fundingDetail,
  });
  const onSubmit = async (data: FundingFormValues) => {
    try {
      // The values are already converted to numbers by the schema
      const formattedData = {
        ...data,
        overFunding: Boolean(data.overFunding),
      };

      putProjectFundingByIdApi({
        requestBody: formattedData,
        id: projectId,
      }).then((response) => {
        if (response.type === "success") {
          toast.success("Funding details updated successfully");
          router.push(`/dashboard/projects/${projectId}/funding`);
        } else {
          toast.error("An unexpected error occurred");
        }
      });
      // ...rest of the code...
    } catch (error) {
      toast.error("An unexpected error occurred");
      return error;
    }
  };

  return (
    <div className="bg-muted w-full">
      <section className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <TextWithTitle
          title="Let's talk about money"
          text="Plan and manage your project's finances."
          classNames={{
            container: "mb-8",
            title: "text-2xl font-medium",
            text: "text-lg",
          }}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Privilege Section */}
            <Section title="Privilege" text={["Write a clear, brief description of the privileges."]}>
              <FormContainer>
                <FormField
                  control={form.control}
                  name="privilege"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Privilege</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value ?? ""} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>

            {/* Fund Collection Type Section */}
            <Section title="Fund Collection Type" text={["Select the funding type"]}>
              <FormContainer>
                <FormField
                  control={form.control}
                  name="fundCollectionType"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Fund Collection Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fund collection type" />
                        </SelectTrigger>
                        <SelectContent>
                          {$UpwithCrowd_Projects_FundCollectionType.enum.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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

            {/* Continue with other form fields similarly... */}
            <Section
              className="border-b-0"
              title="Nominal Amount"
              text={[
                "The minimum required funding amount for the project. This represents the base level of financing needed.",
              ]}>
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="fundNominalAmount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nominal Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                          <Input
                            type="number"
                            placeholder="0"
                            className="pl-7"
                            min="0"
                            {...field}
                            value={field.value?.toString() ?? ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormContainer>
            </Section>
            {/* Funding Goals Section Begin */}
            <Section
              className="border-b-0"
              title="Fundable Amount"
              text={[
                "The minimum required funding amount for the project. This represents the base level of financing needed.",
              ]}>
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="fundableAmount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Fundable Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                          <Input
                            type="number"
                            placeholder="0"
                            className="pl-7"
                            min="0"
                            {...field}
                            value={field.value?.toString() ?? ""}
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
              title="Additional Funds Rate"
              text={[
                "Additional funding rate. Defines the extra percentage that can be added to the total fundable amount.",
              ]}>
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
                          <Input type="text" placeholder="0" className="pl-7" {...field} />
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
              title="Qualified Funds Rate"
              text={["Qualified funding rate for qualified investors who are allowed to invest in the project."]}>
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
                          <Input type="text" placeholder="0" className="pl-7" {...field} />
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
              title="Over Funding"
              text={["If checked, the project can exceed its target funding amount."]}>
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
            <Section className="border-b-0" title="Cash Value" text={["The cash equivalent value of the project."]}>
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="cashValue"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Cash Value</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                          <Input
                            type="number"
                            placeholder="0"
                            className="pl-7"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
              title="Min Fund Amount"
              text={["The minimum amount an investor can contribute to the project."]}>
              <FormContainer className="">
                <FormField
                  control={form.control}
                  name="minimumFundAmount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Min Fund Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                          <Input
                            type="number"
                            placeholder="0"
                            className="pl-7"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
              title="Project budget BETA(optional)"
              text={[
                "Determine the various costs to bring your project to life with our Google Sheets template.",
                "We’ll have access to your document, but we will never share your information with others.",
              ]}>
              <FormContainer className="">
                <BudgetCard />
              </FormContainer>
            </Section>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
