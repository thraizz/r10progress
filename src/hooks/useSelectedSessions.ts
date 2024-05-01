import { useContext } from "react";
import { SessionContext } from "../provider/SessionContext";
import { Sessions } from "../types/Sessions";

export const useSelectedSessions = () => {
  const { sessions } = useContext(SessionContext);

  return Object.entries(sessions).reduce((acc, [key, value]) => {
    if (value.selected) {
      acc[key] = value;
    }
    return acc;
  }, {} as Sessions);
};
