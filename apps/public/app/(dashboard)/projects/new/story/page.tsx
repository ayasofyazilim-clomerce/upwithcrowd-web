import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import TiptapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import FaqCard from "../_components/faq-card";
import { FormContainer, FormInputFieldWithCounter } from "../_components/form";
import { Section, SectionHint } from "../_components/section";
import TextWithTitle from "../_components/text-with-title";

export default function Page() {
  return (
    <div className="bg-muted w-full">
      <section className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <TextWithTitle
          title="Project story"
          text="Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are. Read more about telling your story."
          classNames={{
            container: "mb-8",
            title: "text-2xl font-medium",
            text: "text-lg",
          }}
        />

        <FormContainer className="w-full">
          <TiptapEditor
            canEditable={true}
            editOnStart={true}
            editorId="story"
          />
        </FormContainer>
        {/* Funding Goals Section Begin */}
        <Section
          className="border-b-0"
          title="Risks and challenges"
          text={[
            "Be honest about the potential risks and challenges of this project and how you plan to overcome them to complete it.",
          ]}
        >
          <FormContainer className="flex flex-col gap-4">
            <FormInputFieldWithCounter<TextareaProps>
              id="subtitle"
              label="Subtitle"
              placeholder="Papercuts is a rowdy card game about books and writing brougth to you by Electric Literature."
              formElement={Textarea}
              rows={4}
            />
            <SectionHint
              message="Communicate risks and challenges up front to set proper expectations. "
              link={{
                href: "#",
                text: "Learn more...",
              }}
            />
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Use of AI"
          text={[
            "Kickstarter supports creative work and the humans behind that work. Projects that involve AI tools and technologies are allowed in some situations. If your project involves AI in any capacity, tell us a bit more so we can determine if it meets our policy requirements.",
            "Learn about AI policy on Kickstarter",
          ]}
        >
          <FormContainer className="flex flex-col gap-2">
            <Label htmlFor="specificLaunchDate">
              Will your project involve the development of AI technology or use
              AI content?
            </Label>
            <div className="rounded-lg border p-4">
              <RadioGroup>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="specific"
                    id="specificLaunchDate"
                    className="text-muted-foreground peer float-left size-5"
                  />
                  <Label htmlFor="specificLaunchDate">Yes</Label>
                </div>
                <div className="bg-muted my-2 h-px"></div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="specific"
                    id="specificLaunchDate"
                    className="peer float-left size-5"
                  />
                  <Label htmlFor="specificLaunchDate">No</Label>
                </div>
              </RadioGroup>
            </div>
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Frequently Asked Questions
"
          text={["Post answers to frequently asked questions"]}
        >
          <FormContainer className="flex w-full flex-col gap-2 p-4">
            <FaqCard />
          </FormContainer>
        </Section>
      </section>
    </div>
  );
}
