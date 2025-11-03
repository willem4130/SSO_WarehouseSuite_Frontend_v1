import { describe, it, expect } from "vitest";

describe("Example Test Suite", () => {
  it("should pass a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });

  it("should work with objects", () => {
    const obj = { name: "Test", value: 42 };
    expect(obj).toHaveProperty("name");
    expect(obj.value).toBeGreaterThan(40);
  });
});
