import { GolfSwingData, Sessions } from "./SessionContext";

export const getAllDataFromSession = (sessions: Sessions) =>
  Object.values(sessions)
    .filter((session) => session.selected)
    ?.reduce((acc, curr) => {
      if (curr.results.length > 0) {
        acc.push(...curr.results);
      }
      return acc;
    }, [] as GolfSwingData[]);
