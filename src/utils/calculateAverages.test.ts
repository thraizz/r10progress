import testdata from "../testdata.json";

import { describe, expect, test } from "vitest";
import { calculateAverages } from "./calculateAverages";

describe("calculateAverages", () => {
  test("should return averages", () => {
    // @ts-expect-error - testdata is a valid Sessions object
    const result = calculateAverages(testdata);
    expect(result).toMatchSnapshot();
  });

  test("should return less strokes when using IQR", () => {
    // @ts-expect-error - testdata is a valid Sessions object
    const wholeResult = calculateAverages(testdata);
    // @ts-expect-error - testdata is a valid Sessions object
    const result = calculateAverages(testdata, true);

    expect(result).toMatchSnapshot();

    const notIqrPW = wholeResult.find((club) => club.name === "Pitching Wedge");
    expect(notIqrPW).toBeDefined();

    const iqrPW = result.find((club) => club.name === "Pitching Wedge");
    expect(iqrPW).toBeDefined();

    expect(iqrPW?.count).toBeLessThan(notIqrPW?.count || 0);
  });
});

describe("useBestShots", () => {
  test("should return the best shots", () => {
    // @ts-expect-error - testdata is a valid Sessions object
    const result = calculateAverages(testdata);
    expect(result).toMatchSnapshot();
  });
});
