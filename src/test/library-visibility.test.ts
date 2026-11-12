import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const html = readFileSync(`${process.cwd()}/public/calc/library.html`, "utf8");
const extract = (pattern: RegExp) => {
  const match = html.match(pattern);
  if (!match) throw new Error("Library filter definition missing");
  return match[0];
};
const isNewGame = runInNewContext([
  extract(/const newGameKeys = new Set\([^;]+;/),
  extract(/const newGamePaths = new Set\([^;]+;/),
  extract(/function normalizeGameName\(name\) \{[\s\S]*?\n    \}/),
  extract(/function isNewGame\(title, filename = ""\) \{[\s\S]*?\n    \}/),
  "isNewGame",
].join("\n")) as (title: string, filename?: string) => boolean;

describe("New Games visibility", () => {
  it("recognizes the accented PokéRogue title", () => {
    expect(isNewGame("PokéRogue")).toBe(true);
  });
  it("keeps PokéRogue visible after any display-name change", () => {
    expect(isNewGame("A completely different name", "./additions/pokerogue/index.html")).toBe(true);
  });
  it("does not mark unrelated games as new", () => {
    expect(isNewGame("2048", "gamelist/2048/index.html")).toBe(false);
  });
});