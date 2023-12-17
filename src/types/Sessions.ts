import { GolfSwingData } from "./GolfSwingData";

export type Sessions = {
  [key: string]: {
    results: GolfSwingData[];
    selected: boolean;
  };
};
