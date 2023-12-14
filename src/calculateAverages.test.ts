import testdata from "./testdata.json";

import { expect, test } from "vitest";
import { calculateAverages } from "./calculateAverages";

test("should return an object with a Driver key", () => {
  const result = calculateAverages(testdata);
  expect(result).toMatchSnapshot();
});
