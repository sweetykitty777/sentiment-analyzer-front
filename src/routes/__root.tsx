import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "@/components/navbar/Navbar";

export const Route = createRootRoute({
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
