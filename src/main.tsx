import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { TrackingConsentDialog } from "./components/TrackingConsentDialog";
import "./index.scss";
import { SessionProvider } from "./provider/SessionContext.tsx";
import { SettingsProvider } from "./provider/SettingsContext.tsx";
import { TrackingConsentProvider } from "./provider/TrackingConsentContext";
import { UserProvider } from "./provider/UserContext.tsx";
import { router } from "./router.tsx";

// Redirect to main domain for non-development environments
const MAIN_SITE = "app.r10progress.com";
if (!import.meta.env.DEV && location.host !== MAIN_SITE) {
  window.location.href = `https://${MAIN_SITE}${location.pathname}`;
}

Sentry.init({
  enabled: !import.meta.env.DEV,
  dsn: "https://b922808c8cd418b5c6af64876f77e013@o4504645960138752.ingest.us.sentry.io/4509034783834112",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SettingsProvider>
        <SessionProvider>
          <TrackingConsentProvider>
            <RouterProvider router={router} />
            <TrackingConsentDialog />
          </TrackingConsentProvider>
        </SessionProvider>
      </SettingsProvider>
    </UserProvider>
  </React.StrictMode>,
);
