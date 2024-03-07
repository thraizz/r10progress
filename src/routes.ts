export const dashboardRoutes = {
  dashboard: "/dashboard",
  goals: "/goals",
  sessions: "/sessions",
  reports: "/reports",
  visualization: "/visualization",
  settings: "/settings",
} as const;

export const routes = {
  ...dashboardRoutes,
  root: "/",
  login: "/login",
};
