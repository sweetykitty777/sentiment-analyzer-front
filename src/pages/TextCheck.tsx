import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { checkText } from "@/api";
import { mapSentiment } from "../components/upload/UploadsEntries";
import { usePrivateAxios } from "@/hooks";

export default function TextCheck() {
  const client = usePrivateAxios();

  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setSentiment(null);

    try {
      const result = await checkText({ client, text });
      setSentiment(result);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      setSentiment("Error occurred during analysis");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="mx-auto max-w-screen-sm">
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>
          Enter your text to analyze its sentiment.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px]"
            required
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            type="submit"
            disabled={isAnalyzing || text.trim().length === 0}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
          </Button>
          {sentiment && <SentimentBadge sentiment={sentiment} />}
        </CardFooter>
      </form>
    </Card>
  );
}

const sentimentColors: Record<string, { bg: string; text: string }> = {
  very_positive: { bg: "bg-green-100", text: "text-green-800" },
  positive: { bg: "bg-lime-100", text: "text-lime-800" },
  neutral: { bg: "bg-gray-100", text: "text-gray-800" },
  negative: { bg: "bg-orange-100", text: "text-orange-800" },
  very_negative: { bg: "bg-red-100", text: "text-red-800" },
};

function SentimentBadge({ sentiment }: { sentiment: string }): React.ReactNode {
  return (
    <Badge
      variant="outline"
      className={`rounded-md px-3 py-2 text-sm font-semibold capitalize ${sentimentColors[sentiment]?.bg || "bg-gray-100"} ${sentimentColors[sentiment]?.text || "text-gray-800"}`}
    >
      {mapSentiment(sentiment).text}
    </Badge>
  );
}
