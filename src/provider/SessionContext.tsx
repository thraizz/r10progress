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
import { translateSessionsToEnglish } from "../utils/csvLocalization";
import { filterResultsWithMissingCells } from "../utils/filterResultsWithMissingCells";
import { UserContext } from "./UserContext";

export interface SessionContextInterface {
  initialized: boolean;
  isLoading: boolean;
  sessions: Sessions;
  setSessions: (sessions: Sessions) => void;
  fetchSnapshot: () => Promise<Sessions | undefined>;
}

const SessionContext = createContext<SessionContextInterface>({
  initialized: false,
  isLoading: false,
  sessions: {},
  setSessions: () => {},
  fetchSnapshot: () => Promise.resolve(undefined),
});

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sessions, _setSessions] = useState<Sessions>({});
  const setSessions = useCallback((sessions: Sessions) => {
    _setSessions(filterResultsWithMissingCells(sessions));
  }, []);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);
  const uuid = user?.isAnonymous ? "6U4S2ruwXMPrULj50b9uLpsaRk53" : user?.uid;

  const fetchSnapshot = useCallback(async () => {
    setIsLoading(true);
    if (uuid) {
      const querySnapshot = await getDocs(
        collection(db, "r10data", uuid, "data"),
      );
      const sessionResult = querySnapshot.docs.reduce((acc, curr) => {
        const data = reduceSessionToDefinedValues(curr.data() as Session);
        acc[curr.id] = { ...data, selected: true };
        return acc;
      }, {} as Sessions);
      setSessions(sessionResult);
      setInitialized(true);
      setIsLoading(false);
      return sessionResult;
    }
    setIsLoading(false);
  }, [uuid, setSessions]);

  const memoizedValue = useMemo(
    () => ({
      initialized,
      isLoading,
      sessions: translateSessionsToEnglish(sessions),
      setSessions,
      fetchSnapshot,
    }),
    [initialized, isLoading, sessions, setSessions, fetchSnapshot],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
