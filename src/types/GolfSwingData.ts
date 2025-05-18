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
  "Distan​cia total": number;
  "Efecto lateral": number;
  "Eje de rotación": number;
  Fecha: string;
  "Humedad relativa": number;
  Jugador: string;
  "Línea cabeza del palo": number;
  Nota?: string;
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

// Datum,Speler,Clubnaam,Type club,Clubsnelh.,Aanvalshoek,Clubtraject,Slagvlak van de club,Slagvlak t.o.v. traject,Balsnelheid,Smashfactor,Slaghoek,Slagrichting,Backspin,Sidespin,Spinsnelheid,Type draaisnelheid,Spinas,Apexhoogte,Carry-afstand,Carry-afwijkingshoek,Carry-afwijkingsafstand,Totale afstand,Totale afwijkingshoek,Totale afwijkingsafstand,Opmerking,Tag,Luchtdichtheid,Temperatuur,Luchtdruk,Relatieve vochtigheid
// ,,,,[km/u],[deg],[deg],[deg],[deg],[km/u],,[deg],[deg],[rpm],[rpm],[rpm],,[deg],[m],[m],[deg],[m],[m],[deg],[m],,,[g/L],[deg C],[kPa],[%]
// 11/05/2025 12:09:10,Francois Colin,Callaway 8,IJzer 8,117.71990582407534,0.0,-2.5,-11.6,-9.1,126.35989341892119,1.0733944487498805,4.670000076293945,-9.84000015258789,2992.920654296875,20.37247657775879,2992.989990234375,Geschat,-0.38999998569488525,0.9200000166893005,37.970001220703125,-9.90999984741211,-6.53000020980835,79.0,-9.920000076293945,-13.600000381469727,,,1.1929908,21.11,101.1,35
// 11/05/2025 12:09:28,Francois Colin,Callaway 8,IJzer 8,113.9399088480729,9.62,-6.08,15.96,22.04,110.6279098497229,0.9709320550469615,35.810001373291016,12.350000381469727,4622.11181640625,-328.0738220214844,4633.740234375,Geschat,4.059999942779541,18.84000015258789,71.4800033569336,14.880000114440918,18.350000381469727,76.87000274658203,14.84000015258789,19.68000030517578,,,1.1929908,21.11,101.1,35
export type GolfSwingDataNL = {
  Datum: string;
  Speler: string;
  Clubnaam: string;
  "Type club": string;
  "Clubsnelh.": number;
  Aanvalshoek: number;
  Clubtraject: number;
  "Slagvlak van de club": number;
  "Slagvlak t.o.v. traject": number;
  Balsnelheid: number;
  Smashfactor: number;
  Slaghoek: number;
  Slagrichting: number;
  Backspin: number;
  Sidespin: number;
  Spinsnelheid: number;
  "Type draaisnelheid": string;
  Spinas: number;
  Apexhoogte: number;
  "Carry-afstand": number;
  "Carry-afwijkingshoek": number;
  "Carry-afwijkingsafstand": number;
  "Totale afstand": number;
  "Totale afwijkingshoek": number;
  "Totale afwijkingsafstand": number;
  Opmerking: string;
  Tag: string;
  Luchtdichtheid: number;
  Temperatuur: number;
  Luchtdruk: number;
  "Relatieve vochtigheid": number;
};

export type GolfSwingData = GolfSwingDataEN &
  GolfSwingDataDE &
  GolfSwingDataES &
  GolfSwingDataNL;

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

export const dutchMetersMetrics: (keyof GolfSwingDataNL)[] = [
  "Carry-afstand",
  "Carry-afwijkingsafstand",
  "Totale afwijkingsafstand",
  "Apexhoogte",
];

export const golfSwingDataKeysInMeters: Array<
  | keyof GolfSwingDataEN
  | keyof GolfSwingDataDE
  | keyof GolfSwingDataES
  | keyof GolfSwingDataNL
> = [
  ...englishMetersMetrics,
  ...germanMetersMetrics,
  ...spanishMetersMetrics,
  ...dutchMetersMetrics,
];

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

export const dutchDegreeMetrics: (keyof GolfSwingDataNL)[] = [
  "Aanvalshoek",
  "Clubtraject",
  "Slagvlak van de club",
];

export const golfSwingDataKeysInDegrees: Array<
  | keyof GolfSwingDataEN
  | keyof GolfSwingDataDE
  | keyof GolfSwingDataES
  | keyof GolfSwingDataNL
> = [
  ...englishDegreeMetrics,
  ...germanDegreeMetrics,
  ...spanishDegreeMetrics,
  ...dutchDegreeMetrics,
];

export const nonNumericGolfSwingDataKeys: Array<
  | keyof GolfSwingDataEN
  | keyof GolfSwingDataDE
  | keyof GolfSwingDataES
  | keyof GolfSwingDataNL
> = [
  "Club Name",
  "Tag",
  "Player",
  "Note",
  "Club Type",
  "Spin Rate Type",
  "Date",
  "Schlägerart",
  "Spieler",
  "Notiz",
  "Schlägername",
  "Drehratentyp",
  "Datum",
  "Markierung",
  "Jugador",
  "Fecha",
  "Nota",
  "Tipo de palo",
  "Tipo de velocidad de rotación",
  "Type draaisnelheid",
  "Type club",
  "Clubnaam",
  "Speler",
  "Opmerking",
  "Tag",
  "Luchtdichtheid",
  "Temperatuur",
];
