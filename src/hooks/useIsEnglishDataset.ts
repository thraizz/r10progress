import { useSelectedSessions } from "./useSelectedSessions";

export const useIsEnglishDataset = () => {
  const sessions = useSelectedSessions();
  return Object.values(sessions).some(
    (session) => session.results.length && !!session.results[0]?.["Ball Speed"],
  );
};
