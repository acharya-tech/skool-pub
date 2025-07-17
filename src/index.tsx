import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { ErrorBoundary } from "./routes/components";
import { applicationMainRoutes } from "./routes/routes";

dayjs.extend(relativeTime);
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: applicationMainRoutes,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
