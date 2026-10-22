import { describe, it, expect } from "vitest";
import {
  DEFAULT_THEME_CONFIG,
  DEFAULT_BRANDING,
  appearanceToCarbonTheme,
} from "./types";
import { contrastRatio, meetsWCAG_AA, isValidHexColor } from "./contrast";

describe("theme defaults", () => {
  it("has light appearance by default", () => {
    expect(DEFAULT_THEME_CONFIG.appearance).toBe("light");
  });

  it("has empty branding by default", () => {
    expect(DEFAULT_BRANDING.organizationName).toBe("");
    expect(DEFAULT_BRANDING.primaryColor).toBeUndefined();
    expect(DEFAULT_BRANDING.accentColor).toBeUndefined();
    expect(DEFAULT_BRANDING.logoUrl).toBeUndefined();
  });
});

describe("appearanceToCarbonTheme", () => {
  it("maps light to white by default", () => {
    expect(appearanceToCarbonTheme("light")).toBe("white");
  });

  it("maps dark to g100 by default", () => {
    expect(appearanceToCarbonTheme("dark")).toBe("g100");
  });

  it("maps light raised to g10", () => {
    expect(appearanceToCarbonTheme("light", "raised")).toBe("g10");
  });

  it("maps dark raised to g90", () => {
    expect(appearanceToCarbonTheme("dark", "raised")).toBe("g90");
  });
});

describe("contrast utilities", () => {
  it("calculates correct contrast between black and white", () => {
    const ratio = contrastRatio("#000000", "#ffffff");
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("returns null for invalid hex values", () => {
    expect(contrastRatio("invalid", "#ffffff")).toBeNull();
    expect(contrastRatio("#000000", "rgb(0,0,0)")).toBeNull();
  });

  it("reports black-on-white as AA compliant", () => {
    expect(meetsWCAG_AA("#000000", "#ffffff")).toBe(true);
  });

  it("reports low-contrast pairs as non-compliant", () => {
    expect(meetsWCAG_AA("#777777", "#888888")).toBe(false);
  });

  it("validates hex color format", () => {
    expect(isValidHexColor("#ff0000")).toBe(true);
    expect(isValidHexColor("#FF00AA")).toBe(true);
    expect(isValidHexColor("ff0000")).toBe(false);
    expect(isValidHexColor("#fff")).toBe(false);
    expect(isValidHexColor("#GGGGGG")).toBe(false);
  });
});
