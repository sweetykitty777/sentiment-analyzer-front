import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthContextProps, AuthProvider, useAuth } from "react-oidc-context";
import { User, WebStorageStateStore } from "oidc-client-ts";

import "./index.css";
import { usePrivateAxios } from "./hooks";

const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
    axios: undefined!,
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

let resolveAuthClient: (client: AuthContextProps) => void;
const authClient: Promise<AuthContextProps> = new Promise(
  (resolve) => { resolveAuthClient = resolve }
);

function InnerApp() {
  const auth = useAuth();
  const axios = usePrivateAxios();

  useEffect(() => {
    if (auth.isLoading) return;

    resolveAuthClient(auth);
  }, [auth, auth.isLoading]);
  
  return <RouterProvider router={router} context={{ auth: authClient, axios }} />;
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
