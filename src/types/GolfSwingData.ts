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
  "Smash-Faktor": number | null;
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
  "Carry-Distanz": number;
};

export type GolfSwingDataES = {
  "Altura máxima": number;
  "Calidad del impacto": number;
  "Cara a línea": number;
  "Cara del palo": number;
  "Densidad del aire": number;
  "Dirección de lanzamiento": number;
  "Dist.​vuelo": number;
  "Distancia de desviación de vuelo": number;
  "Distancia de desviación total": number;
  "Distancia total": number;
  "Efecto lateral": number;
  "Eje de rotación": number;
  Etiqueta: string;
  Fecha: string;
  "Humedad relativa": number;
  Jugador: string;
  "Línea cabeza del palo": number;
  "Nombre del palo": string;
  Nota: string;
  "Presión de aire": number;
  Retroceso: number;
  Temperatura: number;
  "Tipo de palo": string;
  "Tipo de velocidad de rotación": string;
  "Vel. palo": number;
  "Velocidad de la pelota": number;
  "Velocidad de rotación": number;
  "Ángulo de ataque": number;
  "Ángulo de desviación de vuelo": number;
  "Ángulo de desviación total": number;
  "Ángulo de lanzamiento": number;
};

export type GolfSwingData = GolfSwingDataEN & GolfSwingDataDE & GolfSwingDataES;

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

export const spanishMetersMetrics: (keyof GolfSwingDataES)[] = [
  "Distancia de desviación total",
  "Distancia de desviación de vuelo",
  "Altura máxima",
];

export const golfSwingDataKeysInMeters: Array<
  keyof GolfSwingDataEN | keyof GolfSwingDataDE | keyof GolfSwingDataES
> = [...englishMetersMetrics, ...germanMetersMetrics, ...spanishMetersMetrics];

export const englishDegreeMetrics: (keyof GolfSwingDataEN)[] = [
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

export const spanishDegreeMetrics: (keyof GolfSwingDataES)[] = [
  "Ángulo de desviación total",
  "Ángulo de desviación de vuelo",
  "Ángulo de lanzamiento",
];

export const golfSwingDataKeysInDegrees: Array<
  keyof GolfSwingDataEN | keyof GolfSwingDataDE | keyof GolfSwingDataES
> = [...englishDegreeMetrics, ...germanDegreeMetrics, ...spanishDegreeMetrics];
