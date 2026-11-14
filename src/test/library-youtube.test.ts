import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const html = readFileSync(`${process.cwd()}/public/calc/library.html`, "utf8");
const definition = html.match(/function getYouTubeEmbedUrl\(value\) \{[\s\S]*?\n    \}/)?.[0];
if (!definition) throw new Error("YouTube URL parser missing");
const parse = runInNewContext(`${definition}; getYouTubeEmbedUrl`, { URL }) as (value: string) => string | null;
const embed = "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&playsinline=1";

describe("YouTube video links", () => {
  it("loads a watch link as an autoplaying embedded video", () => {
    expect(parse("https://www.youtube.com/watch?v=aqz-KE-bpKQ&list=anything")).toBe(embed);
  });
  it("supports shared short links", () => {
    expect(parse("https://youtu.be/aqz-KE-bpKQ?si=share")).toBe(embed);
  });
  it("supports Shorts and live links", () => {
    expect(parse("https://www.youtube.com/shorts/aqz-KE-bpKQ")).toBe(embed);
    expect(parse("https://www.youtube.com/live/aqz-KE-bpKQ")).toBe(embed);
  });
  it("rejects other hosts, executable links, and invalid video identifiers", () => {
    expect(parse("https://youtube.com.evil.test/watch?v=aqz-KE-bpKQ")).toBeNull();
    expect(parse("javascript:alert(1)")).toBeNull();
    expect(parse("https://www.youtube.com/watch?v=invalid")).toBeNull();
  });
});