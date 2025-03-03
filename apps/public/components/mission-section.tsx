"use client";
import {Presentation} from "lucide-react";
import Image from "next/image";
import {missions} from "@/_data";
import type {Mission} from "@/_types/missions";
import {IconWrapper} from "./icon-wrapper";

export default function MissionsSection() {
  return (
    <section className="px-6 py-20">
      <div className="container mx-auto space-y-8 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold md:text-5xl">Organizasyonumuzun misyonu ve vizyonu.</h2>
          <h3 className="text-lg">
            Dünya çapındaki insanlar ve organizatörler için güvenilir bir platform sağlıyoruz.
          </h3>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-16 md:flex-row">
          <Missions missionsData={missions} />
          <div className="relative h-full">
            <Image alt="Misyon Görseli" height={380} src="https://placehold.co/630x380" width={630} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Missions({missionsData}: {missionsData: Mission[]}) {
  return (
    <div className="flex flex-col gap-14">
      {missionsData.map((_mission, index) => (
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left" key={index}>
          <IconWrapper className="size-14" icon={Presentation} />
          <div className="grid">
            <h3 className="text-2xl font-bold">{_mission.title}</h3>
            <p>{_mission.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
