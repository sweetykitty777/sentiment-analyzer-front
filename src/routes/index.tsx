import { createFileRoute } from "@tanstack/react-router";
import TextCheck from "@/components/pages/TextCheck";

export const Route = createFileRoute("/")({
  component: TextCheck,
});
