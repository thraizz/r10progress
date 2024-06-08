import { GolfSwingDataDE, GolfSwingDataEN } from "./GolfSwingData";

export type Goal = {
  id: string;
  title: string;
  current: string | number | null | undefined;
  target: number;
  progressText: string;
  progress: number;
  unit: string;
};

export type PartialGoal = {
  id: string;
  title: string;
  target: number;
  club?: string;
  metric: keyof GolfSwingDataDE | keyof GolfSwingDataEN;
};
