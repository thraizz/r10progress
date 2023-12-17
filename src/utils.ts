import { GolfSwingData } from "./types/GolfSwingData";
import { Session } from "./types/Sessions";

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

  // Third should be Total Distance / Gesamtstrecke
  if (["Total Distance", "Gesamtstrecke"].includes(a)) {
    return -1;
  }
  if (["Total Distance", "Gesamtstrecke"].includes(b)) {
    return 1;
  }

  // Fourth should be Carry Distance / Carry-Distanz
  if (["Carry Distance", "Carry-Distanz"].includes(a)) {
    return -1;
  }
  if (["Carry Distance", "Carry-Distanz"].includes(b)) {
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
