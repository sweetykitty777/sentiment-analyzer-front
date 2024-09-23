import { useAuth } from "react-oidc-context";
import { client } from "./api";
import { useEffect } from "react";

// This hook returns an axios instance with the Authorization header set to the user's access token.
// Used in all calls to backend
export function usePrivateAxios() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.user) {
      return;
    }

    client.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${auth!.user!.access_token}`;
      return config;
    });
  }, [auth]);

  return client;
}
