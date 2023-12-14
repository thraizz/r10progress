import { DocumentData } from "firebase/firestore";
import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from "react";

export type SessionType = Record<string, DocumentData> | null;

export interface SessionContextInterface {
  sessions: SessionType;
  setSession: (sessions: SessionType) => void;
}

const SessionContext = createContext<SessionContextInterface>({
  sessions: null,
  setSession: () => {},
});

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sessions, setSession] = useState<SessionType>(null);
  const memoizedValue = useMemo(
    () => ({
      sessions,
      setSession,
    }),
    [sessions, setSession],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
