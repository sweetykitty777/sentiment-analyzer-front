import { fetchUploadFull } from "@/api";
import Upload from "@/pages/Upload";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/uploads/$uploadId")({
  loader: async ({ context: { axios }, params: { uploadId } }) =>
    await fetchUploadFull({ client: axios, uploadId: uploadId }),
  component: Upload,
});
