import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DownloadIcon, Share1Icon } from "@radix-ui/react-icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLoaderData } from "@tanstack/react-router";
import { Button, buttonVariants } from "../ui/button";
import UploadAnalytics from "./UploadAnalytics";
import UploadEntries from "./UploadsEntries";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "react-oidc-context";
import { downloadUpload, FileDownloadExtension } from "@/api";



export default function Upload() {
  const auth = useAuth();
  const upload = useLoaderData({ from: "/_auth/uploads/$uploadId" });

  async function downloadFile(extension: FileDownloadExtension) {
    const data = await downloadUpload({ auth, uploadId: upload.id, extension });
    const name = `${upload.name.replace(".", "-")}-results.${extension}`
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
  }

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-5 space-y-0">
        <CardTitle>{upload.name}</CardTitle>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <DownloadIcon className="mr-2 h-4 w-4" /> Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => downloadFile("xlsx")} className="cursor-pointer">.xlsx</DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadFile("csv")}  className="cursor-pointer">.csv</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
            <UploadAnalytics upload={upload} />
          </TabsContent>
          <TabsContent value="entries">
            <UploadEntries upload={upload} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
