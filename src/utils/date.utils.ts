import { getDate } from "./golfSwingData.helpers";

export const getDateFromResults = (results: any[]) => {
  if (results.length > 0) {
    const date: string =
      getDate(results[0]) || "No date found. Contact me please.";

    return date.split(" ")[0];
  }
  return "";
};

export const getDayFromRow = (row: any) => {
  const date = getDate(row);
  const dayPart = date.split(" ")[0] ?? "";
  return dayPart;
};
