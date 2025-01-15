"use client";
import { postProjectApi } from "@/actions/upwithcrowd/project/post-action";
import { DatePicker } from "@/components/Datepicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as SheetRoot from "@/components/ui/sheet";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { Combobox } from "@repo/ayasofyazilim-ui/molecules/combobox";
import { Search, UserPlus } from "lucide-react";
import { useState } from "react";
import {
  FormContainer,
  FormField,
  FormInputFieldWithCounter,
} from "../_components/form";
import { Section, SectionHint } from "../_components/section";
import TextWithTitle from "../_components/text-with-title";

export default function Page() {
  const [disabled, setDisabled] = useState(false);
  function saveDefaultProject() {
    setDisabled(true);
    postProjectApi({
      requestBody: {
        projectName: "Deneme" + new Date().getTime(),
        projectDefinition:
          "wp4 vMlIe6ygSNB785TN jKLEBncCqd6yqhWqUJzgyQ1bLl'3dK8hUnsZbo5mhb2wanaHcYxxfRx5itN8fCCtm99fR 6DUFP-NNHf'9u6 hGtovjugiuYe0UDx3SUNmlA81u7GZBqZ9aGA-Ri.ECTNvJ SMO33ye2noYQKFhGxMDg on2C9uHrdS7L,qkqjq-CZbRAJjZnStAE3O9keZ7TE-GDAHRi3yS.zS' -IGbKFdFUUkvR3AD28,nj3Dnj3Qny8p5uQihRJ'KpDqZ7Ajgi8Orw-bzyJa",
        fundCollectionType: "NONE",
        fundNominalAmount: 10,
        fundableAmount: 10,
        additionalFundRate: "89",
        qualifiedFundRate: "86",
        privilege: "tVZ3sfeOREFdmoA0Zgt9ToiyJSsbY-yrweYuaSF3Po0B,6Ff2NA9m9b8Q",
        projectStartDate: "2025-01-15T06:22:15.836Z",
        projectEndDate: "2025-01-15T06:22:15.836Z",
        overFunding: true,
        cashValue: 100,
        minimumFundAmount: 10,
      },
    }).then((res) => alert(res.message || "Başarılı"));
  }
  return (
    <div className="bg-muted w-full">
      <section className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <TextWithTitle
          title="Start with the basics"
          text="Make it easy for people to learn about your project."
          classNames={{
            container: "mb-8",
            title: "text-3xl",
            text: "text-lg",
          }}
        />
        <Section
          title="Project title"
          text={[
            "Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear on your project and pre-launch pages.",
            "Potential backers will also see them if your project appears on category pages, search results, or in emails we send to our community.",
          ]}
        >
          <FormContainer>
            <FormInputFieldWithCounter
              id="title"
              label="Title"
              placeholder="Papercuts: A Party Game for Rude and Well-Read"
              maxLength={60}
            />
            <FormInputFieldWithCounter<TextareaProps>
              id="subtitle"
              label="Subtitle"
              placeholder="Papercuts is a rowdy card game about books and writing brougth to you by Electric Literature."
              maxLength={135}
              formElement={Textarea}
              rows={3}
            />
            <SectionHint
              message="Give backers the best first impression of your project with great titles."
              link={{
                href: "#",
                text: "Learn more...",
              }}
            />
          </FormContainer>
        </Section>
        <Section
          title="Project category"
          text={[
            "Choose a primary category and subcategory to help backers find your project.",
            "Your second subcategory will help us provide more relevant guidance for your project. It won’t display on your project page or affect how it appears in search results.",
            "You can change these anytime before and during your campaign.",
          ]}
        >
          <FormContainer className="grid gap-4 md:grid-cols-2">
            <FormField htmlFor="primaryCategory" label="Primary category">
              <Combobox
                id={"primaryCategory"}
                list={[]}
                onValueChange={() => {}}
                selectIdentifier={""}
                selectLabel={""}
              />
            </FormField>
            <FormField htmlFor="primarySubCategory" label="Primary subcategory">
              <Combobox
                id={"primarySubCategory"}
                list={[]}
                onValueChange={() => {}}
                selectIdentifier={""}
                selectLabel={""}
              />
            </FormField>
            <FormField htmlFor="category" label="Category">
              <Combobox
                id={"category"}
                list={[]}
                onValueChange={() => {}}
                selectIdentifier={""}
                selectLabel={""}
              />
            </FormField>
            <FormField htmlFor="subCategory" label="Subcategory">
              <Combobox
                id={"subCategory"}
                list={[]}
                onValueChange={() => {}}
                selectIdentifier={""}
                selectLabel={""}
              />
            </FormField>
          </FormContainer>
        </Section>
        <Section title="Project leader" text="Who is leading this project?">
          <FormContainer>
            <Combobox
              list={[]}
              onValueChange={() => {}}
              selectIdentifier={""}
              selectLabel={""}
            />
          </FormContainer>
        </Section>
        <Section title="Project members" text="Who is working on this project?">
          <FormContainer>
            <SheetRoot.Sheet>
              <SheetRoot.SheetTrigger asChild>
                <Button variant={"outline"}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add member
                </Button>
              </SheetRoot.SheetTrigger>
              <SheetRoot.SheetContent></SheetRoot.SheetContent>
            </SheetRoot.Sheet>
          </FormContainer>
        </Section>
        <Section
          title="Project location"
          text="Enter the location that best describes where your project is based."
        >
          <FormContainer>
            <FormField htmlFor="location">
              <div className="relative">
                <Input
                  id="location"
                  className="peer pl-8"
                  placeholder="Start typing your location..."
                />
                <Search className="text-muted-foreground absolute left-2 top-0 flex h-9 w-4 peer-focus:text-black" />
              </div>
            </FormField>
          </FormContainer>
        </Section>
        <Section
          title="Target launch date (optional)"
          text="We’ll provide you with recommendations on when to complete steps that may take a few days to process. You can edit this date up until the moment you launch your project, which must always be done manually."
        >
          <FormContainer className="space-y-4">
            <DateInputs />
            <div className="text-sm">
              <p>We'll recommend when you should:</p>
              <ul className="list-disc pl-4">
                <li>Confirm your identity and provide payment details</li>
                <li>Submit your project for review</li>
              </ul>
            </div>
            <SectionHint message="Setting a target date won’t automatically launch your project." />
          </FormContainer>
        </Section>
        <Section
          title="Target launch date (optional)"
          text="We’ll provide you with recommendations on when to complete steps that may take a few days to process. You can edit this date up until the moment you launch your project, which must always be done manually."
        >
          <FormContainer className="space-y-4">
            <RadioGroup defaultValue="fixed" className="gap-0">
              <div className="overflow-hidden rounded-t-md border border-b-0 p-4">
                <Label htmlFor="fixedLaunchDate" className="">
                  Fixed number of days(1-60)
                </Label>
                <RadioGroupItem
                  value="fixed"
                  id="fixedLaunchDate"
                  className="peer float-left mr-2 mt-1"
                />
                <div className="invisible m-0 h-0 opacity-0 transition-all peer-aria-checked:visible peer-aria-checked:mt-4 peer-aria-checked:h-auto peer-aria-checked:opacity-100">
                  <FormField
                    htmlFor="number-of-days"
                    label="Enter number of days"
                  >
                    <Input
                      type="number"
                      id="number-of-days"
                      max="60"
                      min="1"
                      defaultValue={"30"}
                    />
                  </FormField>
                </div>
              </div>

              <div className="overflow-hidden rounded-b-md border p-4">
                <Label htmlFor="specificLaunchDate">
                  End on a specific date & time
                </Label>
                <RadioGroupItem
                  value="specific"
                  id="specificLaunchDate"
                  className="peer float-left mr-2 mt-1"
                />
                <div className="invisible m-0 h-0 opacity-0 transition-all peer-aria-checked:visible peer-aria-checked:mt-4 peer-aria-checked:h-auto peer-aria-checked:opacity-100">
                  <DateInputs />
                </div>
              </div>
            </RadioGroup>
            <SectionHint
              message="Campaigns that last 30 days or less are more likely to be successful."
              link={{
                href: "#",
                text: "Learn more...",
              }}
            />
          </FormContainer>
        </Section>
        <Button
          className="w-full"
          onClick={saveDefaultProject}
          disabled={disabled}
        >
          Save
        </Button>
      </section>
    </div>
  );
}

function DateInputs({
  dayId = "day",
  monthId = "month",
  yearId = "year",
  fullDateId = "fullDate",
}: {
  dayId?: string;
  monthId?: string;
  yearId?: string;
  fullDateId?: string;
}) {
  return (
    <div className="flex max-w-80 flex-col gap-4 md:flex-row md:items-end">
      <FormField htmlFor={dayId} label="Day">
        <Input
          className="min-w-20"
          id={dayId}
          placeholder="DD"
          type="number"
          min="1"
          max="31"
          defaultValue={new Date().getDate()}
        />
      </FormField>
      <FormField htmlFor={monthId} label="Month">
        <Input
          className="min-w-20"
          id={monthId}
          type="number"
          placeholder="MM"
          min="1"
          max="12"
          defaultValue={new Date().getMonth() + 1}
        />
      </FormField>
      <FormField htmlFor={yearId} label="Year">
        <Input
          className="min-w-20"
          id={yearId}
          type="number"
          placeholder="YYYY"
          defaultValue={new Date().getFullYear()}
          min={new Date().getFullYear()}
          max="2099"
        />
      </FormField>
      <DatePicker
        id={fullDateId}
        className="md:max-w-24"
        date={new Date()}
        showIcon
        dateRange={{
          before: new Date(),
          after: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        }}
        onChange={(date) => {
          console.log(date);
        }}
      />
    </div>
  );
}
