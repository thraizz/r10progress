import { GolfSwingData } from "./GolfSwingData";
export type Session = {
  results: GolfSwingData[];
  selected: boolean;
};
export type Sessions = {
  [key: string]: Session;
};
