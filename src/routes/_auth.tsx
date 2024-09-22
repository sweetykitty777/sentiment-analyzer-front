import { createFileRoute, Outlet } from "@tanstack/react-router";
import { withAuthenticationRequired } from "react-oidc-context";

export const Route = createFileRoute("/_auth")({
  component: withAuthenticationRequired(() => <Outlet />, {
    OnRedirecting: () => (
      <div className="text-center">Redirecting to login page</div>
    ),
  }),
  beforeLoad: async ({context: {auth}}) => {
    await auth;
  }
});
