import { Link } from "react-router-dom";
import { BasePageLayout } from "../components/base/BasePageLayout";
import { Last30DaysAverages } from "../components/panels/Last30DaysAverages";
import { dashboardRoutes } from "../routes";

export const Dashboard = () => (
  <BasePageLayout>
    <div className="rounded-md bg-white p-4">
      <Last30DaysAverages />
    </div>
    <div className="flex gap-4">
      <Link to={dashboardRoutes.visualization} className="btn">
        Go to visualizations
      </Link>
      <Link to={dashboardRoutes.sessions} className="btn">
        See imported sessions
      </Link>
    </div>
  </BasePageLayout>
);
