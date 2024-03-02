import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.scss";
import { SessionProvider } from "./provider/SessionContext.tsx";
import { UserProvider } from "./provider/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </UserProvider>
  </React.StrictMode>,
);
