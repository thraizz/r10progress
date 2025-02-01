export const dashboardRoutes = {
  dashboard: "/dashboard",
  goals: "/goals",
  sessions: "/sessions",
  reports: "/reports",
  visualization: "/visualization",
  settings: "/settings",
  aiAnalysis: "/ai-analysis",
  aiReport: "/ai-analysis/:reportId",
} as const;

export const routes = {
  ...dashboardRoutes,
  root: "/",
  login: "/login",
};
