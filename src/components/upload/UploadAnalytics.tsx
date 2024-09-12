import {
  Pie,
  PieChart,
  BarChart,
  YAxis,
  XAxis,
  Bar,
  LabelList,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { UploadFull } from "@/models/api";
import { useEffect, useState } from "react";
import UploadStatusBadge from "../UploadStatusBadge";

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

type UploadAnalyticsValues = {
  sum_positive: number;
  sum_neutral: number;
  sum_negative: number;

  very_positive: number;
  positive: number;
  neutral: number;
  negative: number;
  very_negative: number;

  positive_percentage: number;
  neutral_percentage: number;
  negative_percentage: number;
};

export default function UploadAnalytics({ upload }: { upload: UploadFull }) {
  const [stats, setStats] = useState<UploadAnalyticsValues>();
  const [pieData, setPieData] = useState<
    { sentiment: string; count: number; fill: string }[]
  >([]);

  useEffect(() => {
    const sum_positive = upload.entries.filter(
      (entry) =>
        entry.sentiment === "positive" || entry.sentiment === "very_positive",
    ).length;

    const sum_neutral = upload.entries.filter(
      (entry) => entry.sentiment === "neutral",
    ).length;

    const sum_negative = upload.entries.filter(
      (entry) =>
        entry.sentiment === "negative" || entry.sentiment === "very_negative",
    ).length;

    const very_positive = upload.entries.filter(
      (entry) => entry.sentiment === "very_positive",
    ).length;
    const positive = upload.entries.filter(
      (entry) => entry.sentiment === "positive",
    ).length;
    const neutral = upload.entries.filter(
      (entry) => entry.sentiment === "neutral",
    ).length;
    const negative = upload.entries.filter(
      (entry) => entry.sentiment === "negative",
    ).length;
    const very_negative = upload.entries.filter(
      (entry) => entry.sentiment === "very_negative",
    ).length;

    const positive_percentage = (sum_positive / upload.entries.length) * 100;
    const neutral_percentage = (sum_neutral / upload.entries.length) * 100;
    const negative_percentage = (sum_negative / upload.entries.length) * 100;

    setStats({
      sum_positive,
      sum_neutral,
      sum_negative,
      very_positive,
      positive,
      neutral,
      negative,
      very_negative,
      positive_percentage,
      neutral_percentage,
      negative_percentage,
    });

    const pie = [];
    if (positive > 0) {
      pie.push({
        sentiment: "positive",
        count: positive,
        fill: "var(--color-positive)",
      });
    }
    if (neutral > 0) {
      pie.push({
        sentiment: "neutral",
        count: neutral,
        fill: "var(--color-neutral)",
      });
    }
    if (negative > 0) {
      pie.push({
        sentiment: "negative",
        count: negative,
        fill: "var(--color-negative)",
      });
    }
    if (very_positive > 0) {
      pie.push({
        sentiment: "very_positive",
        count: very_positive,
        fill: "var(--color-very_positive)",
      });
    }
    if (very_negative > 0) {
      pie.push({
        sentiment: "very_negative",
        count: very_negative,
        fill: "var(--color-very_negative)",
      });
    }
    setPieData(pie);
  }, [upload]);

  if (!stats) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Entries Count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-semibold">{upload.entries.length}</div>
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
              <UploadStatusBadge status={upload.status} />
            </div>
            <div>
              <span className="font-semibold">Created at:</span>{" "}
              {upload.created_at}
            </div>
            <div>
              <span className="font-semibold">Uploaded by:</span>{" "}
              {upload.created_by.email}
            </div>
          </div>
        </CardContent>
      </Card>
      {upload.status === "ready" && (
        <>
          <Card className="flex flex-col">
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
                      value: stats.sum_positive,
                      label: stats.sum_positive,
                      fill: "var(--color-positive)",
                    },
                    {
                      activity: "neutral",
                      value: stats.sum_neutral,
                      label: stats.sum_neutral,
                      fill: "var(--color-neutral)",
                    },
                    {
                      activity: "negative",
                      value: stats.sum_negative,
                      label: stats.sum_negative,
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
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {stats.positive_percentage.toFixed(1)}
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Neutral</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {stats.neutral_percentage.toFixed(1)}
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Negative</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {stats.negative_percentage.toFixed(1)}
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
                className="mx-auto max-h-[230px] pb-5 pt-5 [&_.recharts-pie-label-text]:fill-foreground"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={pieData}
                    dataKey="count"
                    label
                    nameKey="sentiment"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
