"use client";
import { FormContainer } from "../_components/form";
import { Section } from "../_components/section";
import TextWithTitle from "../_components/text-with-title";
import BudgetCard from "../_components/budget-card";
import GoalAmount from "../_components/goal-amount";

export default function Page() {
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

        {/* Funding Goals Section Begin */}
        <Section
          className="border-b-0"
          title="Funding Goals"
          text={[
            "Set an achievable goal that covers what you need to complete your project.",
            "Funding is all-or-nothing. If you don’t meet your goal, you won’t receive any money.",
          ]}
        >
          <FormContainer className="">
            <GoalAmount />
          </FormContainer>
        </Section>
      </section>
    </div>
  );
}
