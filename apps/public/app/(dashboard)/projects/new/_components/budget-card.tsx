"use client";

import * as React from "react";
import {Pie, PieChart} from "recharts";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

const chartData = [
  {browser: "chrome", visitors: 275, fill: "var(--color-chrome)"},
  {browser: "safari", visitors: 200, fill: "var(--color-safari)"},
  {browser: "firefox", visitors: 287, fill: "var(--color-firefox)"},
  {browser: "edge", visitors: 173, fill: "var(--color-edge)"},
  {browser: "other", visitors: 190, fill: "var(--color-other)"},
];

const chartConfig: ChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export default function BudgetCard() {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-sm p-2 shadow-none">
      <CardHeader className="px-4 pb-2 pt-4">
        <CardTitle className="text-center text-lg font-medium">Create and share your budget.</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm ">
          Transparency can build trust with your backers—and increase your odds of being featured on Kickstarter.
        </p>

        {/* Recharts Pie Chart */}
        <div className="flex justify-center">
          <div className="h-48 w-48">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}></Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>

        <p className="text-sm">
          Generate a spreadsheet below, and we&apos;ll help you transform your details into a custom budget graphic. You
          can easily publish it on your project page and share it with your potential backers.
        </p>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Your email
          </label>
          <Input id="email" type="email" placeholder="name@example.com" className="w-full p-4 text-sm" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-start">
        <Button className="">Generate my spreadsheet</Button>
      </CardFooter>
    </Card>
  );
}
