"use client";
import { Presentation } from "lucide-react";
import { IconWrapper } from "./IconWrapper";
import { missions } from "@/_data";
import Image from "next/image";
import { Mission } from "@/_types/missions";
export default function MissionsSection() {
  return (
    <section className="px-6 py-20">
      <div className="container mx-auto space-y-8 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold md:text-5xl">
            The mission and org of our organization.
          </h2>
          <h3 className="text-lg">
            We provide a trusted platform for peoples of worldwide to support
            people and organizers.
          </h3>
        </div>
        <div className="flex w-full items-center justify-center gap-16">
          <Missions missions={missions} />
          <div className="relative h-full">
            <Image
              src={"https://placehold.co/630x380"}
              alt={"Mission Image"}
              width={630}
              height={380}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Missions({ missions }: { missions: Mission[] }) {
  return (
    <div className="flex flex-col gap-14">
      {missions.map((mission, index) => (
        <div key={index} className="flex items-center gap-4 text-left">
          <IconWrapper className="size-14" icon={Presentation} />
          <div className="grid">
            <h3 className="text-2xl font-bold">{mission.title}</h3>
            <p>{mission.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
