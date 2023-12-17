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
