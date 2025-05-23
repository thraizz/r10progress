import { useContext, useMemo } from "react";
import { SessionContext } from "../provider/SessionContext";
import { SettingsContext } from "../provider/SettingsContext";
import { GolfSwingData } from "../types/GolfSwingData";
import type { Session, Sessions } from "../types/Sessions";
import { translateSwingsToEnglish } from "./csvLocalization";
import {
  getCarryDistance,
  getClubName,
  getTotalDeviationDistance,
  getTotalDistance,
} from "./golfSwingData.helpers";

const quantile = (arr: number[], q: number) => {
  const sorted = arr.sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
};

export type AveragedSwing = GolfSwingData & {
  count: number;
  name: string;
};

export const useAveragedSwings = () => {
  const { sessions } = useContext(SessionContext);

  const { settings } = useContext(SettingsContext);

  return useMemo(() => {
    if (sessions) {
      return calculateAverages(
        sessions,
        settings.useIQR,
        settings.useAboveAverageShots,
      );
    }
    return [];
  }, [sessions, settings.useIQR, settings.useAboveAverageShots]);
};

export type AveragedSwingRecord = {
  date: string;
  averages: AveragedSwing[];
};
export const useAveragePerSession = () => {
  const { sessions } = useContext(SessionContext);

  return useMemo(() => {
    if (sessions) {
      return Object.values(sessions).reduce((previousValue, currentValue) => {
        const date = currentValue.date;
        const averages = calculateAverages({ "1": currentValue });
        return [...previousValue, { date, averages }];
      }, [] as AveragedSwingRecord[]);
    }
    return [];
  }, [sessions]);
};

// Calculate averages for each club across all sessions
export const calculateAverages: (
  input: Sessions,
  calculateWithIqr?: boolean,
  useAboveAverageShots?: boolean,
) => AveragedSwing[] = (
  input,
  calculateWithIqr = false,
  useAboveAverageShots = false,
) => {
  if (input) {
    const sessions = Object.keys(input).map((key) => ({
      ...input[key],
      results: translateSwingsToEnglish(input[key].results),
    }));

    // This will hold all averages for each club
    const clubs: {
      [key: string]: AveragedSwing | { count: number; name: string };
    } = {};

    // Iterate over all sessions
    for (const session of Object.values(sessions)) {
      if (
        !session.selected ||
        !session.results ||
        session.results.length === 0
      ) {
        continue;
      }
      if (calculateWithIqr) {
        session.results = dropOutliers(session.results);
      }
      if (useAboveAverageShots) {
        session.results = getAboveAverageShots(session.results);
      }
      // Iterate over all swings in the session
      for (const swing of session.results) {
        // Get the club name, which depends on the language
        const club = getClubName(swing);
        if (!club) {
          continue;
        }
        // If the club name is not yet in the clubs object, add it
        if (!clubs[club]) {
          clubs[club] = { name: club, count: 1 };
        } else {
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

    // Use Interquartile Range to filter out outliers and calculate the average, except for the count
    for (const club of Object.keys(clubs)) {
      for (const key of Object.keys(clubs[club])) {
        // Skip the count and name
        if (key === "count" || key === "name") {
          continue;
        }
        // Calculate the average
        const values = sessions
          .filter((session) => session.selected)
          .map((session) => session.results)
          .flat()
          .filter((swing) => {
            const swingClub = getClubName(swing);
            return swingClub === club;
          })
          // @ts-expect-error - key is taken from Object keys
          .map((swing) => swing[key])
          .filter(
            (value): value is number =>
              typeof value === "number" && !isNaN(value),
          );

        if (values.length === 0) {
          // @ts-expect-error - key is taken from Object keys
          clubs[club][key] = 0;
          continue;
        }

        // @ts-expect-error - key is taken from Object keys
        clubs[club][key] =
          Math.round(
            (values.reduce((acc, curr) => acc + curr, 0) / values.length) * 100,
          ) / 100;
      }
    }

    // Flatten to an array with the club name as key
    const sortedClubs = Object.keys(clubs)
      .map((club) => ({ ...clubs[club], name: club }) as AveragedSwing)
      .sort(sortClubs);

    return sortedClubs;
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

/**
 * This function removes outliers based on `Gesamtstrecke` per club type.
 *
 * @param swings - The swings to filter
 */
export const dropOutliers = (swings: GolfSwingData[]) => {
  // Filter out outliers
  const filteredSwings = swings.filter((swing) => {
    const club = getClubName(swing);
    const distance = getTotalDistance(swing);
    if (!club || !distance) {
      return false;
    }
    const values = swings
      .filter((s) => {
        const sClub = getClubName(s);
        return sClub === club;
      })
      .map((s) => getTotalDistance(s));
    const q1 = quantile(values, 0.25);
    const q3 = quantile(values, 0.75);
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    return distance >= lowerBound && distance <= upperBound;
  });

  return filteredSwings;
};

export const getAboveAverageShots = (swings: GolfSwingData[]) => {
  // Filter out outliers
  const filteredSwings = swings.filter((swing) => {
    const club = getClubName(swing);
    const distance = getTotalDistance(swing);
    if (!club || !distance) {
      return false;
    }
    const values = swings
      .filter((s) => {
        const sClub = getClubName(s);
        return sClub === club;
      })
      .map((s) => getTotalDistance(s));
    const average = values.reduce((acc, curr) => acc + curr, 0) / values.length;
    return distance >= average;
  });

  return filteredSwings;
};

/**
 * Calculate the 10 best shots for all clubs for the selected sessions,
 * average them and return the result.
 */
export const useBestShots = () => {
  const { sessions } = useContext(SessionContext);

  return useMemo(() => {
    if (sessions) {
      // Get all shots from selected sessions
      const allShots = Object.values(sessions)
        .filter((session) => session.selected)
        .map((session) => session.results)
        .flat();

      // Group shots by club
      const shotsByClub = allShots.reduce(
        (acc, shot) => {
          const club = getClubName(shot);
          if (!club) return acc;

          if (!acc[club]) acc[club] = [];
          acc[club].push(shot);
          return acc;
        },
        {} as Record<string, GolfSwingData[]>,
      );

      const bestShotData = Object.values(shotsByClub)
        .map((clubShots) => {
          const sortedShots = clubShots
            .sort((a, b) => {
              const distanceA = getCarryDistance(a);
              const distanceB = getCarryDistance(b);
              return distanceA > distanceB ? -1 : 1;
            })
            .slice(0, 10);

          // Add dispersion calculation
          const dispersionRadius = calculateDispersionRadius(sortedShots);
          return { sortedShots, dispersionRadius };
        })
        .flat();

      const bestShots = bestShotData.map((shot) => shot.sortedShots).flat();

      const dummySession: Session = {
        date: "",
        selected: true,
        results: bestShots,
      };
      return {
        bestShots,
        averages: calculateAverages({ "1": dummySession }),
        dispersion: bestShotData.map((shot) => ({
          club: getClubName(shot.sortedShots[0]),
          ellipse: calculateDispersionEllipse(shot.sortedShots),
        })),
      };
    }
    return {
      bestShots: [],
      averages: [],
      dispersion: [
        {
          club: null,
          ellipse: { xAxis: 0, yAxis: 0 },
        },
      ],
    };
  }, [sessions]);
};

const calculateDispersionRadius = (shots: GolfSwingData[]): number => {
  // Convert polar to cartesian coordinates
  const points = shots.map((shot) => {
    const distance = getTotalDistance(shot);
    const deviation = getTotalDeviationDistance(shot) || 0;
    const angle = Math.atan2(deviation, distance);

    return {
      x: distance * Math.cos(angle),
      y: distance * Math.sin(angle),
    };
  });

  if (points.length === 0) return 0;

  // Calculate center point
  const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

  // Find maximum distance from center (radius)
  const radius = Math.max(
    ...points.map((point) => {
      const dx = point.x - centerX;
      const dy = point.y - centerY;
      return Math.sqrt(dx * dx + dy * dy);
    }),
  );

  return radius;
};

interface DispersionEllipse {
  xAxis: number;
  yAxis: number;
}

const calculateDispersionEllipse = (
  shots: GolfSwingData[],
): DispersionEllipse => {
  const points = shots.map((shot) => {
    const distance = getTotalDistance(shot);
    const deviation = getTotalDeviationDistance(shot) || 0;
    const angle = Math.atan2(deviation, distance);

    return {
      x: distance * Math.cos(angle),
      y: distance * Math.sin(angle),
    };
  });

  if (points.length === 0) return { xAxis: 0, yAxis: 0 };

  const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

  // Calculate standard deviations with 95% confidence interval (1.96 * 2)
  const confidenceInterval = 1.96 * 2;

  const xDeviations = points.map((p) => Math.abs(p.x - centerX));
  const yDeviations = points.map((p) => Math.abs(p.y - centerY));

  // Use maximum deviations for more realistic dispersion
  const xAxis = Math.max(...xDeviations) * confidenceInterval;
  const yAxis = Math.max(...yDeviations) * confidenceInterval;

  return {
    xAxis,
    yAxis,
  };
};
