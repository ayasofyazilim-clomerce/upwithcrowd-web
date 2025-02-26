"use client";
import type {CarouselApi} from "@/components/ui/carousel";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <section className="grid h-dvh w-full grid-cols-1 overflow-hidden bg-white lg:grid-cols-3">
      <div className="bg-primary relative col-span-2 hidden lg:flex">
        <Carousel
          className="size-full [&>div.overflow-hidden]:h-full"
          opts={{
            loop: true,
          }}
          setApi={setApi}>
          <CarouselContent className="h-full">
            {Array.from({length: 5}).map((_, index) => (
              <CarouselItem
                className="flex h-full items-center justify-center text-white"
                key={new Date().getTime() + index}>
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute left-8 top-8 py-2 text-center text-sm text-white">
          {current} / {count}
        </div>
      </div>
      <div className="m-auto flex size-full flex-wrap items-center bg-white py-4">
        <Image alt="" className="mx-auto" height={60} src="/upwc.png" width={60} />
        <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-8 px-16">{children}</div>
      </div>
    </section>
  );
}
