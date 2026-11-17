# Testing report – INAAYA – THE CODE QUEST

Tested on 17 Nov 2026 with automated **Playwright (Chromium)** tests. Viewports: mobile 390×844 (touch enabled), tablet 820×1180, desktop 1366×800.

## A. Level engine (all curriculum missions)
Every generated mission in all 12 weeks was tested: **1980 levels**, covering each mission at difficulty levels 0–3 with 3 variants each.
- Each level's reference solution was run through the real game engine and **reached the goal in every case** (0 failures). Random levels (🚦 lights and changing staircases) were each run 25 times.
- Every debugging mission (312 checked) **fails with its buggy starter program**, so there is always a real bug to find.
- Mix of mission types tested: {'seq': 660, 'loop': 336, 'event': 228, 'light': 204, 'stair': 240, 'debug': 312}.
- Conditions really need logic: in 200 runs, a light level played without IF (wait-then-move) won only 7 times, and a fixed move sequence on the changing staircase won only 74 times. The game also requires an IF block before these missions can run.

## B. End-to-end UI tests (58/58 passed, 0 JavaScript errors)
| Result | Test |
|---|---|
| ✅ | home renders Malayalam |
| ✅ | Malayalam font loaded |
| ✅ | day2 locked initially |
| ✅ | w1d1 mission 1 win via tap-built program |
| ✅ | w1d1 mission 2 win via tap-built program |
| ✅ | w1d1 mission 3 win via tap-built program |
| ✅ | day complete + next day unlocked |
| ✅ | mission records tracked |
| ✅ | progress persists after reload |
| ✅ | home now points to W1 D2 |
| ✅ | drag palette→program adds block |
| ✅ | drag inserts before existing block (ordering) |
| ✅ | drag reorders program blocks |
| ✅ | drag block to palette removes it |
| ✅ | ✖ tap removes block |
| ✅ | touch tap adds block |
| ✅ | collision detected → friendly fail |
| ✅ | hint shown + counted |
| ✅ | obstacle maze solved after retry |
| ✅ | with-help recorded |
| ✅ | REPEAT mission W4D1M1 solved |
| ✅ | REPEAT mission W4D2M2 solved |
| ✅ | REPEAT mission W4D4M1 solved |
| ✅ | max-blocks rule blocks long program (forces loop) |
| ✅ | IF/ELSE mission W6D1M2 solved |
| ✅ | IF/ELSE mission W6D2M1 solved |
| ✅ | IF/ELSE mission W6D3M1 solved |
| ✅ | IF/ELSE mission W6D4M3 solved |
| ✅ | EVENT mission W5D1M1 solved by pressing event buttons |
| ✅ | EVENT mission W5D2M2 solved by pressing event buttons |
| ✅ | debug mission starts with buggy prefilled program |
| ✅ | buggy program fails |
| ✅ | hint 2 flashes the buggy block |
| ✅ | fixed program wins (debugging) |
| ✅ | assessment → Instructions = Independent |
| ✅ | level completion alone does not grant mastery (Sequences not assessed) |
| ✅ | maker enforces requirements |
| ✅ | own game solved → saved |
| ✅ | PIN created → dashboard |
| ✅ | skills tab shows 3 categories |
| ✅ | missions table lists attempts |
| ✅ | history logged |
| ✅ | wrong PIN rejected |
| ✅ | JSON export |
| ✅ | reset with confirmation clears progress |
| ✅ | JSON import restores progress |
| ✅ | printable report generated |
| ✅ | learning timer counts active seconds |
| ✅ | service worker active |
| ✅ | works offline after first load |
| ✅ | world 1 board renders |
| ✅ | world 3 board renders |
| ✅ | world 5 board renders |
| ✅ | world 7 board renders |
| ✅ | world 9 board renders |
| ✅ | world 11 board renders |
| ✅ | no horizontal overflow on mobile |
| ✅ | desktop 2-column layout |

## C. Manual visual checks (screenshots)
Home, learn card, play screen, win and fail modals, REPEAT, IF/ELSE, Game Maker, parent dashboard and skills, all 6 worlds, desktop 2-column layout and tablet layout were reviewed. Malayalam text renders correctly with the embedded Baloo Chettan 2 font.

## D. Not covered by automated tests
- Real iPhone/Android hardware was not tested (only emulated touch in Chromium). Please try the game on her actual device.
- Audio output was not checked by ear. The Web Audio code runs without errors.
- Print layout was triggered but not physically printed.
