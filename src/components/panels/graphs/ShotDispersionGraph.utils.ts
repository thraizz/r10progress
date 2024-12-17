import { useMemo } from "react";
import { useSelectedSessionsWithSettings } from "../../../hooks/useSelectedSessions";
import { GolfSwingData } from "../../../types/GolfSwingData";
import { PointWithClub } from "../../base/chartOptions";

export const useCarryAndDeviation = () => {
  const sessions = useSelectedSessionsWithSettings();

  const combinedValues: {
    shots: any[];
    shotsByClub: Record<string, PointWithClub[]>;
  } = useMemo(() => {
    if (sessions) {
      const results = Object.values(sessions)
        .map((session) => session.results)
        .flat();
      const shots = calculateCarryAndDeviation(results).filter(
        (pair) => !!pair,
      );

      return {
        shots,
        shotsByClub: shots.reduce(
          (acc, shot) => {
            if (!shot) return acc;
            const { club } = shot;
            if (!acc[club]) {
              acc[club] = [];
            }
            acc[club].push(shot);
            return acc;
          },
          {} as Record<string, typeof shots>,
        ),
      };
    }
    return { shots: [], shotsByClub: {} };
  }, [sessions]);

  return combinedValues;
};

export const calculateCarryAndDeviation: (
  results: GolfSwingData[],
) => (PointWithClub | undefined)[] = (results: GolfSwingData[]) =>
  results.map((result) => {
    const carry = (
      result["Carry Distance"] || result["Carry-Distanz"]
    )?.toFixed(2);
    const deviation = (
      result["Carry Deviation Distance"] || result["Gesamtabweichungsdistanz"]
    )?.toFixed(2);
    const clubName = result["Schlägerart"] || result["Club Type"];
    if (carry && deviation && clubName) {
      return { y: carry, x: deviation, club: clubName };
    }
  });
