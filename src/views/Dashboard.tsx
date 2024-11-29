import { Link } from "react-router-dom";
import { BasePageLayout } from "../components/base/BasePageLayout";
import { ClubDistances } from "../components/panels/ClubDistances.tsx";
import { SettingsForm } from "../components/panels/SettingsForm";
import { useSelectedSessions } from "../hooks/useSelectedSessions";
import { dashboardRoutes } from "../routes";

export const Dashboard = () => (
  <BasePageLayout>
    <SettingsForm />
    <NoSessionSelectedHint />
    <div className="rounded-md bg-white p-4">
      <ClubDistances />
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

const NoSessionSelectedHint = () => {
  const selectedSessions = useSelectedSessions();
  if (Object.keys(selectedSessions).length === 0) {
    return (
      <div className="rounded-md bg-yellow-100 p-4">
        <p className="text-lg font-semibold text-yellow-800">
          No sessions selected
        </p>
        <p className="text-sm text-yellow-800">
          You have not selected any sessions. Please select at least one session
          to view your averages.
        </p>
      </div>
    );
  }

  return null;
};
