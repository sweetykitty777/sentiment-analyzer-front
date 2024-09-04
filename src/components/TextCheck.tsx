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
import { Badge } from "./ui/badge";

const analyzeSentiment = async (_: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const sentiments = [
    "very positive",
    "positive",
    "neutral",
    "negative",
    "very negative",
  ];
  return sentiments[Math.floor(Math.random() * sentiments.length)];
};

const sentimentColors: Record<string, { bg: string; text: string }> = {
  "very positive": { bg: "bg-green-100", text: "text-green-800" },
  "positive": { bg: "bg-lime-100", text: "text-lime-800" },
  "neutral": { bg: "bg-gray-100", text: "text-gray-800" },
  "negative": { bg: "bg-orange-100", text: "text-orange-800" },
  "very negative": { bg: "bg-red-100", text: "text-red-800" },
};

export default function TextCheck() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setSentiment(null);

    try {
      const result = await analyzeSentiment(text);
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

          {sentiment && (
            <Badge variant="outline"  className={`capitalize rounded-md px-3 py-2 text-sm font-semibold ${
              sentimentColors[sentiment]?.bg || "bg-gray-100"
            } ${sentimentColors[sentiment]?.text || "text-gray-800"}`}>{sentiment}</Badge>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
