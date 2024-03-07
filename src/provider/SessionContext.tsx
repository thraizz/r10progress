import { collection, getDocs } from "firebase/firestore";
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { db } from "../firebase";
import { Session, Sessions } from "../types/Sessions";
import { reduceSessionToDefinedValues } from "../utils";
import { UserContext } from "./UserContext";
import { filterResultsWithMissingCells } from "../utils/filterResultsWithMissingCells";
import { translateSessionsToEnglish } from "../utils/csvLocalization";

export interface SessionContextInterface {
  initialized: boolean;
  sessions: Sessions;
  setSessions: (sessions: Sessions) => void;
  fetchSnapshot: () => Promise<Sessions | undefined>;
}

const SessionContext = createContext<SessionContextInterface>({
  initialized: false,
  sessions: {},
  setSessions: () => {},
  fetchSnapshot: () => Promise.resolve(undefined),
});

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sessions, setSessions] = useState<Sessions>({});
  const [initialized, setInitialized] = useState(false);

  const { user } = useContext(UserContext);
  const uuid = user?.isAnonymous ? "6U4S2ruwXMPrULj50b9uLpsaRk53" : user?.uid;

  const fetchSnapshot = useCallback(async () => {
    if (uuid) {
      const querySnapshot = await getDocs(
        collection(db, "r10data", uuid, "data"),
      );
      const sessionResult = querySnapshot.docs.reduce((acc, curr) => {
        const data = reduceSessionToDefinedValues(curr.data() as Session);
        acc[curr.id] = { ...data, selected: true };
        return acc;
      }, {} as Sessions);
      setSessions(filterResultsWithMissingCells(sessionResult));
      setInitialized(true);
      return sessionResult;
    }
  }, [uuid]);

  const memoizedValue = useMemo(
    () => ({
      initialized,
      sessions: translateSessionsToEnglish(sessions),
      setSessions,
      fetchSnapshot,
    }),
    [sessions, setSessions, fetchSnapshot, initialized],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
