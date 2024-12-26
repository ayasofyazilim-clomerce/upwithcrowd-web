"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

// Mock data for the project
const project = {
  id: 1,
  title: "Eco-Friendly Water Purifier",
  description:
    "Our innovative water purifier uses cutting-edge technology to provide clean, safe drinking water without harmful chemicals or excessive plastic waste. Help us bring this sustainable solution to communities in need around the world.",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  badge: "Environment",
  goal: 50000,
  raised: 35000,
  backers: 250,
  daysLeft: 15,
  categories: ["Environment", "Technology", "Health"],
};

// Mock data for recent projects
const recentProjects = [
  { id: 2, title: "Solar-Powered Education Kits", image: "/placeholder.svg" },
  { id: 3, title: "Community Garden Initiative", image: "/placeholder.svg" },
  {
    id: 4,
    title: "Affordable 3D-Printed Prosthetics",
    image: "/placeholder.svg",
  },
];

const donationOptions = [10, 25, 50, 100, 250, 500];

export default function ProjectPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDonation, setSelectedDonation] = useState(donationOptions[0]);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % project.images.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + project.images.length) % project.images.length,
    );
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Project Details</h1>
        <p className="mb-8 text-lg md:text-xl">
          Explore the details of this innovative project and consider supporting
          its mission.
        </p>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-2/3">
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              {project.title}
            </h2>
            <p className="mb-4 text-lg">
              <span className="text-primary font-bold">
                ${project.raised.toLocaleString()}
              </span>{" "}
              of ${project.goal.toLocaleString()} raised
            </p>

            <div className="relative mx-auto mb-6 max-w-2xl">
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                width={640}
                height={360}
                className="aspect-video h-auto w-full rounded-lg object-cover"
              />
              <Badge className="bg-primary text-primary-foreground absolute bottom-4 left-4">
                {project.badge}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 transform"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Progress
              value={(project.raised / project.goal) * 100}
              className="mb-4"
            />

            <div className="mb-6 flex justify-between text-sm">
              <span>{project.backers} backers</span>
              <span>${project.raised.toLocaleString()} raised</span>
              <span>{project.daysLeft} days left</span>
            </div>

            <p className="mb-8 text-lg">{project.description}</p>

            <Card>
              <CardContent className="p-6">
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
              <CardFooter className="bg-muted-foreground/5 p-6">
                <Button className="w-full">
                  Donate ${selectedDonation} Now
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Search Projects</h3>
                <div className="flex">
                  <Input placeholder="Search..." className="mr-2" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
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
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Project Creator
          </h2>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <Image
              src="/placeholder.svg"
              alt="Project Creator"
              width={200}
              height={200}
              className="rounded-full"
            />
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-xl font-semibold">John Doe</h3>
              <p className="text-muted-foreground mb-4">
                Environmentalist & Inventor
              </p>
              <p className="max-w-md">
                John has been working on sustainable water solutions for over a
                decade. His passion for clean water access drives him to create
                innovative, eco-friendly technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </div>
  );
}
