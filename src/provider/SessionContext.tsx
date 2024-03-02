import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from "react";
import { Sessions } from "../types/Sessions";

export interface SessionContextInterface {
  sessions: Sessions;
  setSessions: (sessions: Sessions) => void;
}

const SessionContext = createContext<SessionContextInterface>({
  sessions: {},
  setSessions: () => {},
});

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sessions, setSessions] = useState<Sessions>({});
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
