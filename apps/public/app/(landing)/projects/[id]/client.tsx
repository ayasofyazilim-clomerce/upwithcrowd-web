"use client";

import { GetApiPublicProjectProjectDetailByIdResponse } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function ProjectDetails({
  project,
}: {
  project: GetApiPublicProjectProjectDetailByIdResponse;
}) {
  const [currentImageIndex] = useState(0);

  const donationOptions = [10, 25, 50, 100, 250, 500];
  const [selectedDonation, setSelectedDonation] = useState(donationOptions[0]);

  const fundedPercentage =
    ((project.fundableAmount ?? 0) / (project.fundNominalAmount ?? 1)) * 100;
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        {/* <h1 className="mb-4 text-3xl font-bold md:text-4xl">Project Details</h1>
        <p className="mb-8 text-lg md:text-xl">
          Explore the details of this innovative project and consider supporting
          its mission.
        </p> */}

        <div className="flex flex-col gap-8 md:gap-20 lg:flex-row">
          <div className="lg:w-3/5">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
              {project.projectName}
            </h2>
            <p className="text-md mb-4 font-medium md:text-lg">
              {project.privilege}
            </p>
            <p className="text-normal mb-4">
              <span className="text-primary font-bold">
                ${(project.fundableAmount ?? 0).toLocaleString()}
              </span>{" "}
              of ${(project.fundNominalAmount ?? 0).toLocaleString()} raised
            </p>

            <div className="relative mx-auto mb-6 w-full">
              <Image
                src={"https://placehold.co/640x360"}
                alt={`${project.projectName} - Image ${currentImageIndex + 1}`}
                width={640}
                height={360}
                className="aspect-video h-auto w-full rounded-lg object-cover"
              />
              <Badge className="bg-primary text-primary-foreground absolute bottom-4 left-4">
                {project.fundCollectionType}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 transform"
                // onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                // onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Progress value={fundedPercentage} className="mb-4 h-3" />

            <div className="mb-6 flex justify-between text-sm">
              {/* <span>{project.backers} backers</span>  Bu veri eksik */}
              <span>
                ${(project.fundableAmount ?? 0).toLocaleString()} raised
              </span>
              <span>
                {project.projectEndDate
                  ? Math.ceil(
                      (new Date(project.projectEndDate).getTime() -
                        Date.now()) /
                        (1000 * 60 * 60 * 24),
                    )
                  : "N/A"}
                days left
              </span>
            </div>
            <h2 className="mb-2 text-xl font-bold md:text-2xl">
              What is the {project.projectName}?{" "}
            </h2>
            <p className="mb-8 text-lg">{project.projectDefinition}</p>
          </div>

          <div className="lg:w-1/3">
            <section className="w-full">
              <div className="container">
                {/* <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Project Creator
          </h2> */}
                <Card className="flex w-full flex-col items-center border-none bg-transparent shadow-none">
                  <CardContent className="px-0 py-4">
                    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                      <div className="mb-4 text-center md:text-left">
                        <div className="flex items-center justify-center gap-2 md:justify-start">
                          <h3 className="text-xl font-semibold">John Doe</h3>
                          <Image
                            src={"https://placehold.co/32x32"}
                            alt={"project.creatorName"}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Environmentalist & Inventor
                        </p>
                        <div className="text-muted-foreground mb-2 flex items-center justify-center text-sm md:justify-start">
                          <MapPin className="mr-2 h-4 w-4" />
                          California, Bay Area
                        </div>
                        <div className="text-muted-foreground mb-2 flex items-center justify-center text-sm md:justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          johndoe@example.com
                        </div>
                        <div className="text-muted-foreground mb-4 flex items-center justify-center text-sm md:justify-start">
                          <Phone className="mr-2 h-4 w-4" />
                          +1 (555) 123-4567
                        </div>
                        <p className="mb-4 max-w-2xl">
                          John has been working on sustainable water solutions
                          for over a decade. His passion for clean water access
                          drives him to create innovative, eco-friendly
                          technologies. With a background in environmental
                          engineering and years of field experience, John has
                          developed multiple patented water purification systems
                          that are now used in various parts of the world.
                        </p>
                        <Button variant="default">Learn More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            <Card className="border-none bg-transparent p-0 shadow-none">
              <CardContent className="p-0">
                <h3 className="mb-4 text-xl font-semibold">
                  Support this project
                </h3>
                <div className="mb-4 grid grid-cols-3 gap-4">
                  {donationOptions.map((amount) => (
                    <Button
                      key={amount}
                      variant={
                        selectedDonation === amount ? "default" : "outline"
                      }
                      onClick={() => setSelectedDonation(amount)}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button className="w-full">
                  Donate ${selectedDonation} Now
                </Button>
              </CardFooter>
            </Card>
            {/* <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Search Projects</h3>
                <div className="flex">
                  <Input placeholder="Search..." className="mr-2" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card> */}

            {/* <Card className="mb-6">
                son yüklenen projeleri nasıl alabilirim bulamadım
             <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Recent Projects</h3>
                {recentProjects.map((recentProject) => (
                  <Link
                    href={`/projects/${recentProject.id}`}
                    key={recentProject.id}
                    className="hover:bg-muted mb-4 flex items-center rounded p-2"
                  >
                    <Image
                      src={recentProject.image}
                      alt={recentProject.title}
                      width={75}
                      height={50}
                      className="mr-4 rounded"
                    />
                    <span className="text-sm">{recentProject.title}</span>
                  </Link>
                ))}
              </CardContent> 
            </Card> */}

            {/* <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                    projenin birden fazla kategorisi olabilir ancak apiden 1 string değer geliyor
                  {project.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </main>
    </>
  );
}
