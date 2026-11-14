# Website import

## Current library updates

- [x] Add a compact YouTube link-and-play area below Spotify; video rendered on desktop/phone, invalid links rejected, 26 tests pass.
- [x] Start all available cover downloads on library opening; verified 923 eager images and zero lazy images. Actual download time depends on the connection; missing covers still need mappings.
- [ ] Fix Plague gameplay crashes (blocked: previous wasm.rip URL is 404; restored original catalog launcher, but external Unity game remained black in fresh checks and no cure/virus/plane gameplay could be reached).
- [ ] Make Silksong playable on 3–4 GB Chromebooks (blocked: external launcher downloads a 1.94 GiB ZIP into memory; requires control of upstream loader/payload and target-device testing, not a library RAM setting).
- [ ] Sync missing cover mappings and saved addition artwork without modifying PokéRogue files.
- [ ] Resize library game tiles without changing game launch behavior.
- [ ] Add Spotify listening area with clear signed-out playback limits.
- [ ] Check whether All 22 through Ultraviolet can run on the existing static host; omit if unsupported.
- [ ] Verify artwork, music, and unchanged calculator-to-library flow; report repository sync limits.

- [x] Import http://master234534567.github.io/calc and confirm the build.
- [x] Observe the source page and controls on desktop and phone; save evidence.
- [x] Replay the same checks in the preview and record evidence.
- [x] Repair confirmed mismatches, rerun checks, and report any limitations.

## Library follow-up

- [x] Import the library page and its required data files.
- [x] Reconnect the calculator's unchanged `0000` trigger to the local library.
- [x] Verify the library loads and the complete calculator-to-library flow works.

## Library expansion

- [ ] Verify All 22 Pokémon, Kirka.io, and 40 additional playable embed URLs.
- [ ] Append the verified games without changing existing entries or the `0000` unlock.
- [ ] Add clean titles, categories, and working artwork for the additions.
- [ ] Replay the library flow on desktop and phone and run project checks.

## GitHub Pages deployment

- [x] Add a static deployment workflow for the GitHub site.
- [x] Make calculator and manifest paths work under a repository subfolder.
- [x] Verify the unchanged 0000 popup and library on desktop and phone.
- [ ] Run the workflow on GitHub (requires the user to enable GitHub Actions as the Pages source).

## Four requested game additions

- [ ] Resume the four additions with confirmed playable links and explicit notices for unavailable deployments.
- [ ] Resolve playable URLs and PNG artwork for Plague, Grand V, Julius, and Clover Pit.
- [ ] Append additions without changing the existing manifest entries or 0000 unlock.
- [ ] Reproduce Clover Pit's loading stall and apply a verified remedy where possible.
- [ ] Verify the added games and artwork through the library.

## Requested replacements and graphics repair

- [x] Replace the former Grand V slot with embedded PokéRogue and its original logo; login screen verified on desktop and phone.
- [ ] Repair Plague's reported black graphics (blocked: original external launcher now reproduced a black canvas; game payload/source fixes and verified gameplay are still needed).
- [x] Skip Breath of the Wild at the user's request; no verified release link supplied.
- [x] Test changed entries through the unchanged 0000 popup on desktop and phone; 16 tests pass.
- [x] Pin Bun installation and explicitly run Vitest through the package script; current tests pass (actual GitHub run remains unverified).
- [x] Add 815 original cover mappings after verifying all 775 distinct image URLs.
