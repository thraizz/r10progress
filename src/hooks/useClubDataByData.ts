import { useMemo } from "react";
import { YFieldValue } from "../components/panels/AveragesPerSessionGraph";
import { GolfSwingData } from "../types/GolfSwingData";
import {
  AveragedSwing,
  useAveragePerSession,
} from "../utils/calculateAverages";

export const useClubDataByDate = (
  club: string | null,
  yField: keyof GolfSwingData,
) => {
  const averages = useAveragePerSession();

  return useMemo(() => {
    if (!averages) return {};

    return averages.reduce(
      (accumulatedData, currentSwing) => {
        const clubData = currentSwing.averages.find(
          (swing) => swing.name === club,
        );
        if (clubData) {
          accumulatedData[currentSwing.date] =
            clubData[yField as keyof AveragedSwing];
        }

        return accumulatedData;
      },
      {} as { [key: string]: YFieldValue },
    );
  }, [averages, yField, club]);
};
