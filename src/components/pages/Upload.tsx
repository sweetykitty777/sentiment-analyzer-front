import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DownloadIcon } from "@radix-ui/react-icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoaderData } from "@tanstack/react-router";
import { Button } from "../ui/button";
import UploadEntries from "../upload/UploadsEntries";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { downloadUpload } from "@/api";
import { AccessManagementDialogComponent } from "../AccessManagementDialog";
import { usePrivateAxios } from "@/hooks";
import UploadInfo from "../upload/UploadInfo";

export default function Upload() {
  const axios = usePrivateAxios();
  const upload = useLoaderData({ from: "/_auth/uploads/$uploadId" });

  async function downloadFile(extension: "xlsx" | "csv") {
    if (!upload) return;

    const data = await downloadUpload({
      client: axios,
      uploadId: upload.id,
      extension,
    });
    const name = `${upload.name.replace(".", "-")}-results.${extension}`;
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
  }

  const isOneEntry = upload?.entries.length === 1;

  if (!upload) return null;
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-5 space-y-0">
        <CardTitle>{upload.name}</CardTitle>
        <div className="flex flex-wrap gap-2">
          {upload.status === "ready" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <DownloadIcon className="mr-2 h-4 w-4" /> Download
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => downloadFile("xlsx")}
                  className="cursor-pointer"
                >
                  .xlsx
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => downloadFile("csv")}
                  className="cursor-pointer"
                >
                  .csv
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <AccessManagementDialogComponent upload={upload} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analytics">
          <TabsList>
            <TabsTrigger value="analytics">
              {isOneEntry ? "General" : "Analytics"}
            </TabsTrigger>
            {upload.status === "ready" && !isOneEntry && (
              <TabsTrigger value="entries">Entries</TabsTrigger>
            )}
          </TabsList>
          <TabsContent
            value="analytics"
            className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <UploadInfo upload={upload} />
          </TabsContent>
          <TabsContent value="entries">
            <UploadEntries upload={upload} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
