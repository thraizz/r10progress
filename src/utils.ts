import dayjs from "dayjs";
import {
  ClubDataForTable,
  YFieldValue,
} from "./components/panels/AveragesPerSessionGraph";
import { GolfSwingData } from "./types/GolfSwingData";
import { Session } from "./types/Sessions";
import { AveragedSwing, AveragedSwingRecord } from "./utils/calculateAverages";

export const sortGolfSwingKeysForHeader = (a: string, b: string) => {
  // We want to prioritize Carry Distance, Total Distance, Club Name, Ball Spped, and Date
  // over all other keys. This is because these keys are the most important ones to
  // compare swings.
  const prioritizedKeys = [
    "Carry Distance",
    "Carry-Distanz",
    "Total Distance",
    "Gesamtstrecke",
    "Club Type",
    "Club Speed",
    "Schl.gsch.",
    "Schlägerart",
    "Ball Speed",
    "Ballgeschwindigkeit",
    "Date",
    "Datum",
  ];

  // The first key should be Date / Datum or count for averages
  if (["Date", "Datum", "count"].includes(a)) {
    return -1;
  }
  if (["Date", "Datum", "count"].includes(b)) {
    return 1;
  }

  // The second key should be Club Type / Schlägerart, we check this first
  if (["Club Type", "Schlägerart", "name"].includes(a)) {
    return -1;
  }
  if (["Club Type", "Schlägerart", "name"].includes(b)) {
    return 1;
  }

  // Third should be Club Speed / Schl.gsch. / Ball Speed / Ballgeschwindigkeit
  if (
    ["Club Speed", "Schl.gsch.", "Ball Speed", "Ballgeschwindigkeit"].includes(
      a,
    )
  ) {
    return -1;
  }
  if (
    ["Club Speed", "Schl.gsch.", "Ball Speed", "Ballgeschwindigkeit"].includes(
      b,
    )
  ) {
    return 1;
  }

  // Fourth should be Total Distance / Gesamtstrecke
  if (["Total Distance", "Gesamtstrecke"].includes(a)) {
    return -1;
  }
  if (["Total Distance", "Gesamtstrecke"].includes(b)) {
    return 1;
  }

  // Fifth should be Carry Distance / Carry-Distanz
  if (["Carry Distance", "Carry-Distanz"].includes(a)) {
    return -1;
  }
  if (["Carry Distance", "Carry-Distanz"].includes(b)) {
    return 1;
  }

  // Sixth should be Smash Factor / Smash-Faktor
  if (["Smash Factor", "Smash-Faktor"].includes(a)) {
    return -1;
  }
  if (["Smash Factor", "Smash-Faktor"].includes(b)) {
    return 1;
  }

  // If both keys are in the list of prioritized keys, sort them alphabetically
  if (prioritizedKeys.includes(a) && prioritizedKeys.includes(b)) {
    return a.localeCompare(b);
  }

  if (prioritizedKeys.includes(a)) {
    return -1;
  }
  if (prioritizedKeys.includes(b)) {
    return 1;
  }

  // If both keys are not in the list of prioritized keys, sort them alphabetically
  return a.localeCompare(b);
};

export const reduceSessionToDefinedValues: (session: Session) => Session = (
  session,
) => {
  const fieldValueCount = session.results.reduce((accumulator, curr) => {
    // @ts-expect-error - We know that the type will be correct
    Object.keys(curr).forEach((key: keyof GolfSwingData) => {
      // @ts-expect-error - We know that the type will be correct
      if (accumulator[key] === undefined) accumulator[key] = 0;
      if (curr[key] !== undefined && curr[key] !== null)
        // @ts-expect-error - We know that the type will be correct
        accumulator[key] = (accumulator[key] ?? 0) + 1;
    });
    return accumulator;
  }, {} as GolfSwingData);

  const fieldsWithoutValues = Object.keys(fieldValueCount).filter(
    (key) => fieldValueCount[key as keyof GolfSwingData] === 0,
  );

  const reducedResults = session.results.map((result) => {
    const newResult = { ...result };
    fieldsWithoutValues.forEach((key) => {
      delete newResult[key as keyof GolfSwingData];
    });
    return newResult;
  });

  return { ...session, results: reducedResults };
};
// Get pairs of average / session date
export const getPairsForYfield: (
  averages: AveragedSwingRecord[],
  yField: keyof AveragedSwing,
) => ClubDataForTable = (sessions, yField) => {
  return sessions
    .map((session) =>
      session.averages.map((x) => ({
        x: parseDate(session.date),
        y: x[yField],
        club: x.name,
      })),
    )
    .flat();
};

// Parse date to ISO8601 format using dayjs
// might be english or german format
export const parseDate = (input: string) => {
  if (input.includes("/")) {
    return dayjs(input, "MM/DD/YY").format("YYYY-MM-DD");
  } else if (input.includes(".")) {
    return dayjs(input, "DD.MM.YY", "de").format("YYYY-MM-DD");
  } else {
    return input;
  }
};
