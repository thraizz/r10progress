import { useMemo } from "react";
import { useSelectedSessionsWithSettings } from "../../../hooks/useSelectedSessions";
import { GolfSwingData } from "../../../types/GolfSwingData";
import {
  getCarryDistance,
  getClubName,
  getTotalDeviationDistance,
} from "../../../utils/golfSwingData.helpers";
import { PointWithClub } from "../../base/chartOptions";

export const useCarryAndDeviation = () => {
  const sessions = useSelectedSessionsWithSettings();

  const combinedValues: {
    shots: PointWithClub[];
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
  results.map((shot) => {
    const carry = getCarryDistance(shot);
    const deviation = getTotalDeviationDistance(shot);
    const clubName = getClubName(shot);
    if (carry && deviation && clubName) {
      return { y: carry, x: deviation, club: clubName };
    }
  });
