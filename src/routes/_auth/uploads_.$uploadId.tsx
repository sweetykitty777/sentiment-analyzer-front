import Upload from "@/components/upload/Upload";
import { createFileRoute } from "@tanstack/react-router";
import { fetchUploadFull } from "@/api";

export const Route = createFileRoute("/_auth/uploads/$uploadId")({
  component: Upload,
  loader: async ({ params, context: { auth } }) =>
    await fetchUploadFull({ auth, uploadId: params.uploadId }),
});
