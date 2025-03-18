import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import type {UpwithCrowd_Projects_ListProjectsResponseDto as Project} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {formatCurrency} from "@repo/ui/utils";
import {Send, Target, Wallet} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ListedProjectCard({project}: {project: Project}) {
  const fundedPercentage = 0;

  const getDaysLeft = () => {
    const endDate = new Date(project.projectEndDate ?? Date.now());
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <Link className="pointer" href={`/projects/${project.id}`}>
      <Card className="hover:scale-102 space-y-2 overflow-hidden border-none p-4 shadow-lg transition-transform duration-300 hover:shadow-xl">
        <div className="relative">
          <Image
            alt={project.projectName}
            className="h-64 w-full rounded-lg object-cover"
            height={300}
            src={project.filePath || "https://placehold.co/200x300"}
            width={300}
          />
          <Badge className="bg-primary text-primary-foreground absolute bottom-2 left-2 font-medium">
            {project.fundCollectionType}
          </Badge>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h3 className="overflow-hidden text-ellipsis text-nowrap text-lg font-semibold md:text-xl">
            {project.projectName}
          </h3>
          <Link
            className="hover:text-primary  flex w-full shrink-0 items-center gap-1 rounded-full text-sm text-gray-600 transition-colors duration-300"
            href={`/profile/notice/${project.id}`}>
            Bildirim Gönder
            <Send className="text-primary h-4 w-4" />
          </Link>
        </div>

        <div className="bg-primary/5 rounded-lg p-3 md:p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium md:text-sm">Fonlanan: {fundedPercentage.toFixed(0)}%</span>
            <span className="text-muted-foreground text-xs md:text-sm">{getDaysLeft()} gün kaldı</span>
          </div>
          <Progress className="mb-3 md:mb-4" value={fundedPercentage} />
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center">
              <Wallet className="text-primary mr-2 h-5 w-5" />
              <div>
                <p className="font-semibold">{formatCurrency(0)}</p>
                <p className="text-muted-foreground text-xs">toplandı</p>
              </div>
            </div>
            <div className="flex items-center">
              <Target className="text-primary mr-2 h-5 w-5" />
              <div>
                <p className="font-semibold">{formatCurrency(project.fundableAmount)}</p>
                <p className="text-muted-foreground text-xs">hedef</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
