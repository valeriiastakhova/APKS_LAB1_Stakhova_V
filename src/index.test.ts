import { describe, expect, it } from "vitest";
import { helloWorld } from "./index";

describe("helloWorld", () => {
  it("returns the greeting", () => {
    expect(helloWorld()).toBe("Hello, World!");
  });
});
