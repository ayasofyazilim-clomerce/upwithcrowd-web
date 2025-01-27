"use client";
import { putProjectFundingByIdApi } from "@/actions/upwithcrowd/project/put-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  $UpwithCrowd_Projects_FundCollectionType,
  UpwithCrowd_Projects_FundCollectionType,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import BudgetCard from "../../new/_components/budget-card";
import {
  FormContainer,
  FormInputFieldWithCounter,
} from "../../new/_components/form";
import FundableAmount from "../../new/_components/goal-amount";
import { Section } from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const fundCollectionTypeOptions = $UpwithCrowd_Projects_FundCollectionType.enum;

export default function Page() {
  const { id: projectId } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const [fundCollectionType, setFundCollectionType] = useState<string>();
  const [fundNominalAmount, setFundNominalAmount] = useState(0);
  const [fundableAmount, setFundableAmount] = useState(0);
  const [additionalFundRate, setAdditionalFundRate] = useState("");
  const [qualifiedFundRate, setQualifiedFundRate] = useState("");
  const [overFunding, setOverFunding] = useState(false);
  const [cashValue, setCashValue] = useState(0);
  const [minimumFundAmount, setMinimumFundAmount] = useState(0);
  const [privilege, setPrivilege] = useState("");

  const handleSubmit = async () => {
    const data = {
      fundCollectionType:
        fundCollectionType as UpwithCrowd_Projects_FundCollectionType,
      fundNominalAmount,
      fundableAmount,
      additionalFundRate,
      qualifiedFundRate,
      overFunding,
      cashValue,
      privilege,
      minimumFundAmount,
    };

    console.log("Submit data:", data); // Debug için log ekleyelim

    putProjectFundingByIdApi({
      id: projectId,
      requestBody: data,
    }).then((res) => {
      if (res.type === "success") {
        toast({
          title: "Success",
          description: res.message || "Funding details saved successfully",
        });
        router.push(`/projects/${res.data.projectId}`);
      } else {
        toast({
          title: "Error",
          description:
            res.message || "An error occurred while saving the funding details",
          variant: "destructive",
        });
      }
      console.log(data);
    });
  };

  return (
    <div className="bg-muted w-full">
      <section className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <TextWithTitle
          title="Let’s talk about money"
          text="Plan and manage your project’s finances."
          classNames={{
            container: "mb-8",
            title: "text-2xl font-medium",
            text: "text-lg",
          }}
        />

        <Section
          title="Privilege"
          text={[
            "Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear on your project and pre-launch pages.",
          ]}
        >
          <FormContainer>
            <FormInputFieldWithCounter<TextareaProps>
              id="privilege"
              label="Privilege"
              placeholder="Papercuts is a rowdy card game about books and writing brougth to you by Electric Literature."
              maxLength={135}
              formElement={Textarea}
              rows={3}
              value={privilege}
              onChange={(e) =>
                setPrivilege((e.target as HTMLTextAreaElement).value)
              }
            />
          </FormContainer>
        </Section>

        <Section
          title="Fund Collection Type"
          text="Is your project's funding type equity-based or debt-based?"
        >
          <FormContainer>
            <Select
              onValueChange={(value) => setFundCollectionType(value)}
              value={fundCollectionType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fund collection type" />
              </SelectTrigger>
              <SelectContent>
                {fundCollectionTypeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Nominal Amount"
          text={[
            "The minimum required funding amount for the project. This represents the base level of financing needed.",
          ]}
        >
          <FormContainer className="">
            <div className="space-y-2">
              <Label htmlFor="nominal-amount" className="text-md font-medium">
                Nominal Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  €
                </span>
                <Input
                  type="number"
                  id="nominal-amount"
                  placeholder="0"
                  className="pl-7"
                  min="0"
                  value={fundNominalAmount}
                  onChange={(e) => setFundNominalAmount(Number(e.target.value))}
                />
              </div>
            </div>
          </FormContainer>
        </Section>
        {/* Funding Goals Section Begin */}
        <Section
          className="border-b-0"
          title="Funding Goals"
          text={[
            "The total fundable amount, including any additional funding percentage, representing the maximum funding the project can receive​​",
          ]}
        >
          <FormContainer className="">
            <FundableAmount
              onChange={(value: number) => setFundableAmount(value)}
            />
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Additional Funds Rate"
          text={[
            "Additional funding rate. Defines the extra percentage that can be added to the total fundable amount.",
          ]}
        >
          <FormContainer className="">
            <div className="space-y-2">
              <Label
                htmlFor="additional-fund-rate"
                className="text-md font-medium"
              >
                Additional Fund Rate
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
                <Input
                  type="text"
                  id="additional-fund-rate"
                  placeholder="0"
                  className="pl-7"
                  value={additionalFundRate}
                  onChange={(e) => setAdditionalFundRate(e.target.value)}
                />
              </div>
            </div>
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Qualified Funds Rate"
          text={[
            "Qualified funding rate for qualified investors who are allowed to invest in the project.",
          ]}
        >
          <FormContainer className="">
            <div className="space-y-2">
              <Label
                htmlFor="qualified-fund-rate"
                className="text-md font-medium"
              >
                Qualified Fund Rate
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
                <Input
                  type="text"
                  id="qualified-fund-rate"
                  placeholder="0"
                  className="pl-7"
                  value={qualifiedFundRate}
                  onChange={(e) => setQualifiedFundRate(e.target.value)}
                />
              </div>
            </div>
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Over Funding"
          text={[
            "If checked, the project can exceed its target funding amount.",
          ]}
        >
          <FormContainer className="">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="overfunding"
                checked={overFunding}
                onCheckedChange={(checked) =>
                  setOverFunding(checked as boolean)
                }
              />
              <Label
                htmlFor="overfunding"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow over funding
              </Label>
            </div>
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Cash Value"
          text={["The cash equivalent value of the project."]}
        >
          <FormContainer className="">
            <div className="space-y-2">
              <Label htmlFor="cash-value" className="text-md font-medium">
                Cash Value
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  €
                </span>
                <Input
                  type="number"
                  id="cash-value"
                  placeholder="0"
                  className="pl-7"
                  min="0"
                  value={cashValue}
                  onChange={(e) => setCashValue(Number(e.target.value))}
                />
              </div>
            </div>
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Min Fund Amount"
          text={[
            "The minimum amount an investor can contribute to the project.",
          ]}
        >
          <FormContainer className="">
            <div className="space-y-2">
              <Label htmlFor="min-fund-amount" className="text-md font-medium">
                Min Fund Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  €
                </span>
                <Input
                  type="number"
                  id="min-fund-amount"
                  placeholder="0"
                  className="pl-7"
                  min="0"
                  value={minimumFundAmount}
                  onChange={(e) => setMinimumFundAmount(Number(e.target.value))}
                />
              </div>
            </div>
          </FormContainer>
        </Section>
        <Section
          title="Project budget BETA(optional)"
          text={[
            "Determine the various costs to bring your project to life with our Google Sheets template.",
            "We’ll have access to your document, but we will never share your information with others.",
          ]}
        >
          <FormContainer className="">
            <BudgetCard />
          </FormContainer>
        </Section>
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </section>
    </div>
  );
}
