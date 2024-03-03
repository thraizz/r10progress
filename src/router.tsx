import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "./views/Layout";
import { DataView } from "./views/DataView";
import { Authentication } from "./views/Authentication";
import {
  RedirectIfNotLoggedIn,
  RedirectIfSignedIn,
} from "./utils/RedirectIfNotLoggedIn";
import { Goals } from "./views/Goals";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: () => (
      <RedirectIfNotLoggedIn>
        <Layout>
          <Outlet />
        </Layout>
      </RedirectIfNotLoggedIn>
    ),
    ErrorBoundary: () => (
      <div>
        <h1>Something went wrong</h1>
      </div>
    ),
    children: [
      {
        path: "dashboard",
        Component: DataView,
      },
      {
        path: "goals",
        Component: Goals,
      },
    ],
  },
  {
    path: "login",
    id: "login",
    Component: () => (
      <RedirectIfSignedIn>
        <Layout>
          <Authentication />
        </Layout>
      </RedirectIfSignedIn>
    ),
  },
  {
    path: "*",
    Component: () => <Navigate to="/" replace />,
  },
]);
