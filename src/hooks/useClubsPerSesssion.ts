import { useContext, useMemo } from "react";
import { SessionContext } from "../provider/SessionContext";
import { translateSwingsToEnglish } from "../utils/csvLocalization";
import { getClubName } from "../utils/golfSwingData.helpers.ts";

export const useClubsPerSession = () => {
  const { sessions } = useContext(SessionContext);
  return useMemo(() => {
    if (sessions) {
      return Object.keys(sessions).reduce(
        (clubs, current) => {
          translateSwingsToEnglish(sessions[current].results).forEach(
            (shot) => {
              const clubName = getClubName(shot);
              if (clubName) {
                clubs[clubName] = true;
              }
            },
          );
          return clubs;
        },
        {} as { [key: string]: boolean },
      );
    }
    return {};
  }, [sessions]);
};
