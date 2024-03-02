import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { SessionProvider } from "./provider/SessionContext.tsx";
import { UserProvider } from "./provider/UserContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </UserProvider>
  </React.StrictMode>,
);
