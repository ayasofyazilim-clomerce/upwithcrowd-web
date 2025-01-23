import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleAlert, Mail } from "lucide-react";
import { FormContainer } from "../../new/_components/form";
import { Section } from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";
import UserCard from "../../new/_components/user-card";
import ProfileLinkInput from "../../new/_components/vanity-url";

export default function People() {
  return (
    <div className="bg-muted w-full">
      <section className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <TextWithTitle
          title="Introduce yourself"
          text="Give backers an idea of who you are, and add collaborators if you work with a team."
          classNames={{
            container: "mb-8",
            title: "text-2xl font-medium",
            text: "text-lg",
          }}
        />
        <Section
          className="border-b-0"
          title="Your profile"
          text={[
            "This will appear on your project page and must include your name, photo, and biography.",
          ]}
        >
          <FormContainer className="flex flex-col gap-4">
            <UserCard />
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Vanity URL"
          text={[
            "Create a custom URL for your profile page with at least three characters. This will also be the beginning of your project URL—we’ll generate that later.",
          ]}
        >
          <FormContainer className="flex flex-col p-4">
            <ProfileLinkInput />
          </FormContainer>
        </Section>
        <Section
          className="border-b-0"
          title="Collaborators (optional)"
          text={[
            "If you're working with others, you can grant them permission to edit this project, communicate with backers, and coordinate reward fulfillment.",
          ]}
        >
          <FormContainer className="flex flex-col gap-2">
            <Alert className="border-l-primary bg-primary/10 border-l-4 p-4">
              <CircleAlert className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components and dependencies to your app using the
                cli.
              </AlertDescription>
            </Alert>
            <Alert className="flex items-center gap-4 p-4">
              <Mail className="h-4 w-4" />
              <AlertDescription>admin@upwithcrowd.com</AlertDescription>
            </Alert>
            <div className="flex justify-end">
              <Button>Sen Verification Email</Button>
            </div>
          </FormContainer>
        </Section>
      </section>
    </div>
  );
}
