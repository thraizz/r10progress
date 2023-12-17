import { Sessions } from "./types/Sessions";

export type AveragedSwing = {
  Abflugrichtung: number;
  Abflugwinkel: number;
  Anstellwinkel: number;
  Backspin: number;
  Ballgeschwindigkeit: number;
  "Carry-Abweichungsdistanz": number;
  "Carry-Abweichungswinkel": number;
  "Carry-Distanz": number;
  Drehachse: number;
  Drehrate: number;
  Gesamtabweichungsdistanz: number;
  Gesamtabweichungswinkel: number;
  Gesamtstrecke: number;
  "Höhe des Scheitelpunkts": number;
  Luftdichte: number;
  Luftdruck: number;
  "Relative Luftfeuchtigkeit": number;
  "Schl.gsch.": number;
  Schlagfläche: number;
  Schlagflächenstellung: number;
  Schwungbahn: number;
  Sidespin: number;
  "Smash Factor": number;
  Temperatur: number;
  count: number;
  name: string;
};

// Calculate averages for each club across all sessions
export const calculateAverages: (sessions: Sessions) => AveragedSwing[] = (
  sessions,
) => {
  if (sessions) {
    // This will hold all averages for each club
    const clubs: { [key: string]: object } = {};
    // Iterate over all sessions
    for (const session of Object.values(sessions)) {
      if (
        !session.results ||
        session.results.length === 0 ||
        session.selected === false
      ) {
        continue;
      }
      // Iterate over all swings in the session
      for (const swing of session.results) {
        // Get the club name, which depends on the language
        const club = swing["Schlägerart"] || swing["Club Type"];
        if (!club) {
          continue;
        }
        // If the club name is not yet in the clubs object, add it
        if (!clubs[club]) {
          clubs[club] = { count: 1 };
        } else {
          // @ts-expect-error - count is always a number
          clubs[club].count++;
        }
        // Iterate over all keys in the swing
        for (const key of Object.keys(swing)) {
          // Skip the club name
          if (key === "Schlägername") {
            continue;
          }
          // @ts-expect-error - key is taken from Object keys
          if (typeof swing[key] !== "number") {
            continue;
          }
          // @ts-expect-error - key is taken from Object keys
          // If the key is not yet in the club object, initialize it
          if (!clubs[club][key]) {
            // @ts-expect-error - key is taken from Object keys
            clubs[club][key] = swing[key];
          } else {
            // @ts-expect-error - key is taken from Object keys
            // Add the value to the array
            clubs[club][key] = clubs[club][key] + swing[key];
          }
        }
      }
    }

    // Iterate over all clubs and calculate the average, except for the count
    for (const club of Object.keys(clubs)) {
      for (const key of Object.keys(clubs[club])) {
        // Skip the count
        if (key === "count") {
          continue;
        }
        // @ts-expect-error - key is taken from Object keys
        // Calculate the average
        clubs[club][key] = clubs[club][key] / clubs[club].count;
      }
    }
    // Flatten to an array with the club name as key
    return Object.keys(clubs).map(
      (club) => ({ ...clubs[club], name: club }) as AveragedSwing,
    );
  }
  return [];
};
