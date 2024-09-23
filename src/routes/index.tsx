import { createFileRoute } from "@tanstack/react-router";
import TextCheck from "@/pages/TextCheck";

export const Route = createFileRoute("/")({
  component: TextCheck,
});
