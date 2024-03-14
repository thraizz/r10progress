import { Link } from "react-router-dom";
import { BasePageLayout } from "../components/base/BasePageLayout";
import { dashboardRoutes } from "../routes";
import { useContext, useMemo } from "react";
import { SessionContext } from "../provider/SessionContext";
import { AveragedSwing, calculateAverages } from "../utils/calculateAverages";

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

const Last30DaysAverages = () => {
  const { sessions } = useContext(SessionContext);

  const averages = useMemo(() => calculateAverages(sessions), [sessions]);

  return (
    <div>
      <h3 className="mb-4 text-3xl font-semibold leading-6 text-gray-900">
        Your club averages
      </h3>
      <div className="flex flex-col gap-8">
        {averages.map((average) => (
          <ClubStats average={average} />
        ))}
      </div>
    </div>
  );
};

const ClubStats = ({ average }: { average: AveragedSwing }) => {
  const stats = useMemo(
    () => [
      {
        name: "Carry",
        stat:
          (
            average?.["Carry Distance"] ||
            average?.["Carry-Distanz"] ||
            0
          ).toPrecision(3) + "m",
      },
      {
        name: "Deviation Distance",
        stat:
          (
            average?.["Total Deviation Distance"] ||
            average?.["Gesamtabweichungsdistanz"] ||
            0
          ).toPrecision(3) + "m",
      },
      {
        name: "Smash Factor",
        stat: (average?.["Smash Factor"] || 0).toPrecision(2),
      },
    ],
    [average],
  );
  return (
    <div>
      <div className="flex flex-row gap-2">
        <h4 className="text-lg font-semibold leading-6 text-gray-900">
          {average?.name || "Swing"}
        </h4>
        <p className="text-sm font-normal leading-6 text-gray-900">
          ({average?.count} shots)
        </p>
      </div>
      <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
