import { describe, expect, it } from "vitest";
import { add } from "../src/math";

describe("add", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("supports negative numbers", () => {
    expect(add(-4, 9)).toBe(5);
  });
});
