import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const html = readFileSync(`${process.cwd()}/public/calc/library.html`, "utf8");
const definition = html.match(/function getSpotifyEmbedUrl\(value\) \{[\s\S]*?\n    \}/)?.[0];
if (!definition) throw new Error("Spotify URL parser missing");
const parse = runInNewContext(`${definition}; getSpotifyEmbedUrl`, { URL }) as (value: string) => string | null;

describe("Spotify listening links", () => {
  it("accepts a shared Spotify track without forwarding query parameters", () => {
    expect(parse("https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=share"))
      .toBe("https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator");
  });
  it("accepts a localized playlist link", () => {
    expect(parse("https://open.spotify.com/intl-en/playlist/37i9dQZF1DX4sWSpwq3Li"))
      .toBe("https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3Li?utm_source=generator");
  });
  it("rejects non-Spotify hosts and executable URLs", () => {
    expect(parse("https://open.spotify.com.evil.test/track/4cOdK2wGLETKBW3PvgPWqT")).toBeNull();
    expect(parse("javascript:alert(1)")).toBeNull();
  });
});