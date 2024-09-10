import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DownloadIcon, Share1Icon } from "@radix-ui/react-icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "../ui/button";
import UploadAnalytics from "./UploadAnalytics";

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
        <Tabs defaultValue="analytics">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="entries">Entries</TabsTrigger>
          </TabsList>
          <TabsContent
            value="analytics"
            className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <UploadAnalytics upload={{ id: "123", name: "My Upload" }} />
          </TabsContent>
          <TabsContent value="entries">Entries</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
