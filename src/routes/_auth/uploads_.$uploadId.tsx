import Upload from "@/components/upload/Upload";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/uploads/$uploadId")({
  component: Upload,
});
