import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "./views/Layout";
import { Visualization } from "./views/Visualization";
import { Authentication } from "./views/Authentication";
import {
  RedirectIfNotLoggedIn,
  RedirectIfSignedIn,
} from "./utils/RedirectIfNotLoggedIn";
import { Goals } from "./views/Goals";
import { NewLayout } from "./views/NewLayout";
import { routes } from "./routes";
import { Sessions } from "./views/Sessions";
import { Reports } from "./views/Reports";
import { Settings } from "./views/Settings";
import { Dashboard } from "./views/Dashboard";

export const router = createBrowserRouter([
  {
    id: "root",
    path: routes.root,
    Component: () => (
      <RedirectIfNotLoggedIn>
        <NewLayout>
          <Outlet />
        </NewLayout>
      </RedirectIfNotLoggedIn>
    ),
    children: [
      {
        path: routes.dashboard,
        Component: Dashboard,
      },
      {
        path: routes.goals,
        Component: Goals,
      },
      {
        path: routes.sessions,
        Component: Sessions,
      },
      {
        path: routes.reports,
        Component: Reports,
      },
      {
        path: routes.visualization,
        Component: Visualization,
      },
      {
        path: routes.settings,
        Component: Settings,
      },
    ],
  },
  {
    path: routes.login,
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
