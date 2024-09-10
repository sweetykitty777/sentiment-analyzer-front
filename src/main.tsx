import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { AuthProvider, useAuth } from "react-oidc-context";
import { User, WebStorageStateStore } from "oidc-client-ts";

import "./index.css";

const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const onSigninCallback = (_user: User | void): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const oidcConfig = {
  authority: "https://lemur-15.cloud-iam.com/auth/realms/sentiment-analyzer/",
  client_id: "sentiment-analyzer-front",
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  onSigninCallback: onSigninCallback,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider {...oidcConfig}>
        <InnerApp />
      </AuthProvider>
    </StrictMode>,
  );
}
