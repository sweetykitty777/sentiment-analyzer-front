import { createFileRoute } from "@tanstack/react-router";
import TextCheck from "@/components/TextCheck";

export const Route = createFileRoute("/")({
  component: TextCheck,
});
