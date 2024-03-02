import { GolfSwingData } from "../types/GolfSwingData";
import { Sessions } from "../types/Sessions";
import { translateToEnglish } from "./csvLocalization";

export const getAllDataFromSession = (sessions: Sessions) =>
  Object.values(sessions)
    .filter((session) => session.selected)
    ?.reduce((acc, curr) => {
      if (curr.results.length > 0) {
        acc.push(...translateToEnglish(curr.results));
      }
      return acc;
    }, [] as GolfSwingData[]);
