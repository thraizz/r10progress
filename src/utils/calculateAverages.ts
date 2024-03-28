import { GolfSwingData } from "../types/GolfSwingData";
import { Sessions } from "../types/Sessions";
import { translateSwingsToEnglish } from "./csvLocalization";

export type AveragedSwing = GolfSwingData & {
  count: number;
  name: string;
};

// Calculate averages for each club across all sessions
export const calculateAverages: (input: Sessions) => AveragedSwing[] = (
  input,
) => {
  if (input) {
    const sessions = Object.keys(input).map((key) => ({
      ...input[key],
      results: translateSwingsToEnglish(input[key].results),
    }));
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
    return Object.keys(clubs)
      .map((club) => ({ ...clubs[club], name: club }) as AveragedSwing)
      .sort(sortClubs);
  }
  return [];
};

// Sort irons, woods, and hybrids by their number
// Put wedges first
// Driver comes last
const sortClubs = (a: AveragedSwing, b: AveragedSwing) => {
  const clubA = a.name;
  const clubB = b.name;

  // Sort wedges
  const wedgeOrder = [
    ...lobwedgeVariations,
    ...sandwedgeVariations,
    ...gapwedgeVariations,
    ...pitchingwedgeVariations,
  ];
  const wedgeA = wedgeOrder.indexOf(clubA);
  const wedgeB = wedgeOrder.indexOf(clubB);
  if (wedgeA !== -1 && wedgeB !== -1) {
    return wedgeA - wedgeB;
  }
  if (wedgeA !== -1) {
    return -1;
  }
  if (wedgeB !== -1) {
    return 1;
  }
  // Wedge could also just include "Wedge" or "wedge" in the name
  const clubAIsWedge = clubA.includes("Wedge") || clubA.includes("wedge");
  const clubBIsWedge = clubB.includes("Wedge") || clubB.includes("wedge");
  if (clubA.includes("Wedge") && !clubA.includes("Driver")) {
    return -1;
  }
  if (clubBIsWedge && !clubB.includes("Driver")) {
    return 1;
  }
  if (clubAIsWedge) {
    return -1;
  }
  if (clubB.includes("Wedge") || clubB.includes("wedge")) {
    return 1;
  }

  // Sort irons, woods, and hybrids by their number
  // but separate them by type
  const clubTypeOrder = ["Iron", "Hybrid", "Wood"];
  const typeA = clubTypeOrder.findIndex((type) => clubA.includes(type));
  const typeB = clubTypeOrder.findIndex((type) => clubB.includes(type));
  if (typeA !== -1 && typeB !== -1) {
    if (typeA === typeB) {
      const numberA = parseInt(clubA.match(/\d+/)?.[0] || "0");
      const numberB = parseInt(clubB.match(/\d+/)?.[0] || "0");
      return numberB - numberA;
    }
    return typeA - typeB;
  }
  if (typeA !== -1) {
    return -1;
  }
  if (typeB !== -1) {
    return 1;
  }
  return clubA.localeCompare(clubB);
};

const sandwedgeVariations = [
  "Sand Wedge",
  "Sandwedge",
  "Sand-Wedge",
  "Sand-wedge",
  "Sand wedge",
];

const pitchingwedgeVariations = [
  "Pitching Wedge",
  "Pitching-Wedge",
  "Pitchingwedge",
  "Pitching-wedge",
  "Pitching wedge",
];

const gapwedgeVariations = [
  "Gap Wedge",
  "Gapwedge",
  "Gap-Wedge",
  "Gap-wedge",
  "Gap wedge",
];

const lobwedgeVariations = [
  "Lob Wedge",
  "Lob-Wedge",
  "Lobwedge",
  "Lob wedge",
  "Lob-wedge",
];
