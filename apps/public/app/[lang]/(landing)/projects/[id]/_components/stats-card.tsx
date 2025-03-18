"use client";

import {TrendingUp} from "lucide-react";
import * as React from "react";
import {Label, Pie, PieChart} from "recharts";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import type {UpwithCrowd_Projects_ProjectStatisticsDto} from "@ayasofyazilim/upwithcrowd-saas/UPWCService";
import {formatCurrency} from "@repo/ui/utils";
import type {ViewBox} from "recharts/types/util/types";

interface StatsCardProps {
  stats: UpwithCrowd_Projects_ProjectStatisticsDto | null;
}

export default function StatsCard({stats}: StatsCardProps) {
  // Use provided stats or default values when stats is null
  const investorData = React.useMemo(
    () => ({
      investorCount: stats?.investorCount ?? 0,
      qualifiedInvestorCount: stats?.qualifiedInvestorCount ?? 0,
      qualifiedInvestmentRate: stats?.qualifiedInvestmentRate ?? 0,
      totalInvestment: stats?.totalInvestment ?? 0,
      investmentRate: stats?.investmentRate ?? 0,
    }),
    [stats],
  );

  const chartData = React.useMemo(
    () => [
      {
        type: "qualified",
        value: investorData.qualifiedInvestorCount,
        fill: "var(--color-qualified)",
      },
      {
        type: "regular",
        value: investorData.investorCount - investorData.qualifiedInvestorCount,
        fill: "var(--color-regular)",
      },
    ],
    [investorData.investorCount, investorData.qualifiedInvestorCount],
  );

  const formattedInvestmentRate = React.useMemo(() => {
    return (investorData.qualifiedInvestmentRate * 100).toFixed(1);
  }, [investorData.qualifiedInvestmentRate]);

  const chartConfig = {
    value: {
      label: "Yatırımcılar",
    },
    qualified: {
      label: "Nitelikli Yatırımcılar",
      color: "hsl(var(--chart-1))",
    },
    regular: {
      label: "Normal Yatırımcılar",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="mt-6 flex flex-col">
      <CardHeader className=" pb-0">
        <CardTitle className="text-xl font-bold md:text-2xl">Yatırımcı Dağılımı</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={chartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
            <Pie data={chartData} dataKey="value" innerRadius={60} nameKey="type" strokeWidth={5}>
              <Label
                content={({viewBox}) => CustomLabelContent({viewBox, totalInvestment: investorData.totalInvestment})}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Nitelikli yatırım oranı: {formattedInvestmentRate}% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Yatırım oranı: toplam kapasitenin {investorData.investmentRate.toFixed(2)}%&apos;si
        </div>
      </CardFooter>
    </Card>
  );
}

function CustomLabelContent({viewBox, totalInvestment}: {viewBox: ViewBox | undefined; totalInvestment: number}) {
  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    return (
      <text dominantBaseline="middle" textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
        <tspan className="fill-foreground text-xl font-bold" x={viewBox.cx} y={viewBox.cy}>
          {formatCurrency(totalInvestment)}
        </tspan>
        <tspan className="fill-muted-foreground" x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
          Toplam Yatırım
        </tspan>
      </text>
    );
  }
}
