import { GetApiPublicProjectProjectDetailByIdResponse } from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ProjectSummary({
  project,
  currentImageIndex,
  fundedPercentage,
}: {
  project: GetApiPublicProjectProjectDetailByIdResponse;
  currentImageIndex: number;
  fundedPercentage: number;
}) {
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold md:text-3xl">
        {project.projectName}
      </h2>
      <p className="text-md mb-4 font-medium md:text-lg">{project.privilege}</p>
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
        <span>${(project.fundableAmount ?? 0).toLocaleString()} raised</span>
        <span>
          {project.projectEndDate
            ? Math.ceil(
                (new Date(project.projectEndDate).getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24),
              )
            : "N/A"}
          days left
        </span>
      </div>
    </>
  );
}
