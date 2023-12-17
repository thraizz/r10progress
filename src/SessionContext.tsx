import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from "react";
import { GolfSwingData } from "./types/GolfSwingData";

export type Sessions = {
  [key: string]: {
    results: GolfSwingData[];
    selected: boolean;
  };
};

export interface SessionContextInterface {
  sessions: Sessions | null;
  setSessions: (sessions: Sessions) => void;
}

const SessionContext = createContext<SessionContextInterface>({
  sessions: null,
  setSessions: () => {},
});

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sessions, setSessions] = useState<Sessions | null>(null);
  const memoizedValue = useMemo(
    () => ({
      sessions,
      setSessions,
    }),
    [sessions, setSessions],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
