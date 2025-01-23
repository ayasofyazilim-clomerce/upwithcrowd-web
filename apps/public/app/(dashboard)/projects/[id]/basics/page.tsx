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
} from "../../new/_components/form";
import { Section, SectionHint } from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

type CategoryType = "Technology" | "Production";
type ProjectType = "Initiative" | "Project";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    subtitle: "",
    projectStartDate: new Date() as Date | undefined,
    categoryTypes: [] as CategoryType[],
    projectTypes: [] as ProjectType[],
    sectorId: "e9c0723e-5862-4c1a-9801-530cc4c4a2bd",
  });

  function saveDefaultProject() {
    const { title, subtitle, projectStartDate, categoryTypes, projectTypes } =
      projectDetails;
    if (!projectStartDate) {
      toast({
        title: "Error",
        description: "Please select a project start date.",
        variant: "destructive",
      });
      return;
    }
    const projectEndDate = new Date(projectStartDate);
    projectEndDate.setDate(projectEndDate.getDate() + 60);

    postProjectApi({
      requestBody: {
        projectName: title,
        projectDefinition: subtitle,
        projectStartDate: projectStartDate.toISOString(),
        projectEndDate: projectEndDate.toISOString(),
        categoryTypes,
        projectTypes,
        sectorId: "e9c0723e-5862-4c1a-9801-530cc4c4a2bd",
      },
    }).then((res) => {
      if (res.type === "success") {
        toast({
          title: "Success",
          description: res.message || "Project saved successfully",
        });
        router.push(`/projects/${res.data.projectId}/basics`);
      } else {
        toast({
          title: "Error",
          description:
            res.message || "An error occurred while saving the project",
          variant: "destructive",
        });
      }
    });
  }

  const categoryOptions = [
    { label: "Technology", value: "Technology" },
    { label: "Production", value: "Production" },
  ];

  const projectTypeOptions = [
    { label: "Initiative", value: "Initiative" },
    { label: "Project", value: "Project" },
  ];

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
              value={projectDetails.title}
              onChange={(e) =>
                setProjectDetails({ ...projectDetails, title: e.target.value })
              }
            />
            <FormInputFieldWithCounter<TextareaProps>
              id="subtitle"
              label="Subtitle"
              placeholder="Papercuts is a rowdy card game about books and writing brougth to you by Electric Literature."
              maxLength={135}
              formElement={Textarea}
              rows={3}
              value={projectDetails.subtitle}
              onChange={(e) =>
                setProjectDetails({
                  ...projectDetails,
                  subtitle: e.target.value,
                })
              }
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
            "Choose the categories and types that best describe your project.",
            "These selections will help backers find your project and help us provide relevant guidance.",
          ]}
        >
          <FormContainer className="grid gap-4">
            <FormField htmlFor="categoryTypes" label="Category Types">
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => (
                  <Button
                    key={category.value}
                    variant={
                      projectDetails.categoryTypes.includes(
                        category.value as CategoryType,
                      )
                        ? "default"
                        : "outline"
                    }
                    onClick={() => {
                      const newCategories =
                        projectDetails.categoryTypes.includes(
                          category.value as CategoryType,
                        )
                          ? projectDetails.categoryTypes.filter(
                              (c) => c !== category.value,
                            )
                          : [
                              ...projectDetails.categoryTypes,
                              category.value as CategoryType,
                            ];
                      setProjectDetails({
                        ...projectDetails,
                        categoryTypes: newCategories,
                      });
                    }}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </FormField>

            <FormField htmlFor="projectTypes" label="Project Types">
              <div className="flex flex-wrap gap-2">
                {projectTypeOptions.map((type) => (
                  <Button
                    key={type.value}
                    variant={
                      projectDetails.projectTypes.includes(
                        type.value as ProjectType,
                      )
                        ? "default"
                        : "outline"
                    }
                    onClick={() => {
                      const newTypes = projectDetails.projectTypes.includes(
                        type.value as ProjectType,
                      )
                        ? projectDetails.projectTypes.filter(
                            (t) => t !== type.value,
                          )
                        : [
                            ...projectDetails.projectTypes,
                            type.value as ProjectType,
                          ];
                      setProjectDetails({
                        ...projectDetails,
                        projectTypes: newTypes,
                      });
                    }}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
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
            <DateInputs
              onDateChange={(date) =>
                setProjectDetails({ ...projectDetails, projectStartDate: date })
              }
            />
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
        <Button className="w-full" onClick={saveDefaultProject}>
          Save
        </Button>
        <Toaster />
      </section>
    </div>
  );
}

function DateInputs({
  dayId = "day",
  monthId = "month",
  yearId = "year",
  fullDateId = "fullDate",
  onDateChange,
}: {
  dayId?: string;
  monthId?: string;
  yearId?: string;
  fullDateId?: string;
  onDateChange?: (date: Date | undefined) => void;
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
          if (onDateChange) onDateChange(date || undefined);
        }}
      />
    </div>
  );
}
