import { GolfSwingData } from "../types/GolfSwingData";
import { useSelectedSessions } from "./useSelectedSessions";

export const useSelectedShots: () => GolfSwingData[] = () => {
  const s = useSelectedSessions();

  const shots = Object.values(s).reduce(
    (acc, session) => {
      acc.push(...session.results);
      return acc;
    },
    [] as (typeof s)[0]["results"],
  );
  return shots;
};
