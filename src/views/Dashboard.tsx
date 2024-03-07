import { Link } from "react-router-dom";
import { BasePageLayout } from "../components/base/BasePageLayout";
import { dashboardRoutes } from "../routes";

export const Dashboard = () => (
  <BasePageLayout>
    <h2 className="text-2xl font-bold">Dashboard</h2>
    <p className="text-sm text-gray-600">Welcome to the dashboard.</p>
    <div className="flex gap-2 text-lg font-semibold [&>.active]:underline ">
      <Link to={dashboardRoutes.visualization} className="btn">
        Go to visualizations
      </Link>
      <Link to={dashboardRoutes.sessions} className="btn">
        See imported sessions
      </Link>
    </div>
  </BasePageLayout>
);
