import React, { useState, useEffect } from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

import { Table, Button } from "flowbite-react";
import FileResults from "./FileResults";
import FileAnalysis from "./FileAnalysis";

interface SentimentCheckResult {
  text: string;
  sentiment: string;
}

export default function FileView() {
  const [resultList, setResultList] = useState<SentimentCheckResult[]>([]);

  useEffect(() => {
    setResultList([
      { text: "I love you", sentiment: "positive" },
      { text: "I hate you", sentiment: "negative" },
      { text: "I am neutral", sentiment: "neutral" },
    ]);
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <h1 className="text-2xl font-semibold">test_file.xlsx</h1>
        <Button gradientDuoTone="purpleToBlue">Download Exel</Button>
        <Button gradientDuoTone="purpleToBlue" outline>
          Share with...
        </Button>
      </div>

      <Tabs aria-label="Tabs with underline" variant="underline">
        <Tabs.Item active title="Profile" icon={HiUserCircle}>
          <FileResults resultList={resultList} />
        </Tabs.Item>
        <Tabs.Item title="Dashboard" icon={MdDashboard}>
          <FileAnalysis />
        </Tabs.Item>
      </Tabs>
    </>
  );
}
