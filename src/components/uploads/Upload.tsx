import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DownloadIcon, Share1Icon } from "@radix-ui/react-icons";

export const description = "A pie chart with a label";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
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
} satisfies ChartConfig;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "../ui/button";
export default function Upload() {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-5 space-y-0">
        <CardTitle>My Uploads</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Link className={buttonVariants({ variant: "default" }) + "self-end"}>
            <DownloadIcon className="mr-2 h-4 w-4" /> Download .xlsx
          </Link>
          <Link className={buttonVariants({ variant: "outline" })}>
            <Share1Icon className="mr-2 h-4 w-4" /> Share
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs>
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="entries">Entries</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics">Analytics</TabsContent>
          <TabsContent
            value="entries"
            className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            {/* Card with count of entries */}
            <Card>
              <CardHeader>
                <CardTitle>Entries Count</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-semibold">100</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Status:</span>{" "}
                    <Badge>Processed</Badge>
                  </div>
                  <div>
                    <span className="font-semibold">Uploaded on:</span>{" "}
                    2021-10-10
                  </div>
                  <div>
                    <span className="font-semibold">Uploaded by:</span> Olga
                    Shavochkina
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 flex flex-col md:col-span-2">
              <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={chartData}
                      dataKey="visitors"
                      label
                      nameKey="browser"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
