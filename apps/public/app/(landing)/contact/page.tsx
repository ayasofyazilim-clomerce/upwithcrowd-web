import CallToAction from "@/components/call-to-action";
import Map from "@/components/map";
import LandingHero from "@/components/landing-hero";
import ContactInfo from "./_components/contact-card";
import {ContactForm} from "./client";

export default function Page() {
  const title = "Contact Us";
  const description =
    "Have questions or need support? We're here to help. Reach out to us using any of the methods below.";

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <LandingHero description={description} title={title} />

        <ContactInfo />

        <div className="mx-auto mb-16">
          <ContactForm />
        </div>

        <div className="my-16 w-full">
          <div>
            <Map latitude={40.7926624} longitude={29.5103489} zoom={20} />
          </div>
        </div>
        <CallToAction />
      </main>
    </div>
  );
}
