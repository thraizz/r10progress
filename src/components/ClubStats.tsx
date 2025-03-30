import { useMemo } from "react";
import { useUnit } from "../hooks/useUnit";
import { AveragedSwing } from "../utils/calculateAverages";
import {
  getApexHeight,
  getBackspin,
  getCarryDistance,
  getSmashFactor,
  getTotalDistance,
} from "../utils/golfSwingData.helpers";

export const ClubStats = ({ average }: { average: AveragedSwing }) => {
  const unit = useUnit();
  const stats = useMemo(
    () => [
      {
        name: "Carry",
        stat: getCarryDistance(average).toPrecision(3) + unit,
      },
      {
        name: "Total",
        stat: (getTotalDistance(average) || 0).toPrecision(3) + unit,
      },
      {
        name: "Smash Factor",
        stat: (getSmashFactor(average) || 0).toPrecision(3),
      },
      {
        name: "Deviation Tendance",
        stat: getDeviationString(average, unit),
      },
      {
        name: "Apex Height",
        stat: (getApexHeight(average) || 0).toPrecision(3) + unit,
      },
      {
        name: "Backspin",
        stat: Number(getBackspin(average) || 0).toFixed(),
      },
    ],
    [average, unit],
  );
  console.log(average);
  return (
    <div className="rounded-lg bg-white p-2 px-4 py-5 shadow">
      <div className="flex flex-row gap-2 ">
        <h4 className="text-lg font-semibold leading-6 text-gray-900">
          {average?.name || "Swing"}
        </h4>
      </div>
      <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg border-2 border-gray-100 px-4 py-5 sm:p-6"
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

const getDeviationString = (average: AveragedSwing, unit: string) => {
  const deviation =
    average?.["Total Deviation Distance"] ||
    average?.["Gesamtabweichungsdistanz"] ||
    0;

  return deviation > 0
    ? `${deviation}${unit} left`
    : `${Math.abs(deviation)}${unit} right`;
};
