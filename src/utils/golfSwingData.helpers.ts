import { GolfSwingData } from "../types/GolfSwingData.ts";

export const getClubName = (golfSwingData: GolfSwingData) =>
  golfSwingData["Club Type"] ||
  golfSwingData["Schlägerart"] ||
  golfSwingData["Tipo de palo"] ||
  golfSwingData["Clubnaam"];

export const getCarryDistance = (shot: GolfSwingData) =>
  shot["Carry Distance"] ||
  shot["Carry-Distanz"] ||
  shot["Dist.​vuelo"] ||
  shot["Carry-afstand"];

export const getTotalDistance = (shot: GolfSwingData) => {
  return (
    shot["Total Distance"] ||
    shot["Gesamtstrecke"] ||
    shot["Distan​cia total"] ||
    shot["Totale afstand"]
  );
};

export const getTotalDeviationDistance = (shot: GolfSwingData) =>
  shot["Total Deviation Distance"] ||
  shot["Gesamtabweichungsdistanz"] ||
  shot["Distancia de desviación total"] ||
  shot["Totale afwijkingsafstand"];

export const getDate = (shot: GolfSwingData) =>
  shot["Date"] || shot["Datum"] || shot["Fecha"] || shot["Datum"];

export const getSmashFactor = (shot: GolfSwingData) =>
  shot["Smash Factor"] || shot["Smash-Faktor"] || shot["Calidad del impacto"];

export const getApexHeight = (shot: GolfSwingData) =>
  shot["Apex Height"] ||
  shot["Höhe des Scheitelpunkts"] ||
  shot["Altura máxima"];

export const getBackspin = (shot: GolfSwingData) =>
  shot["Backspin"] || shot["Backspin"] || shot["Retroceso"];
