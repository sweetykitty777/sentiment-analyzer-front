/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthUploadsImport } from './routes/_auth/uploads'
import { Route as AuthUploadsUploadIdImport } from './routes/_auth/uploads_.$uploadId'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthUploadsRoute = AuthUploadsImport.update({
  path: '/uploads',
  getParentRoute: () => AuthRoute,
} as any)

const AuthUploadsUploadIdRoute = AuthUploadsUploadIdImport.update({
  path: '/uploads/$uploadId',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/uploads': {
      id: '/_auth/uploads'
      path: '/uploads'
      fullPath: '/uploads'
      preLoaderRoute: typeof AuthUploadsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/uploads/$uploadId': {
      id: '/_auth/uploads/$uploadId'
      path: '/uploads/$uploadId'
      fullPath: '/uploads/$uploadId'
      preLoaderRoute: typeof AuthUploadsUploadIdImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthUploadsRoute,
    AuthUploadsUploadIdRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/uploads",
        "/_auth/uploads/$uploadId"
      ]
    },
    "/_auth/uploads": {
      "filePath": "_auth/uploads.tsx",
      "parent": "/_auth"
    },
    "/_auth/uploads/$uploadId": {
      "filePath": "_auth/uploads_.$uploadId.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
