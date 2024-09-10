import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "@/components/Navbar";
import { AuthContextProps } from "react-oidc-context";

interface RouterContext {
  auth: AuthContextProps;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Navbar />
      <section className="mx-auto my-3 max-w-screen-lg rounded-sm p-5">
        <Outlet />
      </section>
      <TanStackRouterDevtools />
    </>
  ),
});
