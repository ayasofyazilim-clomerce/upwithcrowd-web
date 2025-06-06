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

export default function ProjectDetails({
  data,
  isEditable,
  projectsMember,
  imageResponse,
  fileResponse,
  investorResponse,
  statsResponse,
}: {
  data: UpwithCrowd_Projects_ProjectsDetailResponseDto;
  isEditable?: boolean;
  projectsMember: PagedResultDto_ListProjectsMembersResponseDto | null;
  imageResponse: UpwithCrowd_Files_FileResponseListDto[];
  fileResponse: UpwithCrowd_Files_FileResponseListDto[];
  investorResponse: PagedResultDto_ListProjectInvestorDto | null;
  statsResponse: UpwithCrowd_Projects_ProjectStatisticsDto | null;
}) {
  const {currentMember} = useMember();
  const {session} = useSession();
  return (
    <ProjectTemplate
      currentMember={currentMember}
      data={data}
      fileResponse={fileResponse}
      imageResponse={imageResponse}
      investorResponse={investorResponse}
      isEditable={isEditable}
      projectsMember={projectsMember}
      session={session}
      statsResponse={statsResponse}
    />
  );
}
