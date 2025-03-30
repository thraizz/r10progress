import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { ANONYMOUS_USER_UID, db } from "../firebase";
import { Session, Sessions } from "../types/Sessions";
import { translateSessionsToEnglish } from "../utils/csvLocalization";
import { getDateFromResults } from "../utils/date.utils";
import { filterResultsWithMissingCells } from "../utils/filterResultsWithMissingCells";
import { reduceSessionToDefinedValues } from "../utils/utils";
import { UserContext } from "./UserContext";

export interface SessionContextInterface {
  initialized: boolean;
  isLoading: boolean;
  sessions: Sessions;
  setSessions: (sessions: Sessions) => void;
  fetchSnapshot: () => Promise<Sessions | undefined>;
  deleteSession: (id: string) => Promise<void>;
  exportSessionsToJson: (sessions: Sessions) => void;
}

/**
 * This context manager gets the users data / shots / sessions from firestore
 * and provides it to the app. We have an initial and loading state here too,
 * handle anonymous users and provide a function to delete a session.
 */
const SessionContext = createContext<SessionContextInterface>({
  initialized: false,
  isLoading: false,
  sessions: {},
  setSessions: () => {},
  fetchSnapshot: () => Promise.resolve(undefined),
  deleteSession: () => Promise.resolve(),
  exportSessionsToJson: () => {},
});

const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sessions, setSessions] = useState<Sessions>({});
  const setSessionsCallback = useCallback((sessions: Sessions) => {
    setSessions(filterResultsWithMissingCells(sessions));
  }, []);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);
  const uuid = user?.isAnonymous ? ANONYMOUS_USER_UID : user?.uid;

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    if (uuid) {
      let sessionResult: Sessions | undefined;
      try {
        const querySnapshot = await getDocs(
          collection(db, "r10data", uuid, "data"),
        );
        sessionResult = querySnapshot.docs.reduce((acc, curr) => {
          const data = reduceSessionToDefinedValues(curr.data() as Session);
          acc[curr.id] = {
            ...data,
            selected: true,
            date: getDateFromResults(data.results),
          };
          return acc;
        }, {} as Sessions);
        setSessionsCallback(sessionResult);
        setInitialized(true);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      return sessionResult;
    }
    setIsLoading(false);
  }, [uuid, setSessionsCallback]);

  // Export current sessions as JSON file, used for debugging
  const exportSessionsToJson = useCallback((sessions: Sessions) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(sessions)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "sessions.json";
    document.body.appendChild(element);
    element.click();
  }, []);

  const deleteSession = useCallback(
    async (id: string) => {
      if (!uuid) {
        return;
      }
      const document = doc(db, "r10data", uuid, "data", id);
      await deleteDoc(document);
      setSessions((prev: Sessions) => {
        const newSessions = { ...prev };
        delete newSessions[id];
        return newSessions;
      });
    },
    [uuid, setSessions],
  );

  const memoizedValue = useMemo(
    () => ({
      initialized,
      isLoading,
      sessions: translateSessionsToEnglish(sessions),
      setSessions: setSessionsCallback,
      fetchSnapshot: fetchSessions,
      deleteSession,
      exportSessionsToJson,
    }),
    [
      initialized,
      isLoading,
      sessions,
      setSessionsCallback,
      fetchSessions,
      deleteSession,
      exportSessionsToJson,
    ],
  );

  return (
    <SessionContext.Provider value={memoizedValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
