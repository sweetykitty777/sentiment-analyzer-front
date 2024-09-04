import React, { useState } from "react";
// import { Label } from "@/components/ui/label";
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

// import axios from "axios";

// Simulated sentiment analysis function
const analyzeSentiment = async (_: string): Promise<string> => {
  // Simulate API call delay
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

// Sentiment color mapping
const sentimentColors: Record<string, { bg: string; text: string }> = {
  "very positive": { bg: "bg-green-100", text: "text-green-800" },
  positive: { bg: "bg-lime-100", text: "text-lime-800" },
  neutral: { bg: "bg-gray-100", text: "text-gray-800" },
  negative: { bg: "bg-orange-100", text: "text-orange-800" },
  "very negative": { bg: "bg-red-100", text: "text-red-800" },
};

export default function TextCheck() {
  // const [text, setText] = useState<string>("")
  // const [result, setResult] = useState<string>("")

  // function checkSentiment(text: string) {
  //   axios
  //     .get(`http://localhost:8000/sentiment_check?text=${text}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setResult(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // class SentimentPredictLevel(Enum):
  //   VERY_NEGATIVE = 0
  //   NEGATIVE = 1
  //   NEUTRAL = 2
  //   POSITIVE = 3
  //   VERY_POSITIVE = 4

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

  // function mapResult(value: string) {
  //   switch (value) {
  //     case "VERY_NEGATIVE":
  //       return "Very Negative";
  //     case "NEGATIVE":
  //       return "Negative";
  //     case "NEUTRAL":
  //       return "Neutral";
  //     case "POSITIVE":
  //       return "Positive";
  //     case "VERY_POSITIVE":
  //       return "Very Positive";
  //   }
  // }

  return (
    <Card className="mx-auto w-full max-w-md">
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
            <div
              className={`rounded-md px-3 py-2 text-sm font-semibold ${
                sentimentColors[sentiment]?.bg || "bg-gray-100"
              } ${sentimentColors[sentiment]?.text || "text-gray-800"}`}
            >
              Sentiment: <span className="capitalize">{sentiment}</span>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>

    // <div className="grid w-full gap-1.5">
    //   <Label htmlFor="message">C</Label>
    //   <Textarea placeholder="Type your message here." id="message" />
    // </div>

    // <div className="flex max-w-md flex-col mx-auto">
    //   <h1 className="text-lg font-bold">
    //     Check Text Sentiment
    //   </h1>
    //   <div className="mb-2 block">
    //     <Label htmlFor="comment" value="Your message" />
    //   </div>
    //   <Textarea id="comment" placeholder="Enter a text..." required rows={4} onChange={(e) => setText(e.target.value)} />
    //   <span className="text-2xl font-bold text-green-500 text-center">{mapResult(result)}</span>
    //   <Button type="submit" onClick={() => checkSentiment(text)} className="mt-2">Check Sentiment</Button>
    // </div>
  );
}
