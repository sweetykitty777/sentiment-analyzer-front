/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OIDC_REDIRECT_URI: string
  }
  
interface ImportMeta {
readonly env: ImportMetaEnv
}
