import { fetchUploads } from "@/api";
import UploadsList from "@/pages/UploadsList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/uploads")({
  component: UploadsList,
  loader: async ({ context: { axios } }) =>
    await fetchUploads({ client: axios }),
});
