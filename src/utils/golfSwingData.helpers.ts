import { GolfSwingData } from "../types/GolfSwingData.ts";

export const getClubName = (golfSwingData: GolfSwingData) =>
  golfSwingData["Club Type"] || golfSwingData["Schlägerart"];

export const getCarryDistance = (shot: GolfSwingData) =>
  shot["Carry Distance"] || shot["Carry-Distanz"];
