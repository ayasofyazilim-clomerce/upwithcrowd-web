"use client";

import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Building2, Users, UserRound, PieChartIcon, Receipt, Combine, AlertCircle} from "lucide-react";
import {Pie, PieChart, ResponsiveContainer, Cell} from "recharts";
import type {
  UpwithCrowd_Projects_ListProjectsResponseDto,
  UpwithCrowd_Members_ListMemberResponseDto,
} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";

// Update the chartColors object to have more harmonious colors
const chartColors = {
  share: "#FADFA1", // Indigo
  debt: "#116A7B", // Sky blue
  shareDept: "#DEAC80", // Cyan
  individual: "#597445", // Violet
  organization: "#B06161", // Indigo
  total: "#3B82F6", // Blue
};

// Update the TooltipProps interface

// const ChartTooltipContent: React.FC<CustomTooltipProps> = ({
//   active,
//   payload,
// }: {
//   active?: boolean | undefined;
//   payload?: {
//     payload?: Payload;
//   }[];
// }) => {
//   if (!active || !payload?.length) return null;

//   const data = payload[0].payload;
//   if (!data) return null;
//   return (
//     <div className="bg-background rounded-lg border p-2 shadow-md">
//       <p className="text-sm font-medium">
//         {chartConfig[data.name].label}: {data.value}
//       </p>
//     </div>
//   );
// };

const chartConfig: Record<string, {label: string; color?: string}> = {
  count: {
    label: "Proje Sayısı",
  },
  share: {
    label: "Paya Dayalı",
    color: chartColors.share,
  },
  debt: {
    label: "Borca Dayalı",
    color: chartColors.debt,
  },
  shareDept: {
    label: "Pay/Borç Karma",
    color: chartColors.shareDept,
  },
  individual: {
    label: "Bireysel Üyeler",
    color: chartColors.individual,
  },
  organization: {
    label: "Kurumsal Üyeler",
    color: chartColors.organization,
  },
  total: {
    label: "Toplam Üye",
    color: chartColors.total,
  },
};

function ChartLegend({items}: {items: string[]}) {
  return (
    <div className="flex items-center gap-4 text-sm">
      {Object.entries(chartConfig)
        .filter(([key]) => items.includes(key))
        .map(([key, value]) => (
          <div className="flex items-center gap-2" key={key}>
            <div
              className="h-3 w-3 rounded-full"
              style={{backgroundColor: chartColors[key as keyof typeof chartColors]}}
            />
            <span className="text-muted-foreground">{value.label}</span>
          </div>
        ))}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-card relative rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
      <div className="absolute -left-4 -top-4 rounded-full p-2" style={{backgroundColor: `${color}30`}}>
        <Icon className="h-5 w-5" style={{color}} />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-muted-foreground text-sm">{title}</p>
        <h3 className="mt-1 text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

export interface DashboardProps {
  data: {
    filteredProjects: {
      debt: UpwithCrowd_Projects_ListProjectsResponseDto[];
      share: UpwithCrowd_Projects_ListProjectsResponseDto[];
      shareDept: UpwithCrowd_Projects_ListProjectsResponseDto[];
    };
    filteredMembers: {
      individual: UpwithCrowd_Members_ListMemberResponseDto[];
      organization: UpwithCrowd_Members_ListMemberResponseDto[];
    };
    projects: UpwithCrowd_Projects_ListProjectsResponseDto[];
    membersResponse: {
      data: {
        items: UpwithCrowd_Members_ListMemberResponseDto[];
      };
    };
  };
}

export default function DashboardClient({data}: DashboardProps) {
  const projectChartData = [
    {name: "share", value: data.filteredProjects.share.length, fill: chartColors.share},
    {name: "debt", value: data.filteredProjects.debt.length, fill: chartColors.debt},
    {name: "shareDept", value: data.filteredProjects.shareDept.length, fill: chartColors.shareDept},
  ];

  const totalProjects = data.projects.length;
  const totalMembers = data.membersResponse.data.items.length;
  const individualMembersCount = data.filteredMembers.individual.length;
  const organizationMembersCount = data.filteredMembers.organization.length;

  // Üye dağılımı için veri
  const memberDistributionData = [
    {name: "individual", value: individualMembersCount, fill: chartColors.individual},
    {name: "organization", value: organizationMembersCount, fill: chartColors.organization},
  ];

  return (
    <div className="space-y-8">
      {/* Platform Introduction Section */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Upwithcrowd Admin Paneline Hoş Geldiniz</h1>
          <p className="mt-2 text-gray-600">Kitle fonlaması projelerinizi yönetmek için tek platform</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <AlertCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Kolay Proje Yönetimi</h3>
                  <p className="text-sm text-gray-600">Pay ve borç tabanlı projeleri tek platformda yönetin</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Üye Yönetimi</h3>
                  <p className="text-sm text-gray-600">Bireysel ve kurumsal üyelerinizi kolayca takip edin</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-100 p-3">
                  <PieChartIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Detaylı Analizler</h3>
                  <p className="text-sm text-gray-600">Projelerinizin performansını anlık olarak izleyin</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Proje Bilgileri Card'ı */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle>Proje Bilgileri</CardTitle>
              <ChartLegend items={["share", "debt", "shareDept"]} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Proje İstatistikleri */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                color={chartColors.share}
                icon={PieChartIcon}
                title="Paya Dayalı"
                value={data.filteredProjects.share.length}
              />
              <StatCard
                color={chartColors.debt}
                icon={Receipt}
                title="Borca Dayalı"
                value={data.filteredProjects.debt.length}
              />
              <StatCard
                color={chartColors.shareDept}
                icon={Combine}
                title="Pay/Borç Karma"
                value={data.filteredProjects.shareDept.length}
              />
            </div>

            {/* Proje Dağılımı Grafiği */}
            <div className="relative h-[220px] w-full">
              <ResponsiveContainer height="100%" width="100%">
                <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={projectChartData}
                      dataKey="value"
                      innerRadius={60}
                      label={({value}) => {
                        const sum = projectChartData.reduce((acc, entry) => acc + entry.value, 0);
                        const percentage = ((value / sum) * 100).toFixed(0);
                        return `${percentage}%`;
                      }}
                      nameKey="name"
                      outerRadius={80}
                      paddingAngle={3}
                      strokeWidth={2}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
                  </PieChart>
                </ChartContainer>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalProjects}</div>
                  <div className="text-muted-foreground text-xs">Toplam Proje</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Üye Bilgileri Card'ı */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle>Üye Bilgileri</CardTitle>
              <ChartLegend items={["individual", "organization"]} />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Üye İstatistikleri */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                color={chartColors.individual}
                icon={UserRound}
                title="Bireysel Üyeler"
                value={individualMembersCount}
              />
              <StatCard
                color={chartColors.organization}
                icon={Building2}
                title="Kurumsal Üyeler"
                value={organizationMembersCount}
              />
              <StatCard color={chartColors.total} icon={Users} title="Toplam Üye" value={totalMembers} />
            </div>

            {/* Üye Dağılımı Grafiği */}
            <div className="relative h-[220px] w-full">
              <ResponsiveContainer height="100%" width="100%">
                <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={chartConfig}>
                  <PieChart>
                    <Pie
                      cx="50%"
                      cy="50%"
                      data={memberDistributionData}
                      dataKey="value"
                      innerRadius={60}
                      label={({percent}) => `${(percent * 100).toFixed(0)}%`}
                      nameKey="name"
                      outerRadius={80}
                      paddingAngle={3}
                      strokeWidth={2}>
                      {memberDistributionData.map((entry, index) => (
                        <Cell fill={entry.fill} key={`cell-${index}`} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
                  </PieChart>
                </ChartContainer>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalMembers}</div>
                  <div className="text-muted-foreground text-xs">Toplam Üye</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
