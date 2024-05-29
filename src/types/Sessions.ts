import { GolfSwingData } from "./GolfSwingData";

export type Session = {
  results: GolfSwingData[];
  selected: boolean;
  date: string;
};
export type Sessions = {
  [key: string]: Session;
};
