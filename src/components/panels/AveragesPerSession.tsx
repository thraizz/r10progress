import { useContext, useEffect, useMemo, useState } from "react";
import { useClubDataByDate } from "../../hooks/useClubDataByData";
import { useClubsPerSession } from "../../hooks/useClubsPerSesssion";
import { SessionContext } from "../../provider/SessionContext";
import { GolfSwingData } from "../../types/GolfSwingData";
import { useAveragePerSession } from "../../utils/calculateAverages";
import { getPairsForYfield, parseDate } from "../../utils/utils";
import { BaseLabel } from "../base/BaseLabel";
import { BaseListbox } from "../base/BaseListbox";
import { AverageMetricsGraph } from "./graphs/AverageMetricsGraph";

export type YFieldValue = string | number | null | undefined;
export type ClubDataForTable = {
  x: string | null | undefined;
  y: YFieldValue;
  club: string;
}[];

export const AveragesPerSession = () => {
  const averages = useAveragePerSession();
  const [yField, setYField] = useState<keyof GolfSwingData>("Smash Factor");
  const [club, setClub] = useState<string | null>(null);
  const clubDataByDate = useClubDataByDate(club, yField);
  const clubs = useClubsPerSession();
  const clubSelected = club && club !== "All";

  const { sessions } = useContext(SessionContext);

  const fields = useMemo(() => {
    if (sessions) {
      return Object.keys(sessions).length > 0
        ? Object.keys(sessions[Object.keys(sessions)[0]]?.results?.[0])
        : [];
    }
    return [];
  }, [sessions]);

  useEffect(() => {
    if (fields.length > 0) {
      setYField(fields[0] as keyof GolfSwingData);
    }
  }, [fields]);

  const data: ClubDataForTable = useMemo(() => {
    if (!sessions) return [];
    if (clubSelected && clubDataByDate) {
      return Object.entries(clubDataByDate).map((x) => ({
        x: parseDate(x[0]),
        y: x[1],
        club,
      }));
    } else {
      return getPairsForYfield(averages, yField);
    }
  }, [sessions, clubSelected, clubDataByDate, averages, yField, club]);

  return (
    <div className="flex h-auto w-full flex-col gap-3 rounded-xl bg-white p-4">
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
        <div className="h-auto w-0 border-l-2 border-gray-300" />
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
      <div className="block h-[600px] w-full">
        <AverageMetricsGraph metric={yField} data={data} />
      </div>
    </div>
  );
};
