import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { SessionProvider } from "./SessionContext.tsx";
import { UserProvider } from "./UserProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </UserProvider>
  </React.StrictMode>,
);
