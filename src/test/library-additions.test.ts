import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(`${process.cwd()}/public/calc/${path}`, "utf8");
const games = JSON.parse(read("games-manifest.json")) as string[];
const art = JSON.parse(read("game-art-manifest.json")) as Record<string, string | null>;

describe("Four requested library additions", () => {
  it("appends exactly the four additions after all 972 original games", () => {
    expect(games).toHaveLength(976);
    expect(games.slice(972)).toEqual([
      "https://wasm.rip/files/plauge/index.html",
      "./additions/grand-v.html",
      "./additions/julius.html",
      "./additions/clover-pit.html",
    ]);
    expect(games[971]).toBe("gamelist/60-Seconds/index.html");
  });

  it("maps all four additions to PNG artwork usable outside Lovable hosting", () => {
    for (const game of games.slice(972)) {
      const url = new URL(art[game] || "invalid");
      expect(url.protocol).toBe("https:");
      expect(url.pathname.endsWith(".png")).toBe(true);
    }
  });
});