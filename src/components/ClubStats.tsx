import { useMemo } from "react";
import { AveragedSwing } from "../utils/calculateAverages";

export const ClubStats = ({ average }: { average: AveragedSwing }) => {
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
        name: "Total",
        stat:
          (
            average?.["Total Distance"] ||
            average?.["Gesamtstrecke"] ||
            0
          ).toPrecision(3) + "m",
      },
      //   {
      //     name: "Deviation Distance",
      //     stat:
      //       (
      //         average?.["Total Deviation Distance"] ||
      //         average?.["Gesamtabweichungsdistanz"] ||
      //         0
      //       ).toPrecision(3) + "m",
      //   },
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
