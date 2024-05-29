import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
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
  deleteSession: (id: string) => Promise<void>;
}

const SessionContext = createContext<SessionContextInterface>({
  initialized: false,
  isLoading: false,
  sessions: {},
  setSessions: () => {},
  fetchSnapshot: () => Promise.resolve(undefined),
  deleteSession: () => Promise.resolve(),
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
        acc[curr.id] = {
          ...data,
          selected: true,
          date: getDateFromResults(data.results),
        };
        return acc;
      }, {} as Sessions);
      setSessions(sessionResult);
      setInitialized(true);
      setIsLoading(false);
      return sessionResult;
    }
    setIsLoading(false);
  }, [uuid, setSessions]);

  const deleteSession = useCallback(
    async (id: string) => {
      if (!uuid) {
        return;
      }
      const document = doc(db, "r10data", uuid, "data", id);
      await deleteDoc(document);
      _setSessions((prev: Sessions) => {
        const newSessions = { ...prev };
        delete newSessions[id];
        return newSessions;
      });
    },
    [uuid, _setSessions],
  );

  const memoizedValue = useMemo(
    () => ({
      initialized,
      isLoading,
      sessions: translateSessionsToEnglish(sessions),
      setSessions,
      fetchSnapshot,
      deleteSession,
    }),
    [
      initialized,
      isLoading,
      sessions,
      setSessions,
      fetchSnapshot,
      deleteSession,
    ],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDateFromResults = (results: any[]) => {
  if (results.length > 0) {
    const date: string =
      results[0].Date ||
      results[0].Datum ||
      "No date found. Contact me please.";

    return date.split(" ")[0];
  }
  return "";
};
