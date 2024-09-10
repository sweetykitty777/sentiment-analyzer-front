import { Upload, UploadEntrySentiment } from "@/models/upload";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, BarChart, YAxis, XAxis, Bar, RadialBar, PolarAngleAxis, RadialBarChart, LabelList } from "recharts";
import { Badge } from "../ui/badge";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

const chartData = [
  {
    browser: "very_positive",
    visitors: 275,
    fill: "var(--color-very_positive)",
  },
  { browser: "positive", visitors: 200, fill: "var(--color-positive)" },
  { browser: "neutral", visitors: 187, fill: "var(--color-neutral)" },
  { browser: "negative", visitors: 173, fill: "var(--color-negative)" },
  {
    browser: "very_negative",
    visitors: 90,
    fill: "var(--color-very_negative)",
  },
];

const chartConfig = {
  visitors: {
    label: "Sentiments",
  },
  very_positive: {
    label: "Very Positive",
    color: "hsl(var(--chart-1))",
  },
  positive: {
    label: "Positive",
    color: "hsl(var(--chart-2))",
  },
  neutral: {
    label: "Neutral",
    color: "hsl(var(--chart-3))",
  },
  negative: {
    label: "Negative",
    color: "hsl(var(--chart-4))",
  },
  very_negative: {
    label: "Very Negative",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export const description = "A pie chart with a label";

export default function UploadAnalytics({ upload }: { upload: Upload }) {
  return (
    <>
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
              <span className="font-semibold">Uploaded on:</span> 2021-10-10
            </div>
            <div>
              <span className="font-semibold">Uploaded by:</span> Olga
              Shavochkina
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
          className="flex flex-col"
        >
          <CardContent className="flex gap-4 p-4 pb-2">
            <ChartContainer
              config={{
                positive: {
                  label: "Positive",
                  color: "hsl(var(--chart-1))",
                },
                neutral: {
                  label: "Neutral",
                  color: "hsl(var(--chart-2))",
                },
                negative: {
                  label: "Negative",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                  {
                    activity: "positive",
                    value: 8,
                    label: "8",
                    fill: "var(--color-positive)",
                  },
                  {
                    activity: "neutral",
                    value: 46,
                    label: "46",
                    fill: "var(--color-neutral)",
                  },
                  {
                    activity: "negative",
                    value: 160,
                    label: "130",
                    fill: "var(--color-negative)",
                  },
                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Positive</div>
                <div className="text-green-700 flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  53
                  <span className="text-sm font-normal text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Neutral</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  73
                  <span className="text-sm font-normal text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Negative</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  14
                  <span className="text-sm font-normal text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Texts by Sentiments</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto max-h-[170px] pt-5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
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
      </Card>
    </>
  );
}
