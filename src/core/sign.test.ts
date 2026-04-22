import { describe, test, expect, beforeAll } from "bun:test";
import { siteSignature, verify } from "./sign";

beforeAll(() => {
  process.env.SECRET_KEY = "test-secret";
});

describe("per-site signing", () => {
  test("signature is deterministic", () => {
    expect(siteSignature("example")).toBe(siteSignature("example"));
  });

  test("different sites produce different signatures", () => {
    expect(siteSignature("foo")).not.toBe(siteSignature("bar"));
  });

  test("verify true with correct sig", () => {
    const sig = siteSignature("example")!;
    const p = new URLSearchParams({ sig });
    expect(verify("example", p)).toBe(true);
  });

  test("verify false with wrong sig", () => {
    const p = new URLSearchParams({ sig: "deadbeef" });
    expect(verify("example", p)).toBe(false);
  });

  test("verify false with no sig", () => {
    expect(verify("example", new URLSearchParams())).toBe(false);
  });
});
