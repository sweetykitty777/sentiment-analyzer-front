import UploadsList from "@/components/pages/UploadsList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/uploads")({
  component: UploadsList,
});
