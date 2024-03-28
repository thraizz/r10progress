import { useContext, useMemo, useState } from "react";
import { PlainObject, Vega, VisualizationSpec } from "react-vega";
import { useClubsPerSession } from "../../hooks/useClubsPerSesssion";
import { SessionContext } from "../../provider/SessionContext";
import { GolfSwingData } from "../../types/GolfSwingData";
import { useAveragedSwings } from "../../utils/calculateAverages";
import { getAllDataFromSession } from "../../utils/getAllDataFromSession";
import { BaseLabel } from "../base/BaseLabel";
import { BaseListbox } from "../base/BaseListbox";

export const AveragesPerSession = () => {
  const { sessions } = useContext(SessionContext);

  const [yField, setYField] = useState("Smash Factor");
  const [club, setClub] = useState<string | null>(null);

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
    mark: "bar",
    encoding: {
      x: {
        axis: {
          labelAngle: 0,
        },
        field: "x",
        title: "Date",
        type: "nominal",
      },
      y: {
        field: "y",
        title: yField,
        type: "quantitative",
      },
    },
  };

  const averages = useAveragedSwings();

  const clubDataByDate: {
    [key: string]: GolfSwingData[];
  } = useMemo(() => {
    if (averages) {
      return averages.reduce(
        (acc, curr) => {
          if (curr["Club Type"] === club) {
            if (!acc[curr["Date"]]) {
              acc[curr["Date"]] = [];
            }
            acc[curr["Date"]].push(curr);
          }
          return acc;
        },
        {} as { [key: string]: GolfSwingData[] },
      );
    }
    return {};
  }, [averages, club]);

  const clubSelected = club && club !== "All";
  const averagesByDate: PlainObject = useMemo(() => {
    if (sessions) {
      if (clubSelected) {
        return {
          table: clubDataByDate,
        };
      }
      return {
        table: getAllDataFromSession(sessions).map((row) => ({
          x: row["Date"] || row["Datum"],
          y: row[yField as keyof GolfSwingData],
        })),
      };
    }
    return { table: [] };
  }, [sessions, yField, clubDataByDate, clubSelected]);

  const clubs = useClubsPerSession();

  return (
    <div className="flex h-auto flex-col gap-3 rounded-xl bg-white p-4">
      <h4 className="mb-4 text-xl font-bold text-gray-800">
        Averages per Session
      </h4>
      <div className="mb-6 flex flex-col gap-2 md:flex-row">
        <div>
          <BaseLabel>Choose the fields to display</BaseLabel>
          <div className="flex flex-col gap-4 md:flex-row">
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
              options={[
                ...Object.keys(clubs)
                  .filter((v) => !!v)
                  .sort(),
                "All",
              ]}
              setOption={setClub}
              value={club || ""}
              valueText={club || "All"}
            />
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <Vega width={700} height={700} spec={spec} data={averagesByDate} />
      </div>
      <div className="hidden lg:block">
        <Vega width={1500} height={700} spec={spec} data={averagesByDate} />
      </div>
    </div>
  );
};
