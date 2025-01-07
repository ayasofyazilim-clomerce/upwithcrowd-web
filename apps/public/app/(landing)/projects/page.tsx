import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Target } from "lucide-react";
import { getPublicProjectsApi } from "@/actions/upwithcrowd/public-project/actions";

export default async function Page() {
  const projectsResponse = await getPublicProjectsApi();
  if (projectsResponse.type !== "success") return <>yok</>;

  const projects = projectsResponse.data.items || [];
  return (
    <div className="bg-background min-h-screen">
      <section className="px-6 py-12 md:py-20">
        <div className="container mx-auto">
          <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Discover Innovative Projects
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg md:text-xl">
            Explore a world of creativity and innovation. Support projects that
            are shaping the future and making a difference in communities around
            the globe.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const fundedPercentage =
                (project.fundNominalAmount / project.fundableAmount) * 100;
              return (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                    <div className="relative">
                      <Image
                        src={"https://placehold.it/300x200"}
                        alt={project.projectName}
                        width={300}
                        height={200}
                        className="h-48 w-full rounded-t-lg object-cover"
                      />
                      <Badge className="bg-primary text-primary-foreground absolute left-4 top-4">
                        {project.overFunding ? "Overfunding" : "Funding"}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="text-muted-foreground mb-2 flex items-center text-sm">
                        <MapPin className="mr-1 h-4 w-4" />
                        {/* {project.location} */} İstanbul
                      </div>
                      <h3 className="mb-4 text-xl font-semibold">
                        {project.projectName}
                      </h3>
                      <Card className="bg-muted-foreground/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Funded: {fundedPercentage.toFixed(0)}%
                          </span>
                          <span className="text-muted-foreground text-sm">
                            30 days left
                          </span>
                        </div>
                        <Progress value={fundedPercentage} className="mb-4" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <DollarSign className="text-primary mr-2 h-5 w-5" />
                            <div>
                              <p className="font-semibold">
                                ${project.fundNominalAmount.toLocaleString()}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                raised
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Target className="text-primary mr-2 h-5 w-5" />
                            <div>
                              <p className="font-semibold">
                                ${project.fundableAmount.toLocaleString()}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                goal
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </CardContent>
                    <CardFooter className="bg-muted-foreground/5 p-6">
                      <Button className="w-full">View Project</Button>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
