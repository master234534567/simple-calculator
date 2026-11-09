# Website importer observation ledger

Source: `http://master234534567.github.io/calc`
Imported route: `/`
Preview: `http://localhost:8080/`

The page contains one calculator section and no navigation, nested menus, hero CTA, media controls, or scroll-dependent content. No images, fonts, video, canvas, or other media assets were required. There are no static media fallbacks, normal-flow substitutions, or motion gaps.

## Desktop — 1280 × 1800

| Trigger | Expected visible result | Source result | Preview result | Status | Evidence |
|---|---|---|---|---|---|
| Initial load | Centered calculator displaying `0` | Matched reference | Same 380 × 522 panel at x=450, y=639 | Pass | `source-desktop-initial.png`, `preview-desktop-initial.png` |
| `12 + 3 =` | `15` | `15` | `15` | Pass | `source-observations.json`, `preview-observations-after-repair.json` |
| `5 − 8 =` | `-3` | `-3` | `-3` | Pass | Same JSON reports |
| `7 × 8 =` | `56` | `56` | `56` | Pass | Same JSON reports |
| `9 ÷ 2 =` | `4.5` | `4.5` | `4.5` | Pass | Same JSON reports |
| `1.2 + 3.4 =` | `4.6` | `4.6` | `4.6` | Pass | Same JSON reports |
| `123`, Backspace | `12` | `12` | `12` | Pass | `source-desktop-backspace.png`, `preview-desktop-backspace.png` |
| `1`, C | `0` | `0` | `0` | Pass | JSON reports |
| Keyboard `12+3`, Enter | `15` | `15` | `15` | Pass | `source-popup-observations.json`, `preview-desktop-keyboard-result.png` |
| Keyboard Escape after a result | `0` | `0` | `0` | Pass | `preview-keyboard-popup-observations.json` |
| Keyboard `123`, Backspace | `12` | `12` | `12` | Pass | Same JSON reports |
| Keyboard Delete | `0` | `0` | `0` | Pass | Same JSON reports |
| Enter `0000` | Open the same-site library destination | Opened and rendered the library in a popup | Opened `/calc/library.html` on the preview origin | Pass for destination; library page not imported | `source-desktop-popup-loaded.png`, `preview-desktop-library-destination.png` |
| Wheel down and back up | No scrolling or revealed content | No scrollable area or movement | No scrollable area or movement | Pass | `source-desktop-after-wheel.png`, `preview-desktop-after-wheel.png` |

## Phone — 390 × 844

| Trigger | Expected visible result | Source result | Preview result | Status | Evidence |
|---|---|---|---|---|---|
| Initial load | Centered calculator displaying `0` | Matched reference | Same 351 × 504 panel at x=19.5, y=170 | Pass | `source-phone-initial.png`, `preview-phone-initial.png` |
| `12 + 3 =` | `15` | `15` | `15` | Pass | `source-observations.json`, `preview-observations-after-repair.json` |
| `5 − 8 =` | `-3` | `-3` | `-3` | Pass | Same JSON reports |
| `7 × 8 =` | `56` | `56` | `56` | Pass | Same JSON reports |
| `9 ÷ 2 =` | `4.5` | `4.5` | `4.5` | Pass | Same JSON reports |
| `1.2 + 3.4 =` | `4.6` | `4.6` | `4.6` | Pass | Same JSON reports |
| `123`, Backspace | `12` | `12` | `12` | Pass | `source-phone-backspace.png`, `preview-phone-backspace.png` |
| `1`, C | `0` | `0` | `0` | Pass | JSON reports |
| Keyboard `12+3`, Enter | `15` | `15` | `15` | Pass | `source-popup-observations.json`, `preview-phone-keyboard-result.png` |
| Keyboard Escape after a result | `0` | `0` | `0` | Pass | `preview-keyboard-popup-observations.json` |
| Keyboard `123`, Backspace | `12` | `12` | `12` | Pass | Same JSON reports |
| Keyboard Delete | `0` | `0` | `0` | Pass | Same JSON reports |
| Enter `0000` | Open the same-site library destination | Opened and rendered the library in a popup | Opened `/calc/library.html` on the preview origin | Pass for destination; library page not imported | `source-phone-popup-loaded.png`, `preview-phone-library-destination.png` |
| Wheel down and back up | No scrolling or revealed content | No scrollable area or movement | No scrollable area or movement | Pass | `source-phone-after-wheel.png`, `preview-phone-after-wheel.png` |

## Repair and validation

- Confirmed mismatch: the initially imported buttons were inert.
- Repaired all calculator controls in `src/routes/index.tsx` with state-driven JSX handlers and preserved the imported wrappers, ordering, classes, and styling.
- Mirrored the source keyboard controls and its `0000` launch trigger. The launch keeps the unimported same-site path `/calc/library.html` on the preview origin instead of linking back to the source website.
- Nine focused behavior tests pass in `src/test/calculator.test.ts`.
- Latest preview build passes; preview page errors: none.

## Library follow-up repair

The interactive library is now included at `public/calc/library.html`, with the unchanged 972-entry `games-manifest.json` and the existing `game-art-manifest.json`. The calculator's `0000` trigger again opens an `about:blank` tab and writes the library into it. Relative game and artwork URLs continue to use the original site, while both manifests return 200 from the local app.

Desktop and phone verification passed for all 972 entries, search, category filters, opening a sample 2048 game, and returning to the library. Evidence: `fixed-library-observations.json`, `fixed-library-desktop.png`, `fixed-library-phone.png`, and `fixed-library-desktop-game.png`.
