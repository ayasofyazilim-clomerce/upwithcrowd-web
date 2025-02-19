import type {
  UpwithCrowd_Projects_ProjectsResponseDto,
  UpwithCrowd_Projects_ProjectsFundingResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {ChevronLeft, ChevronRight, Info} from "lucide-react";
import Image from "next/image";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useRouter} from "next/navigation";

// Info button component
function InfoButton({href}: {href: string}) {
  const router = useRouter();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="h-4 w-4"
            onClick={() => {
              router.push(href);
            }}
            size="icon"
            variant="ghost">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to edit this section</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function ProjectSummary({
  basics,
  funding,
  currentImageIndex,
  fundedPercentage,
  editLinks,
}: {
  basics: UpwithCrowd_Projects_ProjectsResponseDto;
  funding: UpwithCrowd_Projects_ProjectsFundingResponseDto;
  currentImageIndex: number;
  fundedPercentage: number;
  editLinks: {
    basics: string;
    content: string;
  };
}) {
  return (
    <>
      <div className="flex items-start gap-2">
        <h2 className="mb-2 text-2xl font-bold md:text-3xl">{basics.projectName}</h2>
        <InfoButton href={editLinks.basics} />
      </div>

      <p className="text-md mb-4 font-medium md:text-lg">{basics.projectDefinition}</p>
      <p className="text-normal mb-4">
        <span className="text-primary font-bold">$0</span> of ${(funding.fundableAmount ?? 0).toLocaleString()} raised
      </p>

      <div className="relative mx-auto mb-6 w-full">
        <Image
          alt={`${basics.projectName} - Image ${currentImageIndex + 1}`}
          className="aspect-video h-auto w-full rounded-lg object-cover"
          height={360}
          src="https://placehold.co/640x360"
          width={640}
        />
        <Badge className="bg-primary text-primary-foreground absolute bottom-4 left-4">
          {funding.fundCollectionType}
        </Badge>
        <Button
          size="icon"
          variant="outline"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform"
          // onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="absolute right-4 top-1/2 -translate-y-1/2 transform"
          // onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Progress className="mb-4 h-3" value={fundedPercentage} />

      <div className="mb-6 flex justify-between text-sm">
        <span>$0 raised</span>
        <span>
          {funding.projectEndDate
            ? Math.ceil((new Date(funding.projectEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            : "N/A"}
          days left
        </span>
        <span>${funding.fundableAmount?.toLocaleString()} goal</span>
      </div>
    </>
  );
}
