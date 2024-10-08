import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DownloadIcon } from "@radix-ui/react-icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoaderData } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import UploadEntries from "../components/upload/UploadsEntries";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { downloadUpload } from "@/api";
import { AccessManagementDialogComponent } from "../components/AccessManagementDialog";
import { usePrivateAxios } from "@/hooks";
import UploadInfo from "../components/upload/UploadInfo";

export default function Upload() {
  const axios = usePrivateAxios();
  const upload = useLoaderData({ from: "/_auth/uploads/$uploadId" });

  async function downloadFile(extension: "xlsx" | "csv") {
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

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-5 space-y-0">
        <CardTitle>{upload.name}</CardTitle>
        <div className="flex flex-wrap gap-2">
          {upload.status === "ready" && (
            <DownloadButton onClick={downloadFile} />
          )}
          <AccessManagementDialogComponent upload={upload} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analytics">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            {upload.status === "ready" && upload.entries.length > 1 && (
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
function DownloadButton({
  onClick,
}: {
  onClick: (extension: "xlsx" | "csv") => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <DownloadIcon className="mr-2 h-4 w-4" /> Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => onClick("xlsx")}
          className="cursor-pointer"
        >
          .xlsx
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onClick("csv")}
          className="cursor-pointer"
        >
          .csv
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
