import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "@/components/navbar/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <section className="mx-auto max-w-screen-lg p-5 my-3 rounded-sm">
        <Outlet />
      </section>
      <TanStackRouterDevtools />
    </>
  ),
});
