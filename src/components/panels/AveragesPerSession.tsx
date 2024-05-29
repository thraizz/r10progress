import { useContext, useMemo, useState } from "react";
import { Vega, VisualizationSpec } from "react-vega";
import { useClubsPerSession } from "../../hooks/useClubsPerSesssion";
import { SessionContext } from "../../provider/SessionContext";
import {
  AveragedSwing,
  useAveragePerSession,
} from "../../utils/calculateAverages";
import { BaseLabel } from "../base/BaseLabel";
import { BaseListbox } from "../base/BaseListbox";

export const AveragesPerSession = () => {
  const { sessions } = useContext(SessionContext);

  const [yField, setYField] = useState<keyof AveragedSwing>("Smash Factor");
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
    mark: "line",
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

  const averages = useAveragePerSession();

  const clubDataByDate = useMemo(() => {
    if (!averages) return {};

    return averages.reduce(
      (accumulatedData, currentSwing) => {
        const clubData = currentSwing.averages.find(
          (swing) => swing.name === club,
        );
        if (clubData) {
          accumulatedData[currentSwing.date] =
            clubData[yField as keyof AveragedSwing];
        }
        return accumulatedData;
      },
      {} as { [key: string]: YFieldValue },
    );
  }, [averages, yField, club]);

  const clubSelected = club && club !== "All";
  type ClubDataForTable = {
    table: {
      x: string | null;
      y: YFieldValue;
    }[];
  };

  const averagesByDate: ClubDataForTable = useMemo(() => {
    if (sessions) {
      if (clubSelected && clubDataByDate) {
        return {
          table: Object.entries(clubDataByDate)?.map((x) => ({
            x: x[0],
            y: x[1],
          })),
        };
      } else {
        return {
          table: averages.map((x) => ({
            x: x.date,
            y: getAllAveragesByField(x.averages, yField),
          })),
        };
      }
    }
    return { table: [] };
  }, [sessions, clubSelected, clubDataByDate, averages, yField]);

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
              setOption={setYField as (option: string) => void}
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
const getAllAveragesByField = (
  averages: AveragedSwing[],
  yField: keyof AveragedSwing,
): YFieldValue => {
  // @ts-expect-error - TODO Fix typing here
  return averages.reduce((acc, current) => {
    if (current[yField] === undefined) {
      return acc;
    }
    if (acc === null) {
      return current[yField];
    }
    return acc + current[yField];
  }, null);
};

type YFieldValue = string | number | null | undefined;
