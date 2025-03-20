"use client";

import {PagedResultDto_ListProjectsMembersResponseDto} from "@repo/actions/upwithcrowd/types";
import {Avatar, AvatarFallback} from "@repo/ayasofyazilim-ui/atoms/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@repo/ayasofyazilim-ui/atoms/card";
import AuthCard from "./auth-card";

function formatRoleName(name: string) {
  return name
    .replace("UpwithCrowd:CustomRoles:", "")
    .split(/(?=[A-Z])/)
    .join(" ")
    .trim();
}

export default function ProjectTeam({
  memberResponse,
}: {
  memberResponse: PagedResultDto_ListProjectsMembersResponseDto | null;
}) {
  if (!memberResponse) {
    return <AuthCard title="Proje Ekibi" description="Proje ekibini görmek için giriş yapın veya üye olun" />;
  }

  const teamMembers = (memberResponse.items || []).filter((member) => member.customRoleType !== "Investor");
  const uniqueMembers = [...new Set(teamMembers.map((member) => member))];
  const teamData = uniqueMembers.map((member) => ({
    ...member,
    roles: [
      ...new Set(teamMembers.filter((m) => m.mail === member.mail).map((m) => formatRoleName(m.customRoleName || ""))),
    ],
  }));

  return (
    <div className="mt-8 rounded-md">
      <Card className="py- col-span-1">
        <CardHeader className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <CardTitle className="text-lg sm:text-xl">Proje Ekibi</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6 sm:pt-0">
          <div className="space-y-4">
            {teamData.map((member) => (
              <div className="flex items-center space-x-4" key={member.mail}>
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{member.fullname?.[0] || "X"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{member.fullname || member.title || ""}</p>
                  <p className="text-muted-foreground text-sm">{member.mail}</p>
                  <div className="flex flex-col gap-2 text-sm">
                    {member.roles.map((role) => (
                      <span className="text-primary" key={role}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
