import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { Goal, PartialGoal } from "../types/Goals";
import {
  golfSwingDataKeysInDegrees,
  golfSwingDataKeysInMeters,
} from "../types/GolfSwingData";
import { useAveragedSwings } from "../utils/calculateAverages";
import { useIsEnglishDataset } from "./useIsEnglishDataset.ts";

export const goalAtom = atom<PartialGoal[]>([]);
export const useGoals: () => Goal[] = () => {
  const isEnglish = useIsEnglishDataset();
  const [goals, setGoals] = useAtom(goalAtom);
  useEffect(
    () =>
      setGoals(
        isEnglish
          ? [
              {
                id: "1",
                title: "Driving distance",
                target: 200,
                metric: "Carry Distance",
              },
            ]
          : [
              {
                id: "1",
                title: "Driving distance",
                target: 200,
                metric: "Gesamtstrecke",
              },
            ],
      ),
    [isEnglish, setGoals],
  );
  const averages = useAveragedSwings();

  const calculateGoalProgress = (partialGoal: PartialGoal) => {
    const current =
      averages.find((average) => average.name === "Driver")?.[
        "Carry Distance"
      ] ||
      averages.find((average) => average.name === "Driver")?.["Gesamtstrecke"];

    const progress = current ? (current / partialGoal.target) * 100 : 0;
    const progressText = `${(current
      ? (current / partialGoal.target) * 100
      : 0
    ).toFixed(2)}%`;
    let unit = "";
    if (golfSwingDataKeysInDegrees.includes(partialGoal.metric)) {
      unit = "°";
    } else if (golfSwingDataKeysInMeters.includes(partialGoal.metric)) {
      unit = "m";
    }
    return { progress, progressText, current, unit };
  };

  return goals.map((goal) => ({
    ...goal,
    ...calculateGoalProgress(goal),
  }));
};
