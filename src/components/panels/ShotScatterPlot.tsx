import { useContext, useEffect, useMemo, useState } from "react";
import { SessionContext } from "../../provider/SessionContext.tsx";
import {
  GolfSwingData,
  nonNumericGolfSwingDataKeys,
} from "../../types/GolfSwingData";
import { getDayFromRow } from "../../utils/date.utils";
import { getAllDataFromSession } from "../../utils/getAllDataFromSession";
import { getClubName } from "../../utils/golfSwingData.helpers.ts";
import { parseDate } from "../../utils/utils";
import { BaseLabel } from "../base/BaseLabel.tsx";
import { BaseListbox } from "../base/BaseListbox.tsx";
import { PointWithDate } from "../base/chartOptions.ts";
import { ShotScatterPlotGraph } from "./graphs/ShotScatterPlotGraph.tsx";

export const ShotScatterPlot = () => {
  const { sessions } = useContext(SessionContext);
  const [club, setClub] = useState<string | null>(null);
  const combinedClubData = useCombinedClubData();

  const [xField, setXField] = useState<keyof GolfSwingData>("Backspin");
  const [yField, setYField] = useState<keyof GolfSwingData>("Carry Distance");

  const fields: (keyof GolfSwingData)[] = useMemo(() => {
    const firstSession = Object.values(sessions)?.[0];
    const firstResult = firstSession?.results?.[0];
    const fields = firstResult ? Object.keys(firstResult) : [];
    const nonNumericFields = fields.filter(
      (field) =>
        !nonNumericGolfSwingDataKeys.includes(field as keyof GolfSwingData),
    );

    return nonNumericFields.sort((a, b) =>
      a.localeCompare(b),
    ) as (keyof GolfSwingData)[];
  }, [sessions]);

  useEffect(() => {
    if (fields.length > 0) {
      setXField(fields[0]);
      setYField(fields[1]);
    }
  }, [fields]);

  const chartData: PointWithDate[] = useMemo(() => {
    if (sessions) {
      let clubData = getAllDataFromSession(sessions);
      if (club && club !== "All" && combinedClubData[club]) {
        clubData = combinedClubData[club];
      }
      return clubData.map((row) => ({
        x: row[xField as keyof GolfSwingData],
        y: row[yField as keyof GolfSwingData],
        date: parseDate(getDayFromRow(row)),
      }));
    }
    return [];
  }, [sessions, xField, yField, combinedClubData, club]);

  if (!chartData) return null;

  return (
    <div className="flex h-auto flex-col gap-3 rounded-xl bg-white p-4">
      <h4 className="text-xl font-bold text-gray-800">Shot Scatter Plot</h4>
      <p className="mb-4 text-gray-600">
        Use this graph to visualize the combination of any two metrics.
        <br />
        More recent data points are colored darker. Hover over a data point to
        see the exact values.
      </p>
      <div className="mb-6 flex flex-col gap-2 md:flex-row">
        <div>
          <BaseLabel>Choose the fields to display</BaseLabel>
          <div className="flex flex-col gap-4 md:flex-row">
            <BaseListbox
              options={fields}
              setOption={(option) => setXField(option as keyof GolfSwingData)}
              value={xField}
              valueText={xField}
            />
            <BaseListbox
              options={fields}
              setOption={(option) => setYField(option as keyof GolfSwingData)}
              value={yField}
              valueText={yField}
            />
          </div>
        </div>
        <div className="h-auto w-0 border-l-2 border-gray-300"></div>
        <div>
          <BaseLabel>Choose the club to display</BaseLabel>
          <div className="flex flex-row gap-4">
            <BaseListbox
              options={[
                ...Object.keys(combinedClubData).filter((v) => !!v),
                "All",
              ]}
              setOption={setClub}
              value={club ?? ""}
              valueText={club ?? "All"}
            />
          </div>
        </div>
      </div>
      <ShotScatterPlotGraph
        yField={yField}
        xField={xField}
        chartData={chartData}
      />
    </div>
  );
};
const useCombinedClubData = () => {
  const { sessions } = useContext(SessionContext);
  return useMemo(() => {
    if (sessions) {
      const resultsByClub: { [key: string]: GolfSwingData[] } = {};

      Object.values(sessions).forEach((session) => {
        session.results.forEach((shot) => {
          const clubName = getClubName(shot);
          if (clubName) {
            if (!resultsByClub[clubName]) {
              resultsByClub[clubName] = [];
            }
            resultsByClub[clubName].push(shot);
          }
        });
      });

      return resultsByClub;
    }
    return {};
  }, [sessions]);
};
