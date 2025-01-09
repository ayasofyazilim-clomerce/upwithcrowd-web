import CallToAction from "@/components/CallToAction";
import Map from "@/components/Map";
import ContactInfo from "./_components/contact-card";
import { ContactForm } from "./client";

export default function Page() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Contact Us
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg md:text-xl">
          Have questions or need support? We're here to help. Reach out to us
          using any of the methods below.
        </p>

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
