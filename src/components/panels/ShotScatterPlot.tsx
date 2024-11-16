import { useContext, useMemo, useState } from "react";
import { PlainObject, Vega, VisualizationSpec } from "react-vega";
import { SessionContext } from "../../provider/SessionContext";
import {
  GolfSwingData,
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "../../types/GolfSwingData";

import { getDayFromRow } from "../../utils/date.utils";
import { getAllDataFromSession } from "../../utils/getAllDataFromSession";
import { parseDate } from "../../utils/utils";
import { BaseLabel } from "../base/BaseLabel";
import { BaseListbox } from "../base/BaseListbox";
import { getClubName } from "../../utils/golfSwingData.helpers.ts";

export const ShotScatterPlot = () => {
  const { sessions } = useContext(SessionContext);
  const [club, setClub] = useState<string | null>(null);
  // This combines all shots with the same club from all sessions
  const combinedClubData = useCombinedClubData();

  const [xField, setXField] = useState("Backspin");
  const [yField, setYField] = useState("Smash Factor");

  const fields = useMemo(() => {
    const firstSession = Object.values(sessions)?.[0];
    const firstResult = firstSession?.results?.[0];
    const fields = firstResult ? Object.keys(firstResult) : [];
    return fields.sort((a, b) => a.localeCompare(b));
  }, [sessions]);

  // create the spec for the scatter plot
  const spec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { name: "table" },
    mark: "point",
    height: "container",
    width: "container",
    autosize: { resize: true },
    encoding: {
      x: {
        axis: {
          labelExpr: golfSwingDataKeysInMeters.includes(
            xField as keyof GolfSwingData,
          )
            ? "datum.value + ' m'"
            : golfSwingDataKeysInDegrees.includes(xField as keyof GolfSwingData)
              ? "datum.value + ' °'"
              : "datum.value",
        },
        field: "x",
        title: xField,
        type: "quantitative",
      },
      y: {
        axis: {
          labelExpr: golfSwingDataKeysInMeters.includes(
            yField as keyof GolfSwingData,
          )
            ? "datum.value + ' m'"
            : golfSwingDataKeysInDegrees.includes(yField as keyof GolfSwingData)
              ? "datum.value + ' °'"
              : "datum.value",
        },
        field: "y",
        title: yField,
        type: "quantitative",
      },
      color: {
        field: "date",
        type: "temporal",
        scale: {
          type: "time",
          range: ["lightblue", "darkblue"],
        },
        legend: {
          title: "Date",
        },
      },
      // Tooltip
      tooltip: [
        { field: "x", title: xField, format: ".2f" },
        { field: "y", title: yField, format: ".2f" },
        { field: "date", title: "Date" },
      ],
    },
  };

  const specForMobile: VisualizationSpec = {
    ...spec,
    // Don't show action buttons on mobile
    config: {
      view: { stroke: "transparent" },
      legend: {
        orient: "bottom",
      },
    },
  };

  const data: PlainObject = useMemo(() => {
    if (sessions) {
      let clubData = getAllDataFromSession(sessions);
      if (club && club !== "All" && combinedClubData[club]) {
        clubData = combinedClubData[club];
      }
      return {
        table: clubData.map((row) => ({
          x: row[xField as keyof GolfSwingData],
          y: row[yField as keyof GolfSwingData],
          date: parseDate(getDayFromRow(row)),
        })),
      };
    }
    return { table: [] };
  }, [sessions, xField, yField, combinedClubData, club]);

  return (
    <div className="flex h-auto flex-col gap-3 rounded-xl bg-white p-4">
      <h4 className="mb-4 text-xl font-bold text-gray-800">
        Shot Scatter Plot
      </h4>
      <div className="mb-6 flex flex-col gap-2 md:flex-row">
        <div>
          <BaseLabel>Choose the fields to display</BaseLabel>
          <div className="flex flex-col gap-4 md:flex-row">
            <BaseListbox
              options={fields}
              setOption={setXField}
              value={xField}
              valueText={xField}
            />
            <BaseListbox
              options={fields}
              setOption={setYField}
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
              value={club || ""}
              valueText={club || "All"}
            />
          </div>
        </div>
      </div>
      <div className="hidden h-[400px] w-full lg:block">
        <Vega spec={spec} data={data} />
      </div>
      <div className="h-[400px] w-full lg:hidden">
        <Vega spec={specForMobile} data={data} />
      </div>
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
