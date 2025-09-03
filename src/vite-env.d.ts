/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_BASE_PATH: string
  readonly VITE_DEV_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}