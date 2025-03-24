// Garmin Golf exports the club name in the language of the user's device.
// 14.02.24 13:33:18	Aron Schüler		Eisen 9	113.42900776786246	-3.3086297512054443	-4.047730445861816	-1.0483050346374512	2.9994254112243652	128.24671443709485	1.1306341910312527	22.974985122680664	-1.3675819635391235	4863.04638671875	-644.055908203125	4905.51025390625	Berechnet	7.544279098510742	14.848843574523926	88.6080322265625	1.0706405639648438	1.655823826789856	96.77474212646484	1.2754888534545898	2.154283046722412			1.2277452	12.777778	101.169624	72

import { GolfSwingData } from "../types/GolfSwingData";
import { Sessions } from "../types/Sessions";

// The club names are localized in the CSV files.
export const clubNameLocalizationDE: { [key: string]: string } = {
  Driver: "Driver",
  "Holz 1": "1 Wood",
  "Holz 2": "2 Wood",
  "Holz 3": "3 Wood",
  "Holz 4": "4 Wood",
  "Holz 5": "5 Wood",
  "Holz 6": "6 Wood",
  "Holz 7": "7 Wood",
  "Holz 8": "8 Wood",
  "Holz 9": "9 Wood",
  "Hybrid 1": "1 Hybrid",
  "Hybrid 2": "2 Hybrid",
  "Hybrid 3": "3 Hybrid",
  "Hybrid 4": "4 Hybrid",
  "Hybrid 5": "5 Hybrid",
  "Hybrid 6": "6 Hybrid",
  "Hybrid 7": "7 Hybrid",
  "Hybrid 8": "8 Hybrid",
  "Hybrid 9": "9 Hybrid",
  "Eisen 1": "1 Iron",
  "Eisen 2": "2 Iron",
  "Eisen 3": "3 Iron",
  "Eisen 4": "4 Iron",
  "Eisen 5": "5 Iron",
  "Eisen 6": "6 Iron",
  "Eisen 7": "7 Iron",
  "Eisen 8": "8 Iron",
  "Eisen 9": "9 Iron",
  "Pitching Wedge": "Pitching Wedge",
  "Pitching-Wedge": "Pitching Wedge",
  "Gap Wedge": "Gap Wedge",
  "Gap-Wedge": "Gap Wedge",
  "Sand Wedge": "Sand Wedge",
  Sandwedge: "Sand Wedge",
  "Lob Wedge": "Lob Wedge",
  "Lob-Wedge": "Lob Wedge",
  Putter: "Putter",
};

export const clubNameLocalizationES: { [key: string]: string } = {
  Driver: "Driver",
  "Madera 1": "1 Wood",
  "Madera 2": "2 Wood",
  "Madera 3": "3 Wood",
  "Madera 4": "4 Wood",
  "Madera 5": "5 Wood",
  "Madera 6": "6 Wood",
  "Madera 7": "7 Wood",
  "Madera 8": "8 Wood",
  "Madera 9": "9 Wood",
  "Híbrido 1": "1 Hybrid",
  "Híbrido 2": "2 Hybrid",
  "Híbrido 3": "3 Hybrid",
  "Híbrido 4": "4 Hybrid",
  "Híbrido 5": "5 Hybrid",
  "Híbrido 6": "6 Hybrid",
  "Híbrido 7": "7 Hybrid",
  "Híbrido 8": "8 Hybrid",
  "Híbrido 9": "9 Hybrid",
  "Hierro 1": "1 Iron",
  "Hierro 2": "2 Iron",
  "Hierro 3": "3 Iron",
  "Hierro 4": "4 Iron",
  "Hierro 5": "5 Iron",
  "Hierro 6": "6 Iron",
  "Hierro 7": "7 Iron",
  "Hierro 8": "8 Iron",
  "Hierro 9": "9 Iron",
  "Pitching Wedge": "Pitching Wedge",
  "Gap Wedge": "Gap Wedge",
  "Sand Wedge": "Sand Wedge",
  "Lob Wedge": "Lob Wedge",
  Putter: "Putter",
};

export const spinrateMeasure: { [key: string]: string } = {
  Berechnet: "Calculated",
  Gemessen: "Measured",
};

export const distanceFieldLocalization: { [key: string]: string } = {
  "Distancia total": "Total Distance",
  "Dist.​vuelo": "Carry Distance",
  "Distancia de desviación total": "Total Deviation Distance",
  "Distancia de desviación de vuelo": "Carry Deviation Distance",
  "Altura máxima": "Apex Height",
};

export const translateSwingsToEnglish: (
  results: GolfSwingData[],
) => GolfSwingData[] = (results) => {
  const translatedResults: GolfSwingData[] = [];
  results.forEach((swing) => {
    let newResult = { ...swing };
    if (newResult["Schl.gsch."]) {
      newResult["Club Speed"] = Number(swing["Schl.gsch."]);
    }
    Object.keys(swing).forEach((key) => {
      const identifier = key as keyof typeof swing;
      const currentSwing = swing[identifier];
      if (currentSwing) {
        if (clubNameLocalizationDE[currentSwing]) {
          newResult = {
            ...newResult,
            [identifier]: clubNameLocalizationDE[currentSwing],
          };
        } else if (clubNameLocalizationES[currentSwing]) {
          newResult = {
            ...newResult,
            [identifier]: clubNameLocalizationES[currentSwing],
          };
        }
        if (spinrateMeasure[currentSwing]) {
          newResult = {
            ...newResult,
            [identifier]: spinrateMeasure[currentSwing],
          };
        }
        if (distanceFieldLocalization[identifier]) {
          newResult = {
            ...newResult,
            [distanceFieldLocalization[identifier]]: swing[identifier],
            [identifier]: undefined,
          };
        }
      }
    });
    translatedResults.push(newResult);
  });
  return translatedResults;
};

export const translateHeader = (header: string) => header;

export const translateSessionsToEnglish = (sessions: Sessions) => {
  const newSessions: Sessions = {};
  Object.keys(sessions).forEach((key) => {
    newSessions[key] = {
      ...sessions[key],
      results: translateSwingsToEnglish(sessions[key].results),
    };
  });
  return newSessions;
};
