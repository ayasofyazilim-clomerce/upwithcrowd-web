"use client";

import {DollarSign, MapPin, Target} from "lucide-react";
import Image from "next/image";
import {projects} from "@/_data/projects";
import type {Project} from "@/_types";
import {Badge} from "./ui/badge";
import {Card} from "./ui/card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./ui/carousel";
import {Progress} from "./ui/progress";

export function ProjectSlider() {
  return (
    <section className="px-6 py-20">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col items-center">
          <h4 className="text-2xl uppercase">Our cases</h4>
          <h2 className="text-center text-4xl font-bold">Popular causes what you should know</h2>
        </div>
        <Carousel
          className="mx-auto w-full max-w-6xl"
          opts={{
            loop: true,
            align: "center",
          }}>
          <CarouselContent className="m-0">
            {projects.map((project) => (
              <CarouselItem className="p-2 md:basis-1/2 md:p-4 lg:basis-1/3" key={project.id}>
                <Card className="space-y-4 overflow-hidden border-none p-4 shadow-lg" key={project.id}>
                  <ProjectImage project={project} />
                  <ProjectDetails project={project} />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex w-full items-center justify-center gap-8">
            <CarouselPrevious className="text-muted-foreground hover:text-primary hover:border-primary/50 relative left-auto right-auto top-auto size-12 transform-none" />
            <CarouselNext className="text-muted-foreground hover:text-primary hover:border-primary/50 relative left-auto right-auto top-auto size-12 transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function ProjectImage({project}: {project: Project}) {
  return (
    <div className="relative">
      <Image
        alt={project.title}
        className="h-48 w-full rounded-lg object-cover"
        height={200}
        src={project.image}
        width={300}
      />
      <Badge className="bg-primary text-primary-foreground absolute bottom-4 left-4">{project.badge}</Badge>
    </div>
  );
}

function ProjectDetails({project}: {project: Project}) {
  const fundedPercentage = (project.raised / project.goal) * 100;
  return (
    <div>
      <div className="text-muted-foreground mb-2 flex items-center text-xs md:text-sm">
        <MapPin className="mr-1 h-3 w-3 md:h-4 md:w-4" />
        {project.location}
      </div>
      <h3 className="mb-4 w-full overflow-hidden text-ellipsis text-nowrap text-lg font-semibold md:text-xl">
        {project.title}
      </h3>
      <div className="bg-primary/5 rounded-lg p-3 md:p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium md:text-sm">Funded: {fundedPercentage.toFixed(0)}%</span>
          <span className="text-muted-foreground text-xs md:text-sm">30 days left</span>
        </div>
        <Progress className="mb-3 md:mb-4" value={fundedPercentage} />
        <div className="flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center">
            <DollarSign className="text-primary mr-2 h-5 w-5" />
            <div>
              <p className="font-semibold">${project.raised.toString()}</p>
              <p className="text-muted-foreground text-xs">raised</p>
            </div>
          </div>
          <div className="flex items-center">
            <Target className="text-primary mr-2 h-5 w-5" />
            <div>
              <p className="font-semibold">${project.goal.toString()}</p>
              <p className="text-muted-foreground text-xs">goal</p>
            </div>
          </div>
        </div>
      </div>
      {/* <Button className="mt-4 w-full">Support This Project</Button> */}
    </div>
  );
}
