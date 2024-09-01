export const getDateFromResults = (results: any[]) => {
  if (results.length > 0) {
    const date: string =
      results[0].Date ||
      results[0].Datum ||
      "No date found. Contact me please.";

    return date.split(" ")[0];
  }
  return "";
};

export const getDayFromRow = (row: any) => {
  const date = row["Date"] || row["Datum"] || "";
  const dayPart = date.split(" ")[0] ?? "";
  return dayPart;
};
