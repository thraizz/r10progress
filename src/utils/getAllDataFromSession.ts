import { GolfSwingData } from "../types/GolfSwingData";
import { Sessions } from "../types/Sessions";
import { translateSwingsToEnglish } from "./csvLocalization";

export const getAllDataFromSession = (sessions: Sessions) =>
  Object.values(sessions)
    .filter((session) => session.selected)
    ?.reduce((acc, curr) => {
      if (curr.results.length > 0) {
        acc.push(...translateSwingsToEnglish(curr.results));
      }
      return acc;
    }, [] as GolfSwingData[]);
