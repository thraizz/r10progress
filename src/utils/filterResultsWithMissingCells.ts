import { Sessions } from "../types/Sessions";

export const filterResultsWithMissingCells = (results: Sessions) => {
  return Object.keys(results).reduce((acc, curr) => {
    const session = results[curr];
    const filteredResults = session.results.filter(
      (result) =>
        // we only want rows with atleast 75% of the cells filled
        Object.values(result).filter((value) => !value).length /
          Object.keys(result).length <
        0.25,
    );
    acc[curr] = { ...session, results: filteredResults };
    return acc;
  }, {} as Sessions);
};
