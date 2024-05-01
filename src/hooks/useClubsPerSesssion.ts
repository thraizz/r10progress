import { useContext, useMemo } from "react";
import { SessionContext } from "../provider/SessionContext";
import { translateSwingsToEnglish } from "../utils/csvLocalization";

export const useClubsPerSession = () => {
  const { sessions } = useContext(SessionContext);
  return useMemo(() => {
    if (sessions) {
      return Object.keys(sessions).reduce(
        (acc, curr) => {
          translateSwingsToEnglish(sessions[curr].results).forEach((result) => {
            if (result["Club Type"] || result["Schlägerart"]) {
              acc[result["Club Type"] || result["Schlägerart"]] = true;
            }
          });
          return acc;
        },
        {} as { [key: string]: boolean },
      );
    }
    return {};
  }, [sessions]);
};
