export type GolfSwingDataEN = {
  "Club Speed": number;
  "Launch Direction": number;
  "Carry Distance": number;
  "Club Face": number;
  "Spin Axis": number;
  "Apex Height": number;
  "Club Name": null;
  "Ball Speed": number;
  "Launch Angle": number;
  Tag: null;
  "Carry Deviation Angle": number;
  Player: string;
  Note: null;
  "Club Type": "Driver";
  "Relative Humidity": number;
  "Attack Angle": number;
  "Total Deviation Distance": number;
  "Smash Factor": number;
  "Total Distance": number;
  "Face to Path": number;
  "Spin Rate Type": string;
  "Club Path": number;
  Date: string;
  "Total Deviation Angle": number;
  "Air Pressure": number;
  "Air Density": number;
  "Spin Rate": number;
  "Carry Deviation Distance": number;
  Sidespin: number;
  Temperature: number;
  Backspin: number;
};

export type GolfSwingDataDE = {
  Schlagflächenstellung?: null | number;
  Luftdruck?: number | null;
  Schlagfläche: null | number;
  Datum: string | null;
  Temperatur: number | null;
  Markierung?: null | string;
  Luftdichte: number | null;
  Schwungbahn: null | number;
  Drehrate: number | null;
  "Smash Factor": number | null;
  Drehratentyp: string | null;
  Ballgeschwindigkeit: number | null;
  Gesamtabweichungswinkel: number | null;
  "Höhe des Scheitelpunkts": number | null;
  Gesamtabweichungsdistanz: number | null;
  Drehachse: number | null;
  "Carry-Abweichungsdistanz": number | null;
  Abflugrichtung: number | null;
  Backspin: number | null;
  Schlägername?: null | string;
  "Carry-Abweichungswinkel": number | null;
  Sidespin: number | null;
  Gesamtstrecke: number | null;
  Spieler: string | null;
  Abflugwinkel: number | null;
  "Relative Luftfeuchtigkeit": number | null;
  "Schl.gsch.": number | null;
  Notiz?: null | string;
  Schlägerart: string | null;
  Anstellwinkel: null | number;
  "Carry-Distanz": number | null;
};

export type GolfSwingData = GolfSwingDataEN & GolfSwingDataDE;

export const englishMetersMetrics: (keyof GolfSwingDataEN)[] = [
  "Carry Distance",
  "Total Distance",
  "Total Deviation Distance",
  "Carry Deviation Distance",
  "Apex Height",
];

export const germanMetersMetrics: (keyof GolfSwingDataDE)[] = [
  "Carry-Distanz",
  "Gesamtstrecke",
  "Gesamtabweichungsdistanz",
  "Carry-Abweichungsdistanz",
  "Höhe des Scheitelpunkts",
];

export const golfSwingDataKeysInMeters: Array<
  keyof GolfSwingDataEN | keyof GolfSwingDataDE
> = [...englishMetersMetrics, ...germanMetersMetrics];

export const englishDegreeMetrics = [
  "Carry Deviation Angle",
  "Total Deviation Angle",
  "Launch Direction",
  "Club Face",
  "Spin Axis",
  "Launch Angle",
  "Attack Angle",
  "Face to Path",
  "Club Path",
];

export const germanDegreeMetrics: (keyof GolfSwingDataDE)[] = [
  "Carry-Abweichungswinkel",
  "Gesamtabweichungswinkel",
  "Abflugrichtung",
  "Abflugwinkel",
  "Schlagflächenstellung",
  "Schlagfläche",
  "Drehachse",
  "Schwungbahn",
  "Anstellwinkel",
];

export const golfSwingDataKeysInDegrees: Array<
  keyof GolfSwingDataEN | keyof GolfSwingDataDE
> = [...englishDegreeMetrics, ...germanDegreeMetrics] as unknown as Array<
  keyof GolfSwingData
>;
