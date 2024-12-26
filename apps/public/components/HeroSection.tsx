import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative h-[calc(100dvh-6rem)] px-6 py-12 md:py-20"
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
    >
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-between md:h-full md:flex-row">
        <div className="mb-8 max-w-2xl md:mb-0">
          <h1 className="mb-4 text-3xl font-bold md:text-6xl">
            Fundraising for the people and cause you care
          </h1>
          <p className="text-muted-foreground text-md mb-6 tracking-wide md:text-lg">
            We provide a trusted donation channel for peoples of worldwide to
            support people and organizers. Crowdfunding is a way to raise money
            for an individual or organization by collecting donations through
            strangers and more.
          </p>
          <Button size="lg">Explore Projects</Button>
        </div>
        <div className="relative aspect-square w-full max-w-lg">
          <Image
            src="/placeholder.svg"
            alt="Crowdfunding illustration"
            fill
            className="ring-primary/30 rounded-[25px] rounded-tl-[100px] object-cover ring-4"
          />
        </div>
      </div>
    </section>
  );
}
