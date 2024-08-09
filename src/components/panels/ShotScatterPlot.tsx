import { useContext, useMemo, useState } from "react";
import { PlainObject, Vega, VisualizationSpec } from "react-vega";
import { SessionContext } from "../../provider/SessionContext";
import {
  GolfSwingData,
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "../../types/GolfSwingData";
import { Sessions } from "../../types/Sessions";
import { getAllDataFromSession } from "../../utils/getAllDataFromSession";
import { BaseLabel } from "../base/BaseLabel";
import { BaseListbox } from "../base/BaseListbox";
import { parseDate } from "../../utils";

export const ShotScatterPlot = () => {
  const { sessions } = useContext(SessionContext);

  const [xField, setXField] = useState("Backspin");
  const [yField, setYField] = useState("Smash Factor");

  const fields = useMemo(() => {
    if (sessions) {
      return Object.keys(sessions).length > 0
        ? Object.keys(sessions[Object.keys(sessions)[0]]?.results?.[0])
        : [];
    }
    return [];
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
      // Allow zoom
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

  const clubs: {
    [key: string]: GolfSwingData[];
  } = useMemo(() => {
    if (sessions) {
      return transformSessions(sessions);
    }
    return {};
  }, [sessions]);

  function transformSessions(sessions: Sessions): {
    [key: string]: GolfSwingData[];
  } {
    const resultsByClub: { [key: string]: GolfSwingData[] } = {};

    Object.values(sessions).forEach((session) => {
      session.results.forEach((result) => {
        const club = result["Schlägerart"] || result["Club Type"];
        if (club) {
          if (!resultsByClub[club]) {
            resultsByClub[club] = [];
          }
          resultsByClub[club].push(result);
        }
      });
    });

    return resultsByClub;
  }

  const [club, setClub] = useState<string | null>(null);

  const data: PlainObject = useMemo(() => {
    if (sessions) {
      if (club && club !== "All" && clubs[club]) {
        return {
          table: clubs[club].map((row) => ({
            x: row[xField as keyof GolfSwingData],
            y: row[yField as keyof GolfSwingData],
            date: parseDate((row["Date"] || row["Datum"])?.split(" ")[0] ?? ""),
          })),
        };
      }
      const swings = getAllDataFromSession(sessions);
      return {
        table: swings.map((row) => ({
          x: row[xField as keyof GolfSwingData],
          y: row[yField as keyof GolfSwingData],
          date: parseDate((row["Date"] || row["Datum"])?.split(" ")[0] ?? ""),
        })),
      };
    }
    return { table: [] };
  }, [sessions, xField, yField, clubs, club]);

  console.log(data);

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
              valueText={xField as string}
            />
            <BaseListbox
              options={fields}
              setOption={setYField}
              value={yField}
              valueText={yField as string}
            />
          </div>
        </div>
        <div className="h-auto w-0 border-l-2 border-gray-300"></div>
        <div>
          <BaseLabel>Choose the club to display</BaseLabel>
          <div className="flex flex-row gap-4">
            <BaseListbox
              options={[...Object.keys(clubs).filter((v) => !!v), "All"]}
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
