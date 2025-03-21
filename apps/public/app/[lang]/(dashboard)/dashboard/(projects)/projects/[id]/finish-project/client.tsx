"use client";

import type {
  PagedResultDto_ListProjectInvestorDto,
  PagedResultDto_ListProjectsMembersResponseDto,
  UpwithCrowd_Files_FileResponseListDto,
  UpwithCrowd_Projects_ProjectsDetailResponseDto,
  UpwithCrowd_Projects_ProjectStatisticsDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import ProjectTemplate from "@repo/ui/upwithcrowd/project-components/project-template";
import {useSession} from "@repo/utils/auth";
import {useMember} from "@/app/providers/member";
import {useProject} from "../_components/project-provider";

export default function ProjectDetails({
  data,
  projectsMember,
  imageResponse,
  fileResponse,
  investorResponse,
  statsResponse,
}: {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
  projectsMember: PagedResultDto_ListProjectsMembersResponseDto | null;
  imageResponse: UpwithCrowd_Files_FileResponseListDto[];
  fileResponse: UpwithCrowd_Files_FileResponseListDto[];
  investorResponse: PagedResultDto_ListProjectInvestorDto | null;
  statsResponse: UpwithCrowd_Projects_ProjectStatisticsDto | null;
}) {
  const {currentMember} = useMember();
  const {session} = useSession();
  const {isProjectEditable} = useProject();
  return (
    <div className="bg-muted w-full overflow-hidden pb-24 md:pb-0">
      <ProjectTemplate
        currentMember={currentMember}
        data={data}
        fileResponse={fileResponse}
        imageResponse={imageResponse}
        investorResponse={investorResponse}
        isEditable={isProjectEditable}
        isPreview
        projectsMember={projectsMember}
        session={session}
        statsResponse={statsResponse}
      />
    </div>
  );
}
