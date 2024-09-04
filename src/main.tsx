import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// import TextCheck from './components/TextCheck.tsx';
// // import FileView from './components/file/FileView.tsx';
// import UploadsList from './components/UploadsList.tsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <TextCheck />,
//   },
//   // {
//   //   path: "/files/:fileId",
//   //   element: <FileView />,
//   // },
//   {
//     path: "/uploads/",
//     element: <UploadsList />,
//   },
// ]);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App>
//       <RouterProvider router={router} />
//     </App>
//   </StrictMode>,
// )

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
