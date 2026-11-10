import { describe, expect, it } from "vitest";
import { getLibraryUrl } from "@/lib/library-location";

describe("Library deployment paths", () => {
  it("loads the library within the GitHub repository rather than the domain root", () => {
    expect(getLibraryUrl("/calc/", "https://master234534567.github.io"))
      .toBe("https://master234534567.github.io/calc/calc/library.html");
  });

  it("keeps the root-hosted preview library working", () => {
    expect(getLibraryUrl("/", "http://localhost:8080"))
      .toBe("http://localhost:8080/calc/library.html");
  });
});