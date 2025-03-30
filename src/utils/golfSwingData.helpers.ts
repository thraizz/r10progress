import { GolfSwingData } from "../types/GolfSwingData.ts";

export const getClubName = (golfSwingData: GolfSwingData) =>
  golfSwingData["Club Type"] ||
  golfSwingData["Schlägerart"] ||
  golfSwingData["Tipo de palo"];

export const getCarryDistance = (shot: GolfSwingData) =>
  shot["Carry Distance"] || shot["Carry-Distanz"] || shot["Dist.​vuelo"];

export const getTotalDistance = (shot: GolfSwingData) => {
  return (
    shot["Total Distance"] || shot["Gesamtstrecke"] || shot["Distan​cia total"]
  );
};

export const getTotalDeviationDistance = (shot: GolfSwingData) =>
  shot["Total Deviation Distance"] ||
  shot["Gesamtabweichungsdistanz"] ||
  shot["Distancia de desviación total"];

export const getDate = (shot: GolfSwingData) =>
  shot["Date"] || shot["Datum"] || shot["Fecha"];

export const getSmashFactor = (shot: GolfSwingData) =>
  shot["Smash Factor"] || shot["Smash-Faktor"] || shot["Calidad del impacto"];

export const getApexHeight = (shot: GolfSwingData) =>
  shot["Apex Height"] ||
  shot["Höhe des Scheitelpunkts"] ||
  shot["Altura máxima"];

export const getBackspin = (shot: GolfSwingData) =>
  shot["Backspin"] || shot["Backspin"] || shot["Retroceso"];
