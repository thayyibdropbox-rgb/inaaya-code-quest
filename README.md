# Codeloo 🤖

**Designed by Thayyib · Powered by RIZTHA** — free for everyone, Malayalam & English.

കുട്ടികൾക്കുള്ള സൗജന്യ കോഡിംഗ് സാഹസിക ഗെയിം (മലയാളം / English). കുട്ടി ബ്ലോക്കുകൾ ക്രമീകരിച്ച് പ്രോഗ്രാം ഉണ്ടാക്കും, ▶️ അമർത്തും, റോബോ ആ പ്രോഗ്രാം അനുസരിച്ച് നീങ്ങും.

A free, standalone Malayalam + English coding adventure game for children aged 6 and up. It has no backend, no login, no ads, no tracking and no AI or paid APIs. Everything runs in the browser.

---

## 1. Files

| File | Purpose |
|---|---|
| `index.html` | The whole game: HTML, CSS, JavaScript and the embedded Malayalam font (Baloo Chettan 2, OFL licence) |
| `manifest.webmanifest` | Lets the game be installed to the home screen |
| `sw.js` | Service worker that caches the game so it works offline after the first visit |
| `icon-192.png`, `icon-512.png` | App icons |
| `.nojekyll` | Tells GitHub Pages to serve the files exactly as they are |
| `README.md`, `TESTING.md` | This guide and the test report |

The source is plain JavaScript and needs no build step. To edit it, change `index.html` directly.

---

## 2. Free hosting

### Option A: GitHub Pages (recommended)
1. Create a free account at <https://github.com>.
2. Click **New repository** and name it `inaaya-code-quest`. Set it to **Public**, then click **Create**.
3. Click **uploading an existing file**, drag in **all the files from this folder** (including `.nojekyll`), then click **Commit changes**.
   - On Windows, `.nojekyll` may be hidden. Turn on "Show hidden files", or skip it; the game still works without it.
4. Go to **Settings → Pages**. Under "Build and deployment", set **Source = Deploy from a branch**, **Branch = main**, folder **/ (root)**, then click **Save**.
5. Wait 1–2 minutes. Your public HTTPS link will be:
   `https://<your-username>.github.io/inaaya-code-quest/`

### Option B: Cloudflare Pages
1. Go to <https://pages.cloudflare.com> → **Create a project** → **Direct Upload**.
2. Name it `inaaya-code-quest` and drag in this folder. Click **Deploy**.
3. The link will be `https://inaaya-code-quest.pages.dev`.

### Option C: Netlify Drop
Drag this folder onto <https://app.netlify.com/drop>. You get an HTTPS link right away.

> The game must be opened over **HTTPS** (all three options above give you HTTPS) for offline mode and home-screen install to work.

---

## 3. Install as a home-screen app

- **Android (Chrome):** Open the link → tap the **⋮** menu → **Add to Home screen / Install app**.
- **iPhone/iPad (Safari):** Open the link → tap the **Share** button → **Add to Home Screen**.
- **Windows/Mac (Chrome/Edge):** Click the install icon (⊕) in the address bar.

After the first visit, the game works **without internet**.

---

## 4. How the game works

- **6 worlds:** Jungle 🌴, Desert 🏜️, Ice Land ❄️, Volcano 🌋, Space 🚀, Castle 🏰. There are 2 weeks per world.
- **12 weeks × 5 learning days, plus 2 optional ✨ creative days per week.** Each day follows this pattern:
  1. 📖 **Learn (5 min):** Robo explains the concept in Malayalam, and the English term is shown with its Malayalam meaning.
  2. 🎮 **Play & code (20 min):** 3 missions.
  3. 🗣️ **Explain (5 min):** she explains the idea to a parent, then answers a short quiz. Completing this unlocks the next day.
- **Day 5 of every week is an assessment (🏅).** Week 12 Day 5 is graduation, and she receives a printable certificate 🎓.
- **Blocks:** START, RIGHT, LEFT, UP, DOWN, REPEAT, WAIT, IF, IF/ELSE (ELSE is the second slot of the IF/ELSE block), and EVENT (🔴🔵🟡 buttons).
  - **Tap** a block to add it. The yellow-highlighted area shows where it will go. Tap 🚩 START or a block's header to change that place.
  - **Drag and drop** blocks to reorder them, or to move them into a REPEAT, IF or EVENT block.
  - **✖** removes a block. You can also drag a block back to the palette to remove it.
- Robo runs the program one block at a time and the running block glows. Walls, edges and red lights are checked by collision detection. The block that caused a crash glows red, which helps with debugging.
- **Lives:** 3 hearts. When they run out, Robo "rests" and offers an easier practice puzzle, a hint, or a retry. She is never locked out or scolded.
- **Hints:** 1) a general tip, 2) a specific tip (in debugging missions, the buggy block flashes), 3) a full worked solution. Every hint is recorded.
- **Adaptive difficulty:** two quick independent solves raise the difficulty for that skill. Repeated struggles (hints or 4+ runs) lower it. Losing all 3 hearts offers a simpler practice version.
- **Condition missions change every run** (random traffic light 🚦 and a staircase that rearranges itself). A fixed sequence of moves cannot reliably solve them; she needs real IF/ELSE logic.
- **Game Maker (Weeks 10–12 and creative days):** she places Robo, the chest, coins, obstacles and an optional traffic light, then **must solve her own level with code** before it is saved. Her games stay in 🎨 എന്റെ ഗെയിമുകൾ (My games).
- **Sound:** synthesized sound effects plus soft background music. 🔊 mutes everything; 🎵 on the home screen toggles the music.
- **Pause / speed / reset:** use the ⏸️, 🐢/🐇 and 🔄 buttons.

---

## 5. Parent dashboard 👨‍👧

Tap the 👨‍👧 icon on the home screen. On first use you create a 4-digit PIN.

- **Overview:** learning days, total time, today's time, daily-time chart (last 14 days, 30-min goal), lessons done, missions solved, independent success rate, hints used, weekly progress, and recommended next lessons.
- **Skills:** the 8 skills (Instructions, Sequences, Algorithms, Loops, Events, Conditions, Debugging, Independent problem-solving), each shown as
  🟢 Independent – ചെയ്തു മനസ്സിലാക്കി · 🟡 With Help – സഹായത്തോടെ ചെയ്തു · 🔴 Needs Practice – ഇനിയും പരിശീലിക്കണം · ⚪ not assessed yet.
  **Mastery comes only from the Day 5 assessment challenges, not from finishing levels.** A skill counts as Independent when at least 2 of the last 3 assessment challenges were solved with no hints and in 3 runs or fewer.
- **Missions:** runs (attempts), hints and result for each mission, plus time spent.
- **History:** a day-by-day log of every run, hint, practice and completed day.
- **Settings:** child's name, JSON export/import, printable report (🖨️), change PIN, "unlock all days", and safe reset (you must type RESET and enter the PIN).
- **Forgot the PIN?** Tap "PIN മറന്നോ?" and answer a multiplication question. Only the PIN is removed; progress is kept.

> The PIN is a simple child lock that keeps a 6-year-old out of the dashboard. It is not strong security.

---

## 6. Progress storage ⚠️

- Progress **saves automatically** in the browser's `localStorage`, about every 10 seconds and whenever the app is closed or hidden.
- It is stored **only on this device and in this browser.** It does **not** sync automatically to other phones or computers.
- Clearing browser data, or using private/incognito mode, deletes it. **Export a JSON backup regularly** (Parent → Settings → Export).
- To move to another device: Export on the old device → send the `.json` file to the new device → Parent → Settings → Import.
- Learning time counts only while the game is open and she has interacted in the last 2 minutes. Time on parent screens does not count.

---

## 7. Privacy & safety
No ads, no chat, no social features, no accounts, no analytics or trackers, no AI services, and no external requests (the font is embedded). The only data stored is game progress, on this device.

---

## 8. Known limits
- **Event missions:** she writes the handler for each colour button (🔴→➡️ …), then presses the buttons while the program runs. This is how Scratch-style "when key pressed" events work.
- **IF/ELSE is a single block:** IF has an optional ELSE slot. Use the "IF" palette block for IF alone and the "IF/ELSE" block when both branches are needed.
- **Missions are generated from a fixed seed,** so a mission looks the same each time it is replayed. Practice versions and adaptive difficulty create new variants.
- **Safari private mode** may block localStorage. Use normal browsing mode.
