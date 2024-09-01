import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useContext, useMemo, useState } from "react";
import { useClubDataByDate } from "../../hooks/useClubDataByData";
import { useClubsPerSession } from "../../hooks/useClubsPerSesssion";
import { SessionContext } from "../../provider/SessionContext";
import { GolfSwingData } from "../../types/GolfSwingData";
import { useAveragePerSession } from "../../utils/calculateAverages";
import { getPairsForYfield, parseDate } from "../../utils/utils";
import { BaseLabel } from "../base/BaseLabel";
import { BaseListbox } from "../base/BaseListbox";
import type { ClubDataForTable } from "./AveragesPerSessionGraph";
import { AveragesPerSessionGraph } from "./AveragesPerSessionGraph";
dayjs.extend(customParseFormat);

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

  const averagesByDate: ClubDataForTable = useMemo(() => {
    if (sessions) {
      if (clubSelected && clubDataByDate) {
        return Object.entries(clubDataByDate)?.map((x) => ({
          x: parseDate(x[0]),
          y: x[1],
          club,
        }));
      } else {
        return getPairsForYfield(averages, yField);
      }
    }
    return [];
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
      <AveragesPerSessionGraph yField={yField} data={averagesByDate} />
    </div>
  );
};
