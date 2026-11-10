/** Keep library files beside the exported app, including GitHub repository sites. */
export function getLibraryUrl(appBase: string, origin: string): string {
  return new URL(`${appBase.replace(/\/$/, "")}/calc/library.html`, origin).href;
}