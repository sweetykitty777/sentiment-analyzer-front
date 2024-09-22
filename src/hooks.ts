import { useAuth } from "react-oidc-context";
import { client } from "./api";
import { useEffect } from "react";

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