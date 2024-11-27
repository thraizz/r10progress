import { describe, expect, test } from "vitest";
import { reduceSessionToDefinedValues } from "./utils.ts";
import { Session } from "../types/Sessions.ts";

describe("reduceSessionToDefinedValues", () => {
  test("should remove undefined values in session results", () => {
    const session = {
      results: [
        {
          "Ball Speed": 100,
          "Carry Distance": undefined,
          "Smash Factor": 1.5,
        },
        {
          "Ball Speed": 200,
          "Carry Distance": undefined,
          "Smash Factor": 1.5,
        },
      ],
    } as unknown as Session;

    const result = reduceSessionToDefinedValues(session);
    expect(result).toEqual({
      results: [
        {
          "Ball Speed": 100,
          "Smash Factor": 1.5,
        },
        {
          "Ball Speed": 200,
          "Smash Factor": 1.5,
        },
      ],
    });
  });
});
