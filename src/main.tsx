import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { SessionProvider } from "./provider/SessionContext.tsx";
import { SettingsProvider } from "./provider/SettingsContext.tsx";
import { UserProvider } from "./provider/UserContext.tsx";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SettingsProvider>
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </SettingsProvider>
    </UserProvider>
  </React.StrictMode>,
);
