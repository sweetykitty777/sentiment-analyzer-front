import { Upload } from "@/models/api";
import { Badge } from "./ui/badge";

export default function UploadStatusBadge({
  status,
}: {
  status: Upload["status"];
}) {
  if (status === "processing" || status === "pending") {
    return <Badge variant="outline">{status}</Badge>;
  } else if (status === "error") {
    return <Badge variant="destructive">{status}</Badge>;
  }
  return <Badge>{status}</Badge>;
}
