import testdata from "../testdata.json";

import { expect, test } from "vitest";
import { calculateAverages } from "./calculateAverages";

test("should return an object with a Driver key", () => {
  // @ts-expect-error - testdata is a valid Sessions object
  const result = calculateAverages(testdata);
  expect(result).toMatchSnapshot();
});
