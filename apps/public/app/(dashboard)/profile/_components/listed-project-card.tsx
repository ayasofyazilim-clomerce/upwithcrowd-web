import Link from "next/link";
import Image from "next/image";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Progress} from "@/components/ui/progress";
import {MapPin, DollarSign, Target} from "lucide-react";
import {UpwithCrowd_Projects_ListProjectsResponseDto as Project} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

export default function ListedProjectCard({project}: {project: Project}) {
  const fundedPercentage = (project.fundableAmount / project.fundNominalAmount) * 100;

  return (
    <Link href={`/projects/${project.id}`} className="pointer">
      <Card className="space-y-2 overflow-hidden border-none p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative">
          <Image
            src={"https://placehold.co/200x300"}
            alt={project.projectName}
            width={300}
            height={300}
            className="h-64 w-full rounded-lg object-cover"
          />
          <Badge className="bg-primary text-primary-foreground absolute bottom-2 left-2 font-medium">
            {project.fundCollectionType}
          </Badge>
        </div>
        <div className="text-muted-foreground flex items-center text-xs md:text-sm">
          <MapPin className="mr-1 h-3 w-3 md:h-4 md:w-4" />
          California, Bay Area
        </div>
        <h3 className="mb-4 w-full overflow-hidden text-ellipsis text-nowrap text-lg font-semibold md:text-xl">
          {project.projectName}
        </h3>
        <div className="bg-primary/5 rounded-lg p-3 md:p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium md:text-sm">Funded: {fundedPercentage.toFixed(0)}%</span>
            <span className="text-muted-foreground text-xs md:text-sm">30 days left</span>
          </div>
          <Progress value={fundedPercentage} className="mb-3 md:mb-4" />
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center">
              <DollarSign className="text-primary mr-2 h-5 w-5" />
              <div>
                <p className="font-semibold">${project.fundNominalAmount.toString()}</p>
                <p className="text-muted-foreground text-xs">raised</p>
              </div>
            </div>
            <div className="flex items-center">
              <Target className="text-primary mr-2 h-5 w-5" />
              <div>
                <p className="font-semibold">${project.fundableAmount.toString()}</p>
                <p className="text-muted-foreground text-xs">goal</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
