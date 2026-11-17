/* Codeloo 🤖 — kids coding adventure. Designed by Thayyib · Powered by RIZTHA. Vanilla JS, no backend, no tracking. */
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const todayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function RNG(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hashStr(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

/* ================= CONTENT ================= */
const WORLDS = [
  { id: 'jungle', name: 'കാട്', en: 'Jungle', icon: '🌴', ob: '🌳', bg: '#bfeea6', tile: '#eafbe0', edge: '#7cc35b' },
  { id: 'desert', name: 'മരുഭൂമി', en: 'Desert', icon: '🏜️', ob: '🌵', bg: '#f7dd9c', tile: '#fff3d1', edge: '#d8b25a' },
  { id: 'ice', name: 'മഞ്ഞുനാട്', en: 'Ice Land', icon: '❄️', ob: '🧊', bg: '#cbeaff', tile: '#f1faff', edge: '#7fc0ea' },
  { id: 'volcano', name: 'അഗ്നിപർവ്വതം', en: 'Volcano', icon: '🌋', ob: '🪨', bg: '#ffc9ae', tile: '#ffece2', edge: '#e2825c' },
  { id: 'space', name: 'ബഹിരാകാശം', en: 'Space', icon: '🚀', ob: '☄️', bg: '#c9c4ff', tile: '#eceaff', edge: '#8a80e8' },
  { id: 'castle', name: 'കോട്ട', en: 'Castle', icon: '🏰', ob: '🧱', bg: '#f3c9ec', tile: '#fdeefa', edge: '#c77cbb' }
];
const SKILLS = {
  instructions: ['Instructions', 'നിർദ്ദേശങ്ങൾ'], sequences: ['Sequences', 'നിർദ്ദേശങ്ങളുടെ ക്രമം'], algorithms: ['Algorithms', 'പ്രവർത്തനപദ്ധതി'],
  loops: ['Loops', 'ആവർത്തനം'], events: ['Events', 'സംഭവം'], conditions: ['Conditions', 'വ്യവസ്ഥ'],
  debugging: ['Debugging', 'തെറ്റ് കണ്ടെത്തി തിരുത്തൽ'], independent: ['Independent problem-solving', 'സ്വന്തമായി പ്രശ്നപരിഹാരം']
};
const STATUS = {
  indep: ['Independent', 'ചെയ്തു മനസ്സിലാക്കി', '🟢'], help: ['With Help', 'സഹായത്തോടെ ചെയ്തു', '🟡'],
  practice: ['Needs Practice', 'ഇനിയും പരിശീലിക്കണം', '🔴'], none: ['Not assessed yet', 'ഇതുവരെ പരിശോധിച്ചിട്ടില്ല', '⚪']
};
const ALL4 = ['R', 'L', 'U', 'D'];
const PAL = {
  r: ['R'], rl: ['R', 'L'], ud: ['U', 'D'], m4: ALL4, loop: [...ALL4, 'REPEAT'],
  evt: [...ALL4, 'REPEAT', 'EVENT'], cond: [...ALL4, 'REPEAT', 'WAIT', 'IF', 'IFELSE'],
  all: [...ALL4, 'REPEAT', 'WAIT', 'IF', 'IFELSE', 'EVENT']
};
// mission spec helpers
const SQ = (o) => ({ k: 'seq', ...o });
const LP = (o) => ({ k: 'loop', ...o });
const EV = (o) => ({ k: 'event', ...o });
const LT = (o) => ({ k: 'light', ...o });
const ST = (o) => ({ k: 'stair', ...o });
const DB = (o) => ({ k: 'debug', ...o });
const MK = (o) => ({ k: 'make', ...o });
const ASSESS_LEARN = 'ഇന്ന് ഒരു ചെറിയ പരീക്ഷണ ദൗത്യം! 🏅 സ്വന്തമായി ചിന്തിച്ച് ശ്രമിച്ചു നോക്കൂ. തെറ്റിയാൽ ഒട്ടും കുഴപ്പമില്ല — വീണ്ടും ശ്രമിക്കാം 💪';
const LOOPU = { stair: [['R', 'U'], ['R', 'D'], ['U', 'R']], three: [['R', 'R', 'U'], ['R', 'U', 'U'], ['R', 'R', 'D'], ['U', 'U', 'R']], line: [['R'], ['U'], ['D'], ['L']] };

const ASSESS_EN = 'Today is a small test mission! 🏅 Think and try on your own. Mistakes are totally fine — you can try again 💪';
const EN_W = [
 { quiz: ['What is coding?', ['Giving instructions to a robot', 'Singing a song', 'Sleeping']], tell: 'Tell Dad or Mum: "Coding means telling a robot what to do."', days: [
  ['Meet Robo', 'Hello! I am Robo 🤖. I do exactly what you tell me. Telling a computer or robot what to do is called Coding. Put a ➡️ block and I will move one square to the right.'],
  ['Left and Right', 'Each block is one Instruction. ⬅️ means go left, ➡️ means go right. Count the squares with your finger!'],
  ['Up and Down', '⬆️ means go up, ⬇️ means go down. Where is the treasure chest — up or down? Look first, then place your blocks.'],
  ['Four Directions', 'Now you can use all four directions! The set of blocks you make is called a Program. Trace the path with your finger first, then add blocks.']] },
 { quiz: ['What happens if you change the order of the blocks?', ['Robo takes a different path', 'Nothing happens', 'Robo sings a song']], tell: 'Explain with an example: "If the Sequence is wrong, Robo goes the wrong way."', days: [
  ['A Turning Path', 'A Sequence is the order of instructions. The order matters! First ➡️ then ⬆️ — change the order and the path changes.'],
  ['Twists and Turns', 'The path turns many times. Every turn needs a new direction block. Place each Step carefully.'],
  ['Obstacles', 'Don\'t bump into the trees! 🌳 Robo cannot move into a square with an Obstacle. Go around it.'],
  ['Collect the Coins', 'Pick up every 🪙 coin before reaching the chest (the Goal). Just walk over a coin to collect it.']] },
 { quiz: ['What is an Algorithm?', ['A step-by-step plan', 'An animal', 'A colour']], tell: 'Tell your Algorithm for brushing teeth, step by step: 1. Take the brush, 2. …', days: [
  ['Plan First', 'An Algorithm is a step-by-step plan for doing a job. Look at the path, make a plan, then press ▶️.'],
  ['Desert Maze', 'A Maze has many paths. Find the right one — watch out for the 🌵 cactus!'],
  ['A Long Journey', 'This is a long path. Think in small parts: first to this coin, then the next one, then the chest.'],
  ['The Best Path', 'Can you get there with fewer blocks? A good Algorithm is short and clear. These missions have a block limit ⭐']] },
 { quiz: ['How can you write ➡️➡️➡️➡️ in a shorter way?', ['🔁 REPEAT 4 times ➡️', '⬅️⬅️', '⏳ WAIT']], tell: 'Name something you repeat every day (a Loop) — e.g. "I brush my teeth every morning."', days: [
  ['The REPEAT Block', 'A Loop does the same thing many times. Instead of ➡️➡️➡️➡️, put one ➡️ inside 🔁 REPEAT 4!'],
  ['Climb the Stairs', '➡️⬆️ ➡️⬆️ ➡️⬆️ … Can you see a part that repeats? Put that part inside 🔁 REPEAT.'],
  ['Big Patterns', 'Find the Pattern — the shape that repeats. Once you spot it, put it in a Loop.'],
  ['Two Loops', 'A program can have two REPEAT blocks: the first one goes one way, the second goes another way.']] },
 { quiz: ['What is an Event?', ['Code that runs when something happens', 'A robot that always sleeps', 'A coin']], tell: 'Tell an Event at home — e.g. "When the doorbell rings, we open the door."', days: [
  ['When a Button Is Pressed', 'An Event means "when this happens, do this". Put what Robo should do inside the ⚡ EVENT block for 🔴. Press ▶️, then press 🔴 to play!'],
  ['Two Buttons', '🔴 does one job, 🔵 does another. Pressing a button is the Trigger. Each Event has its own little program.'],
  ['Buttons and Loops', 'You can put REPEAT inside an Event. One press and Robo moves many squares!'],
  ['Three Buttons', '🔴 🔵 🟡 – three Events. This is how players control characters in games!']] },
 { quiz: ['If the light is 🔴 red, what should Robo do?', ['⏳ Wait', 'Run', 'Jump']], tell: 'Say an IF–ELSE — e.g. "IF it rains, I take an umbrella, ELSE I wear a cap."', days: [
  ['Traffic Light', 'A Condition is a question with a yes or no answer. IF the light is 🟢 green, go. ELSE ⏳ wait. Waiting changes the light!'],
  ['Loops and Conditions', 'The light changes after every move. Put IF inside REPEAT and Robo checks the light every time.'],
  ['Is Something in the Way?', 'The path changes every time! "IF there is an obstacle on the right, go ⬆️, ELSE go ➡️" — a Robo that decides can follow any path.'],
  ['Smart Robo', 'A big staircase! The same program must win on every path. That is the power of Conditions 💡']] },
 { quiz: ['What is a Bug?', ['A mistake in a program', 'A butterfly', 'A prize']], tell: 'Tell one Bug you found today and how you fixed it.', days: [
  ['Find the Bug', 'A Bug is a mistake in a program. Debugging means finding and fixing it. Press ▶️ and watch where Robo goes wrong — the bug is near the glowing block!'],
  ['The Missing Block', 'One block is missing or extra. Watch Robo walk and count the squares!'],
  ['A Bug in the Loop', 'How many times should it REPEAT? The wrong number makes Robo stop early. Press ▶️ to Test after every change.'],
  ['A Bug in the Condition', 'Are the right blocks inside IF and ELSE? Go on 🟢 green, wait on 🔴 red.']] },
 { quiz: ['What happens if you put IF inside REPEAT?', ['Robo checks every time', 'Robo stops', 'Nothing happens']], tell: 'Which do you like most — Loops, Conditions or Debugging? Tell them why.', days: [
  ['Loops and Coins', 'Use everything you have learned! Collect all the coins on a repeating path.'],
  ['Thinking Robo', 'The path changes every time. Loop + Condition = a smart Robo!'],
  ['Lights on a Turning Path', 'The path turns once and has a traffic light. Two REPEATs, each with an IF!'],
  ['Master Debugger', 'Find bugs in bigger programs. Stay calm and check one block at a time.']] },
 { quiz: ['What is special about an interactive story?', ['We take part in the story', 'We only listen', 'There is no story']], tell: 'Tell today\'s story in your own words — who did Robo help, and how?', days: [
  ['Save the Kitten', 'A kitten 🐱 is lost in space! Your code moves the story forward. That is an Interactive story.'],
  ['Searching for Stars', 'Robo, our Character, brings fallen stars ⭐ back to the sky.'],
  ['An Alien Friend', 'On a new planet Robo meets a friend 👽. Each mission is a Scene in the story.'],
  ['Going Home', 'Back home in the rocket 🚀! You finish the Ending of the story.']] },
 { quiz: ['What does a game need most?', ['A player and a goal', 'Nothing', 'Only a pen']], tell: 'Show your level to Dad or Mum and explain its Rules.', days: [
  ['Parts of a Game', 'A game needs a player 🤖, a goal 🎁, obstacles and rewards 🪙. Today you make your own level! Then you code it and win.'],
  ['Add Coins', 'Rewards make games fun. Put 2 coins in your level.'],
  ['Add Obstacles', 'Obstacles make a game a Challenge. But there must still be a way to win!'],
  ['A Loop Level', 'Make a level you can win with REPEAT — for example a straight path or stairs.']] },
 { quiz: ['How do you make a good game?', ['Build it, play-test it, fix it', 'Never test it', 'Only add obstacles']], tell: 'Let Dad or Mum play your mini-game! If they need help, give them a hint.', days: [
  ['My First Mini-game', 'Today you make a whole Mini-game: 3 coins, obstacles and a treasure chest.'],
  ['Traffic Light Game', 'Add a 🚦 light so the player must use IF — that is your game\'s Rule.'],
  ['Treasure Hunt', 'A treasure hunt with more coins! Playtest it after you build it — can you win?'],
  ['Family Game Time', 'A good game is fun for others too. Make a game that needs REPEAT and let your family play!']] },
 { quiz: ['What are you now?', ['A coder! 👩‍💻', 'I learned nothing', 'A robot']], tell: 'Say it proudly: "I made my own game!" 🎉', days: [
  ['Project Plan', 'Your big final Project! First a small plan: where do you start? Where are the coins? Where are the obstacles?'],
  ['Build the Game', 'Time to Build! Make a game that needs REPEAT.'],
  ['Add a Challenge', 'Add a new Feature to your game: a 🚦 traffic light.'],
  ['Test and Polish', 'Game makers test and fix many times (Polish). Make your best game and give it a name!']] }
];
const LG = () => (typeof S !== 'undefined' && S && S.lang) || 'ml';
const T = (m, e) => LG() === 'en' ? e : m;
const tx = v => Array.isArray(v) ? (LG() === 'en' ? v[1] : v[0]) : v;
const kidName = () => (S.childName && S.childName.trim()) || T('കൂട്ടുകാരാ', 'friend');
const CREDIT = 'Designed by <b>Thayyib</b> · Powered by <b>RIZTHA</b>';
function wTitle(W) { return T(W.title, W.en); }
function dTitle(W, d) { if (d === 5) return T(W.days[4].t, W.days[4].grad ? 'Graduation 🎓' : 'Test Mission 🏅'); return T(W.days[d - 1].t, EN_W[W.w - 1].days[d - 1][0]); }
function dLearn(W, d) { if (d === 5) return T(ASSESS_LEARN, ASSESS_EN); return T(W.days[d - 1].learn, EN_W[W.w - 1].days[d - 1][1]); }
function dTerm(W, d) { const t = W.days[d - 1].term; return T(`<b>${t[0]}</b> – ${t[1]}`, `New word: <b>${t[0]}</b>`); }
function wQuiz(W) { return LG() === 'en' ? EN_W[W.w - 1].quiz : W.quiz; }
function wTell(W) { return T(W.tell, EN_W[W.w - 1].tell); }
function blkL(t) { return T(`${BLK[t].ml}<small>${BLK[t].en}</small>`, BLK[t].en); }

const WEEKS = [
  { w: 1, world: 0, skill: 'instructions', title: 'കോഡിംഗിന്റെ തുടക്കം', en: 'Coding fundamentals & instructions',
    quiz: ['Coding എന്നാൽ എന്താണ്?', ['റോബോയ്ക്ക് നിർദ്ദേശങ്ങൾ കൊടുക്കൽ', 'പാട്ട് പാടൽ', 'ഉറങ്ങൽ']], tell: '"Coding എന്നാൽ റോബോയോട് എന്ത് ചെയ്യണം എന്ന് പറഞ്ഞുകൊടുക്കലാണ്" എന്ന് അച്ഛനോട്/അമ്മയോട് പറയൂ.',
    days: [
      { t: 'റോബോയെ പരിചയപ്പെടാം', term: ['Coding', 'കോഡിംഗ്'], learn: 'ഹലോ കൂട്ടുകാരേ! ഞാൻ റോബോ 🤖. നിങ്ങൾ പറയുന്നത് മാത്രമേ ഞാൻ ചെയ്യൂ. റോബോയോട് എന്ത് ചെയ്യണം എന്ന് പറഞ്ഞുകൊടുക്കുന്നതാണ് Coding – കോഡിംഗ്. ➡️ ബ്ലോക്ക് വെച്ചാൽ ഞാൻ ഒരു കളം വലത്തേക്ക് പോകും.',
        m: [SQ({ dirs: ['R'], len: 2, W: 5, H: 1, pal: 'r' }), SQ({ dirs: ['R'], len: 3, W: 5, H: 1, pal: 'r' }), SQ({ dirs: ['R'], len: 4, W: 6, H: 1, pal: 'r' })] },
      { t: 'ഇടത്തോട്ടും വലത്തോട്ടും', term: ['Instruction', 'നിർദ്ദേശം'], learn: 'ഓരോ ബ്ലോക്കും ഒരു Instruction – നിർദ്ദേശം ആണ്. ⬅️ ഇടത്തേക്ക്, ➡️ വലത്തേക്ക്. എത്ര കളം പോകണം എന്ന് വിരൽ വെച്ച് എണ്ണി നോക്കൂ!',
        m: [SQ({ dirs: ['L'], len: 2, W: 5, H: 1, pal: 'rl' }), SQ({ dirs: ['R'], len: 3, W: 6, H: 1, pal: 'rl' }), SQ({ dirs: ['L'], len: 4, W: 6, H: 1, pal: 'rl' })] },
      { t: 'മുകളിലേക്കും താഴേക്കും', term: ['Direction', 'ദിശ'], learn: '⬆️ മുകളിലേക്ക്, ⬇️ താഴേക്ക്. നിധിപ്പെട്ടി എവിടെയാണ്? മുകളിലോ താഴെയോ? നോക്കിയിട്ട് ബ്ലോക്കുകൾ വെക്കൂ.',
        m: [SQ({ dirs: ['U'], len: 2, W: 3, H: 4, pal: 'ud' }), SQ({ dirs: ['D'], len: 3, W: 3, H: 5, pal: 'ud' }), SQ({ dirs: ['U'], len: 4, W: 3, H: 5, pal: 'ud' })] },
      { t: 'നാല് ദിശകൾ', term: ['Program', 'പ്രോഗ്രാം (നിർദ്ദേശങ്ങളുടെ കൂട്ടം)'], learn: 'ഇനി നാല് ദിശകളും ഉപയോഗിക്കാം! നമ്മൾ വെക്കുന്ന ബ്ലോക്കുകളുടെ കൂട്ടമാണ് Program – പ്രോഗ്രാം. ആദ്യം വഴി വിരൽ കൊണ്ട് തൊട്ടുനോക്കൂ, പിന്നെ ബ്ലോക്കുകൾ വെക്കൂ.',
        m: [SQ({ dirs: ALL4, len: 3, segMax: 3, pal: 'm4' }), SQ({ dirs: ALL4, len: 3, segMax: 2, pal: 'm4' }), SQ({ dirs: ALL4, len: 4, segMax: 2, pal: 'm4' })] },
      { assess: true, m: [SQ({ dirs: ['R'], len: 4, W: 6, H: 1, pal: 'm4' }), SQ({ dirs: ['U'], len: 3, W: 3, H: 5, pal: 'm4' }), SQ({ dirs: ALL4, len: 4, segMax: 3, pal: 'm4' })] }
    ] },
  { w: 2, world: 0, skill: 'sequences', title: 'ദിശകളും ക്രമവും', en: 'Directions & sequences',
    quiz: ['ബ്ലോക്കുകളുടെ ക്രമം മാറിയാൽ എന്ത് സംഭവിക്കും?', ['റോബോയുടെ വഴി മാറും', 'ഒന്നും സംഭവിക്കില്ല', 'റോബോ പാട്ടു പാടും']], tell: '"ക്രമം (Sequence) തെറ്റിയാൽ റോബോ വേറെ വഴിക്ക് പോകും" എന്ന് ഒരു ഉദാഹരണത്തോടെ പറഞ്ഞുകൊടുക്കൂ.',
    days: [
      { t: 'വളഞ്ഞ വഴി', term: ['Sequence', 'നിർദ്ദേശങ്ങളുടെ ക്രമം'], learn: 'Sequence – നിർദ്ദേശങ്ങളുടെ ക്രമം. ബ്ലോക്കുകൾ ഏത് ക്രമത്തിൽ വെക്കുന്നു എന്നത് വളരെ പ്രധാനമാണ്. ആദ്യം ➡️ പിന്നെ ⬆️ — ക്രമം മാറിയാൽ വഴിയും മാറും!',
        m: [SQ({ dirs: ['R', 'U'], len: 4, segMax: 3, turns: 1, pal: 'm4' }), SQ({ dirs: ['R', 'D'], len: 4, segMax: 3, turns: 1, pal: 'm4' }), SQ({ dirs: ['L', 'U'], len: 5, segMax: 3, turns: 1, pal: 'm4' })] },
      { t: 'വളവും തിരിവും', term: ['Step', 'ഘട്ടം'], learn: 'വഴി പല തവണ തിരിയുന്നു. ഓരോ തിരിവിലും പുതിയ ദിശാ ബ്ലോക്ക് വേണം. ഓരോ ഘട്ടവും (Step) ശ്രദ്ധിച്ച് വെക്കൂ.',
        m: [SQ({ dirs: ALL4, len: 5, segMax: 2, pal: 'm4' }), SQ({ dirs: ALL4, len: 5, segMax: 2, pal: 'm4' }), SQ({ dirs: ALL4, len: 6, segMax: 2, pal: 'm4' })] },
      { t: 'തടസ്സങ്ങൾ', term: ['Obstacle', 'തടസ്സം'], learn: 'മരങ്ങളിൽ ഇടിക്കരുത്! 🌳 തടസ്സം (Obstacle) ഉള്ള കളത്തിലേക്ക് റോബോയ്ക്ക് പോകാൻ കഴിയില്ല. ചുറ്റിപ്പോകണം.',
        m: [SQ({ dirs: ALL4, len: 5, segMax: 3, wallP: 0.35, pal: 'm4' }), SQ({ dirs: ALL4, len: 6, segMax: 3, wallP: 0.4, pal: 'm4' }), SQ({ dirs: ALL4, len: 6, segMax: 2, wallP: 0.45, pal: 'm4' })] },
      { t: 'നാണയം പെറുക്കാം', term: ['Goal', 'ലക്ഷ്യം'], learn: 'എല്ലാ 🪙 നാണയങ്ങളും എടുത്തിട്ട് വേണം നിധിപ്പെട്ടിയിൽ (Goal – ലക്ഷ്യം) എത്താൻ. നാണയത്തിന് മുകളിലൂടെ പോയാൽ മതി.',
        m: [SQ({ dirs: ALL4, len: 5, segMax: 3, wallP: 0.3, coins: 1, req: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 6, segMax: 3, wallP: 0.35, coins: 2, req: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 7, segMax: 3, wallP: 0.35, coins: 2, req: true, pal: 'm4' })] },
      { assess: true, m: [SQ({ dirs: ALL4, len: 5, segMax: 2, wallP: 0.3, pal: 'm4' }), SQ({ dirs: ALL4, len: 6, segMax: 3, wallP: 0.4, coins: 1, req: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 7, segMax: 2, wallP: 0.4, pal: 'm4' })] }
    ] },
  { w: 3, world: 1, skill: 'algorithms', title: 'പ്ലാനിംഗ്', en: 'Algorithms & planning',
    quiz: ['Algorithm എന്നാൽ എന്താണ്?', ['ഘട്ടം ഘട്ടമായുള്ള പ്ലാൻ', 'ഒരു മൃഗം', 'ഒരു നിറം']], tell: 'പല്ല് തേക്കാനുള്ള Algorithm (പ്ലാൻ) ഘട്ടം ഘട്ടമായി അച്ഛനോട്/അമ്മയോട് പറയൂ: 1. ബ്രഷ് എടുക്കുക, 2...',
    days: [
      { t: 'ആദ്യം പ്ലാൻ ചെയ്യാം', term: ['Algorithm', 'പ്രവർത്തനപദ്ധതി'], learn: 'Algorithm – പ്രവർത്തനപദ്ധതി: ഒരു ജോലി ചെയ്യാനുള്ള ഘട്ടം ഘട്ടമായ പ്ലാൻ. ആദ്യം വഴി നോക്കൂ, പിന്നെ പ്ലാൻ ഉണ്ടാക്കൂ, എന്നിട്ട് ▶️ അമർത്തൂ.',
        m: [SQ({ dirs: ALL4, len: 6, segMax: 3, wallP: 0.3, coins: 2, req: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 7, segMax: 3, wallP: 0.35, coins: 2, req: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 7, segMax: 2, wallP: 0.35, coins: 3, req: true, pal: 'm4' })] },
      { t: 'മരുഭൂമിയിലെ ചക്രവ്യൂഹം', term: ['Maze', 'ചക്രവ്യൂഹം'], learn: 'Maze – ചക്രവ്യൂഹം. ശരിയായ വഴി കണ്ടെത്തൂ. 🌵 കള്ളിമുൾച്ചെടികൾ ശ്രദ്ധിക്കണം!',
        m: [SQ({ dirs: ALL4, len: 7, segMax: 2, wallP: 0.6, pal: 'm4' }), SQ({ dirs: ALL4, len: 8, segMax: 2, wallP: 0.65, pal: 'm4' }), SQ({ dirs: ALL4, len: 8, segMax: 2, wallP: 0.7, coins: 1, req: true, pal: 'm4' })] },
      { t: 'നീണ്ട യാത്ര', term: ['Plan', 'പ്ലാൻ'], learn: 'നീണ്ട വഴിയാണ്. ചെറിയ കഷണങ്ങളായി ചിന്തിക്കൂ: ആദ്യം ഈ നാണയം വരെ, പിന്നെ അടുത്തത് വരെ, പിന്നെ പെട്ടി വരെ.',
        m: [SQ({ dirs: ALL4, len: 8, segMax: 3, wallP: 0.4, coins: 2, req: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 9, segMax: 3, wallP: 0.45, coins: 3, req: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 10, segMax: 3, wallP: 0.45, coins: 3, req: true, W: 7, H: 6, pal: 'm4' })] },
      { t: 'ഏറ്റവും നല്ല വഴി', term: ['Efficient', 'കുറഞ്ഞ ഘട്ടങ്ങളിൽ'], learn: 'കുറച്ച് ബ്ലോക്കുകൾ കൊണ്ട് എത്താമോ? നല്ല Algorithm ചെറുതും വ്യക്തവുമായിരിക്കും. ഈ ദൗത്യങ്ങളിൽ ബ്ലോക്കുകളുടെ എണ്ണം പരിമിതമാണ് ⭐',
        m: [SQ({ dirs: ALL4, len: 6, segMax: 3, wallP: 0.45, tight: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 7, segMax: 3, wallP: 0.5, tight: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 8, segMax: 2, wallP: 0.5, tight: true, coins: 1, req: true, pal: 'm4' })] },
      { assess: true, m: [SQ({ dirs: ALL4, len: 7, segMax: 3, wallP: 0.4, coins: 2, req: true, pal: 'm4' }), SQ({ dirs: ALL4, len: 8, segMax: 2, wallP: 0.6, pal: 'm4' }), SQ({ dirs: ALL4, len: 8, segMax: 3, wallP: 0.45, coins: 3, req: true, pal: 'm4' })] }
    ] },
  { w: 4, world: 1, skill: 'loops', title: 'ആവർത്തനം', en: 'Loops & repetition',
    quiz: ['➡️➡️➡️➡️ ചുരുക്കി എഴുതാൻ എന്ത് ഉപയോഗിക്കാം?', ['🔁 REPEAT 4 തവണ ➡️', '⬅️⬅️', '⏳ WAIT']], tell: 'ദിവസവും ആവർത്തിക്കുന്ന ഒരു കാര്യം (Loop) പറയൂ — ഉദാ: "എല്ലാ ദിവസവും രാവിലെ പല്ല് തേക്കുന്നു".',
    days: [
      { t: 'REPEAT ബ്ലോക്ക്', term: ['Loop', 'ആവർത്തനം'], learn: 'Loop – ആവർത്തനം. ഒരേ കാര്യം പല തവണ ചെയ്യാൻ 🔁 REPEAT ഉപയോഗിക്കാം. ➡️➡️➡️➡️ എന്ന് നാല് തവണ വെക്കുന്നതിന് പകരം 🔁 4-ന്റെ ഉള്ളിൽ ഒരു ➡️ മതി!',
        m: [LP({ units: [['R']], reps: [4, 4] }), LP({ units: [['R'], ['U']], reps: [4, 5] }), LP({ units: LOOPU.line, reps: [5, 6] })] },
      { t: 'പടികൾ കയറാം', term: ['Repeat', 'വീണ്ടും ചെയ്യുക'], learn: '➡️⬆️ ➡️⬆️ ➡️⬆️ … ഒരു ഭാഗം വീണ്ടും വീണ്ടും വരുന്നുണ്ടോ? ആ ഭാഗം 🔁 REPEAT-ന്റെ ഉള്ളിൽ വെക്കൂ.',
        m: [LP({ units: [['R', 'U']], reps: [3, 3] }), LP({ units: LOOPU.stair, reps: [3, 4] }), LP({ units: LOOPU.stair, reps: [4, 4] })] },
      { t: 'വലിയ പാറ്റേൺ', term: ['Pattern', 'ആവർത്തിക്കുന്ന രൂപം'], learn: 'Pattern – ആവർത്തിക്കുന്ന രൂപം കണ്ടുപിടിക്കൂ. ആവർത്തിക്കുന്ന ഭാഗം കണ്ടാൽ അത് Loop-ൽ ഇടാം.',
        m: [LP({ units: LOOPU.three, reps: [2, 2] }), LP({ units: LOOPU.three, reps: [2, 3] }), LP({ units: LOOPU.three, reps: [3, 3] })] },
      { t: 'രണ്ട് ലൂപ്പുകൾ', term: ['Nested steps', 'ഒന്നിനുപുറകെ ഒന്ന്'], learn: 'ഒരു പ്രോഗ്രാമിൽ രണ്ട് REPEAT ഉപയോഗിക്കാം. ആദ്യത്തേത് ഒരു ദിശയിലേക്ക്, രണ്ടാമത്തേത് മറ്റൊരു ദിശയിലേക്ക്.',
        m: [LP({ two: true, reps: [3, 4] }), LP({ two: true, reps: [3, 5] }), LP({ two: true, reps: [4, 5] })] },
      { assess: true, m: [LP({ units: LOOPU.line, reps: [5, 6] }), LP({ units: LOOPU.stair, reps: [3, 4] }), LP({ two: true, reps: [3, 4] })] }
    ] },
  { w: 5, world: 2, skill: 'events', title: 'സംഭവങ്ങൾ', en: 'Events & triggers',
    quiz: ['Event എന്നാൽ എന്താണ്?', ['എന്തെങ്കിലും സംഭവിക്കുമ്പോൾ പ്രവർത്തിക്കുന്ന കോഡ്', 'എപ്പോഴും ഉറങ്ങുന്ന റോബോ', 'ഒരു നാണയം']], tell: 'വീട്ടിലെ ഒരു Event പറയൂ — ഉദാ: "കോളിംഗ് ബെൽ അടിക്കുമ്പോൾ നമ്മൾ വാതിൽ തുറക്കും".',
    days: [
      { t: 'ബട്ടൺ അമർത്തുമ്പോൾ', term: ['Event', 'സംഭവം'], learn: 'Event – സംഭവം: "ഇത് സംഭവിക്കുമ്പോൾ ഇത് ചെയ്യൂ". 🔴 ബട്ടൺ അമർത്തുമ്പോൾ റോബോ എന്ത് ചെയ്യണം എന്ന് ⚡ EVENT ബ്ലോക്കിന്റെ ഉള്ളിൽ വെക്കൂ. ▶️ അമർത്തിയ ശേഷം 🔴 അമർത്തി കളിക്കൂ!',
        m: [EV({ dirs: ['R'], len: 3, W: 5, H: 1 }), EV({ dirs: ['R'], len: 4, W: 6, H: 1 }), EV({ dirs: ['R'], len: 5, W: 6, H: 1 })] },
      { t: 'രണ്ട് ബട്ടണുകൾ', term: ['Trigger', 'ഉണർത്തുന്ന കാര്യം'], learn: '🔴 ഒരു ജോലി, 🔵 മറ്റൊരു ജോലി. ബട്ടൺ അമർത്തുന്നതാണ് Trigger. ഓരോ Event-നും അതിന്റേതായ ചെറിയ പ്രോഗ്രാം.',
        m: [EV({ dirs: ['R', 'U'], len: 4 }), EV({ dirs: ['R', 'U'], len: 5 }), EV({ dirs: ['R', 'U'], len: 6, wallP: 0.3 })] },
      { t: 'ബട്ടണും ലൂപ്പും', term: ['Handler', 'Event-ന്റെ പ്രോഗ്രാം'], learn: 'Event-ന്റെ ഉള്ളിൽ REPEAT വെക്കാം. ഒരു തവണ അമർത്തിയാൽ റോബോ പല കളം പോകും!',
        m: [EV({ dirs: ['R', 'U'], len: 6, segExact: 2 }), EV({ dirs: ['R', 'U'], len: 6, segExact: 2, wallP: 0.3 }), EV({ dirs: ['R', 'U'], len: 6, segExact: 3, W: 7, H: 5 })] },
      { t: 'മൂന്ന് ബട്ടണുകൾ', term: ['Controller', 'നിയന്ത്രണം'], learn: '🔴 🔵 🟡 – മൂന്ന് Event-കൾ. ഗെയിമുകളിൽ കളിക്കാർ കഥാപാത്രങ്ങളെ നിയന്ത്രിക്കുന്നത് ഇങ്ങനെയാണ്!',
        m: [EV({ dirs: ['R', 'U', 'D'], len: 5 }), EV({ dirs: ['R', 'U', 'D'], len: 6, wallP: 0.3 }), EV({ dirs: ['R', 'U', 'D'], len: 7, wallP: 0.35, coins: 1, req: true })] },
      { assess: true, m: [EV({ dirs: ['R'], len: 4, W: 6, H: 1 }), EV({ dirs: ['R', 'U'], len: 5, wallP: 0.3 }), EV({ dirs: ['R', 'U', 'D'], len: 6, wallP: 0.3 })] }
    ] },
  { w: 6, world: 2, skill: 'conditions', title: 'വ്യവസ്ഥകൾ', en: 'Conditions & decisions',
    quiz: ['ലൈറ്റ് 🔴 ചുവപ്പാണെങ്കിൽ റോബോ എന്ത് ചെയ്യണം?', ['⏳ കാത്തിരിക്കണം', 'ഓടണം', 'ചാടണം']], tell: 'ഒരു IF–ELSE പറയൂ — ഉദാ: "മഴ പെയ്താൽ (IF) കുട എടുക്കും, അല്ലെങ്കിൽ (ELSE) തൊപ്പി".',
    days: [
      { t: 'ട്രാഫിക് ലൈറ്റ്', term: ['Condition', 'വ്യവസ്ഥ'], learn: 'Condition – വ്യവസ്ഥ. IF – "എങ്കിൽ", ELSE – "അല്ലെങ്കിൽ". 🟢 പച്ച ആണെങ്കിൽ പോകാം, അല്ലെങ്കിൽ ⏳ കാത്തിരിക്കണം. കാത്തിരുന്നാൽ ലൈറ്റ് മാറും!',
        m: [LT({ len: 2 }), LT({ len: 3 }), LT({ len: 3 })] },
      { t: 'ലൂപ്പും വ്യവസ്ഥയും', term: ['IF / ELSE', 'എങ്കിൽ / അല്ലെങ്കിൽ'], learn: 'ഓരോ കളം നീങ്ങുമ്പോഴും ലൈറ്റ് മാറും. REPEAT-ന്റെ ഉള്ളിൽ IF വെച്ചാൽ ഓരോ തവണയും റോബോ ലൈറ്റ് നോക്കും.',
        m: [LT({ len: 4, tight: true }), LT({ len: 5, tight: true }), LT({ len: 5, tight: true })] },
      { t: 'തടസ്സം ഉണ്ടോ?', term: ['Decision', 'തീരുമാനം'], learn: 'ഓരോ തവണയും വഴി മാറും! "വലത്ത് തടസ്സം ഉണ്ടെങ്കിൽ ⬆️, അല്ലെങ്കിൽ ➡️" — ഇങ്ങനെ തീരുമാനിക്കുന്ന റോബോയ്ക്ക് ഏത് വഴിയും പോകാം.',
        m: [ST({ W: 3, H: 3 }), ST({ W: 4, H: 3 }), ST({ W: 4, H: 4 })] },
      { t: 'മിടുക്കൻ റോബോ', term: ['Smart program', 'ചിന്തിക്കുന്ന പ്രോഗ്രാം'], learn: 'വലിയ കോവണി! ഒരേ പ്രോഗ്രാം ഏത് വഴിയിലും ജയിക്കണം. അതാണ് വ്യവസ്ഥയുടെ ശക്തി 💡',
        m: [ST({ W: 5, H: 4 }), ST({ W: 5, H: 5 }), ST({ W: 6, H: 5 })] },
      { assess: true, m: [LT({ len: 4, tight: true }), ST({ W: 4, H: 4 }), ST({ W: 5, H: 4 })] }
    ] },
  { w: 7, world: 3, skill: 'debugging', title: 'ബഗ് വേട്ട', en: 'Debugging & problem-solving',
    quiz: ['Bug എന്നാൽ എന്താണ്?', ['പ്രോഗ്രാമിലെ തെറ്റ്', 'ഒരു പൂമ്പാറ്റ', 'ഒരു സമ്മാനം']], tell: 'ഇന്ന് കണ്ടുപിടിച്ച ഒരു Bug എന്തായിരുന്നു, അത് എങ്ങനെ തിരുത്തി എന്ന് പറഞ്ഞുകൊടുക്കൂ.',
    days: [
      { t: 'ബഗ് കണ്ടുപിടിക്കാം', term: ['Debugging', 'തെറ്റ് കണ്ടെത്തി തിരുത്തൽ'], learn: 'Bug – ബഗ് = പ്രോഗ്രാമിലെ തെറ്റ്. Debugging – തെറ്റ് കണ്ടെത്തി തിരുത്തൽ. ആദ്യം ▶️ അമർത്തി റോബോ എവിടെ തെറ്റുന്നു എന്ന് നോക്കൂ. തിളങ്ങുന്ന ബ്ലോക്കിനടുത്താണ് തെറ്റ്!',
        m: [DB({ base: SQ({ dirs: ALL4, len: 4, segMax: 2, pal: 'm4' }), bug: 'dir' }), DB({ base: SQ({ dirs: ALL4, len: 5, segMax: 2, wallP: 0.3, pal: 'm4' }), bug: 'dir' }), DB({ base: SQ({ dirs: ALL4, len: 6, segMax: 2, wallP: 0.3, pal: 'm4' }), bug: 'dir' })] },
      { t: 'കാണാതായ ബ്ലോക്ക്', term: ['Bug', 'ബഗ് (തെറ്റ്)'], learn: 'ഒരു ബ്ലോക്ക് കുറവോ, അധികമോ ആണ്. റോബോ നടക്കുന്നത് നോക്കി കളങ്ങൾ എണ്ണൂ!',
        m: [DB({ base: SQ({ dirs: ALL4, len: 4, segMax: 2, pal: 'm4' }), bug: 'missing' }), DB({ base: SQ({ dirs: ALL4, len: 5, segMax: 3, wallP: 0.3, pal: 'm4' }), bug: 'extra' }), DB({ base: SQ({ dirs: ALL4, len: 6, segMax: 2, wallP: 0.3, pal: 'm4' }), bug: 'missing' })] },
      { t: 'ലൂപ്പിലെ ബഗ്', term: ['Test', 'പരിശോധിക്കൽ'], learn: 'REPEAT എത്ര തവണ വേണം? എണ്ണം തെറ്റിയാൽ റോബോ നേരത്തെ നിൽക്കും. ഓരോ മാറ്റത്തിന് ശേഷവും ▶️ അമർത്തി Test ചെയ്യൂ.',
        m: [DB({ base: LP({ units: LOOPU.line, reps: [4, 5] }), bug: 'count' }), DB({ base: LP({ units: LOOPU.stair, reps: [3, 4] }), bug: 'count' }), DB({ base: LP({ units: LOOPU.stair, reps: [3, 4] }), bug: 'unit' })] },
      { t: 'വ്യവസ്ഥയിലെ ബഗ്', term: ['Fix', 'തിരുത്തൽ'], learn: 'IF-ന്റെ ഉള്ളിലും ELSE-ന്റെ ഉള്ളിലും ശരിയായ ബ്ലോക്കുകൾ ആണോ? 🟢 പച്ചയിൽ പോകണം, 🔴 ചുവപ്പിൽ കാത്തിരിക്കണം.',
        m: [DB({ base: LT({ len: 3 }), bug: 'swap' }), DB({ base: LT({ len: 4 }), bug: 'swap' }), DB({ base: ST({ W: 4, H: 3 }), bug: 'swap' })] },
      { assess: true, m: [DB({ base: SQ({ dirs: ALL4, len: 5, segMax: 2, wallP: 0.3, pal: 'm4' }), bug: 'dir' }), DB({ base: LP({ units: LOOPU.stair, reps: [3, 4] }), bug: 'count' }), DB({ base: LT({ len: 4 }), bug: 'swap' })] }
    ] },
  { w: 8, world: 3, skill: 'independent', title: 'എല്ലാം ഒരുമിച്ച്', en: 'Combining programming concepts',
    quiz: ['REPEAT-ന്റെ ഉള്ളിൽ IF വെച്ചാൽ?', ['ഓരോ തവണയും റോബോ പരിശോധിക്കും', 'റോബോ നിന്നുപോകും', 'ഒന്നും നടക്കില്ല']], tell: 'Loop, Condition, Debugging — ഇതിൽ ഏറ്റവും ഇഷ്ടപ്പെട്ടത് ഏത്? എന്തുകൊണ്ട്? പറഞ്ഞുകൊടുക്കൂ.',
    days: [
      { t: 'ലൂപ്പും നാണയങ്ങളും', term: ['Combine', 'ഒരുമിച്ച് ചേർക്കൽ'], learn: 'പഠിച്ചതെല്ലാം ഒരുമിച്ച് ഉപയോഗിക്കാം! ആവർത്തിക്കുന്ന വഴിയിലെ എല്ലാ നാണയങ്ങളും എടുക്കൂ.',
        m: [LP({ units: LOOPU.stair, reps: [3, 4], coins: 2, req: true, tag: 'loops' }), LP({ units: LOOPU.three, reps: [2, 3], coins: 2, req: true, tag: 'loops' }), LP({ two: true, reps: [3, 5], coins: 2, req: true, tag: 'loops' })] },
      { t: 'ചിന്തിക്കുന്ന റോബോ', term: ['Logic', 'യുക്തി'], learn: 'വഴി ഓരോ തവണയും മാറും. Loop + Condition = മിടുക്കൻ റോബോ!',
        m: [ST({ W: 5, H: 4, tag: 'conditions' }), ST({ W: 6, H: 4, tag: 'conditions' }), LT({ len: 5, tight: true, tag: 'conditions' })] },
      { t: 'ലൈറ്റുള്ള വളഞ്ഞ വഴി', term: ['Sequence of loops', 'ലൂപ്പുകളുടെ ക്രമം'], learn: 'വഴി ഒരിടത്ത് തിരിയുന്നു, ലൈറ്റും ഉണ്ട്. രണ്ട് REPEAT, ഓരോന്നിലും IF!',
        m: [LT({ len: 3, turn: 2, tag: 'conditions' }), LT({ len: 4, turn: 2, tag: 'conditions' }), LT({ len: 4, turn: 3, tag: 'conditions' })] },
      { t: 'മാസ്റ്റർ ഡീബഗർ', term: ['Problem-solving', 'പ്രശ്നപരിഹാരം'], learn: 'വലിയ പ്രോഗ്രാമുകളിലെ ബഗ് കണ്ടുപിടിക്കാം. ശാന്തമായി, ഒരു ബ്ലോക്ക് വീതം നോക്കൂ.',
        m: [DB({ base: LP({ two: true, reps: [3, 4] }), bug: 'count', tag: 'debugging' }), DB({ base: ST({ W: 5, H: 4 }), bug: 'swap', tag: 'debugging' }), DB({ base: SQ({ dirs: ALL4, len: 8, segMax: 3, wallP: 0.4, pal: 'm4' }), bug: 'dir', tag: 'debugging' })] },
      { assess: true, m: [LP({ units: LOOPU.three, reps: [2, 3], coins: 2, req: true, tag: 'loops' }), ST({ W: 5, H: 5, tag: 'conditions' }), DB({ base: LP({ two: true, reps: [3, 4] }), bug: 'count', tag: 'debugging' })] }
    ] },
  { w: 9, world: 4, skill: 'independent', title: 'കഥ പറയും കോഡ്', en: 'Interactive storytelling',
    quiz: ['Interactive story-യിൽ എന്താണ് പ്രത്യേകത?', ['നമ്മളും കഥയിൽ പങ്കെടുക്കുന്നു', 'കേട്ടിരിക്കുക മാത്രം', 'കഥ ഇല്ല']], tell: 'ഇന്നത്തെ കഥ നിന്റെ വാക്കുകളിൽ പറയൂ — റോബോ ആരെ സഹായിച്ചു? എങ്ങനെ?',
    days: [
      { t: 'പൂച്ചക്കുട്ടിയെ രക്ഷിക്കാം', term: ['Interactive story', 'നമ്മൾ പങ്കെടുക്കുന്ന കഥ'], learn: 'ബഹിരാകാശത്ത് ഒരു പൂച്ചക്കുട്ടി 🐱 വഴി തെറ്റി! നീ എഴുതുന്ന കോഡ് ആണ് കഥ മുന്നോട്ട് കൊണ്ടുപോകുന്നത്. അതാണ് Interactive story.',
        m: [SQ({ dirs: ALL4, len: 6, segMax: 3, wallP: 0.4, coins: 1, req: true, pal: 'all', goal: '🐱', story: ['പൂച്ചക്കുട്ടി 🐱 പേടിച്ചിരിക്കുന്നു. വഴിയിലെ 🪙 എടുത്ത് അവളുടെ അടുത്തെത്തൂ!', 'The kitten 🐱 is scared. Pick up the 🪙 on the way and reach her!'] }), LP({ units: LOOPU.stair, reps: [3, 4], goal: '🐱', story: ['പൂച്ചക്കുട്ടി പടികൾക്ക് മുകളിലാണ്. 🔁 ഉപയോഗിച്ച് കയറൂ!', 'The kitten is at the top of the stairs. Use 🔁 to climb!'] }), ST({ W: 5, H: 4, goal: '🐱', story: ['പൂച്ച ഓടിക്കളിക്കുന്നു — വഴി മാറിക്കൊണ്ടിരിക്കും! IF ഉപയോഗിക്കൂ.', 'The kitten keeps running around — the path changes! Use IF.'] })] },
      { t: 'നക്ഷത്രം തേടി', term: ['Character', 'കഥാപാത്രം'], learn: 'റോബോ എന്ന കഥാപാത്രം (Character) വീണുപോയ നക്ഷത്രങ്ങളെ ⭐ തിരികെ ആകാശത്ത് എത്തിക്കുന്നു.',
        m: [LP({ two: true, reps: [3, 5], goal: '⭐', story: ['ആദ്യത്തെ നക്ഷത്രം ദൂരെ കോണിലാണ്.', 'The first star is far away in the corner.'] }), LT({ len: 4, tight: true, goal: '⭐', story: ['ബഹിരാകാശ ട്രാഫിക് ലൈറ്റ്! 🚦 ശ്രദ്ധിച്ച് പോകൂ.', 'A space traffic light! 🚦 Go carefully.'] }), SQ({ dirs: ALL4, len: 8, segMax: 3, wallP: 0.45, coins: 3, req: true, pal: 'all', goal: '⭐', story: ['വാൽനക്ഷത്രങ്ങൾക്കിടയിലൂടെ ☄️ പോകണം. 3 നാണയവും വേണം!', 'Fly between the comets ☄️. You need all 3 coins!'] })] },
      { t: 'അന്യഗ്രഹ സുഹൃത്ത്', term: ['Scene', 'രംഗം'], learn: 'ഒരു പുതിയ ഗ്രഹത്തിൽ റോബോ ഒരു സുഹൃത്തിനെ 👽 കണ്ടുമുട്ടുന്നു. ഓരോ ദൗത്യവും കഥയിലെ ഒരു രംഗം (Scene) ആണ്.',
        m: [EV({ dirs: ['R', 'U', 'D'], len: 6, wallP: 0.3, goal: '👽', story: ['ബട്ടണുകൾ കൊണ്ട് റോബോയെ 👽 സുഹൃത്തിന്റെ അടുത്തെത്തിക്കൂ.', 'Use the buttons to bring Robo to your alien friend 👽.'] }), DB({ base: LP({ units: LOOPU.three, reps: [2, 3] }), bug: 'count', goal: '👽', story: ['സുഹൃത്തിന്റെ കപ്പലിന്റെ കോഡിൽ ബഗ്! തിരുത്തൂ 🐞', "There is a bug in your friend's spaceship code! Fix it 🐞"] }), ST({ W: 6, H: 4, goal: '👽', story: ['ഗ്രഹത്തിലെ വഴികൾ മാറിക്കൊണ്ടിരിക്കും.', 'The paths on this planet keep changing.'] })] },
      { t: 'വീട്ടിലേക്ക് മടക്കം', term: ['Ending', 'കഥയുടെ അവസാനം'], learn: 'റോക്കറ്റിൽ 🚀 തിരികെ വീട്ടിലേക്ക്! കഥയുടെ അവസാന ഭാഗം (Ending) നീ തന്നെ പൂർത്തിയാക്കൂ.',
        m: [LT({ len: 4, turn: 2, goal: '🚀', story: ['റോക്കറ്റിലേക്കുള്ള വഴിയിൽ ലൈറ്റുകൾ!', 'Traffic lights on the way to the rocket!'] }), LP({ two: true, reps: [4, 5], coins: 2, req: true, goal: '🚀', story: ['ഇന്ധന നാണയങ്ങൾ 🪙 എടുത്ത് റോക്കറ്റിലെത്തൂ.', 'Collect the fuel coins 🪙 and reach the rocket.'] }), SQ({ dirs: ALL4, len: 9, segMax: 3, wallP: 0.5, coins: 2, req: true, pal: 'all', goal: '🏠', story: ['അവസാനം വീട്ടിലേക്ക് 🏠! ശുഭം.', 'Finally, home 🏠! The end.'] })] },
      { assess: true, m: [SQ({ dirs: ALL4, len: 8, segMax: 3, wallP: 0.45, coins: 2, req: true, pal: 'all', tag: 'algorithms' }), LT({ len: 4, turn: 2, tag: 'conditions' }), DB({ base: LP({ units: LOOPU.stair, reps: [3, 4] }), bug: 'unit', tag: 'debugging' })] }
    ] },
  { w: 10, world: 4, skill: 'independent', title: 'ഗെയിം ഡിസൈൻ', en: 'Game design',
    quiz: ['ഒരു ഗെയിമിന് ഏറ്റവും ആവശ്യമായത്?', ['കളിക്കാരനും ഒരു ലക്ഷ്യവും', 'ഒന്നും വേണ്ട', 'ഒരു പേന മാത്രം']], tell: 'നീ ഉണ്ടാക്കിയ ലെവൽ അച്ഛനെ/അമ്മയെ കാണിച്ച്, അതിന്റെ നിയമങ്ങൾ (Rules) പറഞ്ഞുകൊടുക്കൂ.',
    days: [
      { t: 'ഗെയിമിന്റെ ഭാഗങ്ങൾ', term: ['Game design', 'ഗെയിം രൂപകൽപ്പന'], learn: 'ഒരു ഗെയിമിന് വേണ്ടത്: കളിക്കാരൻ 🤖, ലക്ഷ്യം 🎁, തടസ്സങ്ങൾ, സമ്മാനങ്ങൾ 🪙. ഇന്ന് നീ തന്നെ ഒരു ലെവൽ ഉണ്ടാക്കും! പിന്നെ അത് കോഡ് ചെയ്ത് ജയിക്കണം.',
        m: [SQ({ dirs: ALL4, len: 6, segMax: 3, wallP: 0.4, pal: 'all', tag: 'algorithms' }), LP({ units: LOOPU.stair, reps: [3, 4], tag: 'loops' }), MK({ req: { coins: 0, walls: 0 } })] },
      { t: 'നാണയങ്ങൾ ചേർക്കാം', term: ['Reward', 'സമ്മാനം'], learn: 'സമ്മാനങ്ങൾ (Reward) ഗെയിം രസകരമാക്കും. നിന്റെ ലെവലിൽ 2 നാണയങ്ങൾ വെക്കൂ.',
        m: [LP({ two: true, reps: [3, 4], tag: 'loops' }), LT({ len: 4, tight: true, tag: 'conditions' }), MK({ req: { coins: 2, walls: 0 } })] },
      { t: 'തടസ്സങ്ങൾ ചേർക്കാം', term: ['Challenge', 'വെല്ലുവിളി'], learn: 'തടസ്സങ്ങൾ ഗെയിമിനെ വെല്ലുവിളി (Challenge) നിറഞ്ഞതാക്കും. പക്ഷേ ജയിക്കാൻ ഒരു വഴി ഉണ്ടായിരിക്കണം!',
        m: [ST({ W: 5, H: 4, tag: 'conditions' }), SQ({ dirs: ALL4, len: 8, segMax: 2, wallP: 0.6, pal: 'all', tag: 'algorithms' }), MK({ req: { coins: 2, walls: 3 } })] },
      { t: 'ലൂപ്പ് ലെവൽ', term: ['Level', 'ഘട്ടം'], learn: 'REPEAT കൊണ്ട് ജയിക്കാവുന്ന ഒരു ലെവൽ (Level) ഉണ്ടാക്കൂ — ഉദാ: ഒരു നേർവഴി അല്ലെങ്കിൽ പടികൾ.',
        m: [DB({ base: LP({ units: LOOPU.three, reps: [2, 3] }), bug: 'unit', tag: 'debugging' }), EV({ dirs: ['R', 'U', 'D'], len: 6, wallP: 0.3, tag: 'events' }), MK({ req: { coins: 1, walls: 2, repeat: true } })] },
      { assess: true, m: [SQ({ dirs: ALL4, len: 8, segMax: 3, wallP: 0.5, coins: 2, req: true, pal: 'all', tag: 'algorithms' }), ST({ W: 5, H: 5, tag: 'conditions' }), MK({ req: { coins: 2, walls: 3, repeat: true }, tag: 'algorithms' })] }
    ] },
  { w: 11, world: 5, skill: 'independent', title: 'മിനി ഗെയിം', en: 'Create a mini-game',
    quiz: ['ഒരു നല്ല ഗെയിം എങ്ങനെ ഉണ്ടാക്കാം?', ['ഉണ്ടാക്കി, കളിച്ചുനോക്കി, ശരിയാക്കി', 'ഒരിക്കലും കളിച്ചുനോക്കാതെ', 'തടസ്സങ്ങൾ മാത്രം വെച്ച്']], tell: 'നിന്റെ മിനി ഗെയിം അച്ഛനെ/അമ്മയെ കൊണ്ട് കളിപ്പിക്കൂ! അവർക്ക് സഹായം വേണമെങ്കിൽ നീ സൂചന കൊടുക്കൂ.',
    days: [
      { t: 'എന്റെ ആദ്യ മിനി ഗെയിം', term: ['Mini-game', 'ചെറിയ ഗെയിം'], learn: 'ഇന്ന് നീ ഒരു മുഴുവൻ Mini-game ഉണ്ടാക്കും: 3 നാണയങ്ങൾ, തടസ്സങ്ങൾ, ഒരു നിധിപ്പെട്ടി.',
        m: [LP({ two: true, reps: [4, 5], coins: 2, req: true, tag: 'loops' }), ST({ W: 6, H: 4, tag: 'conditions' }), MK({ req: { coins: 3, walls: 3 } })] },
      { t: 'ട്രാഫിക് ലൈറ്റ് ഗെയിം', term: ['Rule', 'നിയമം'], learn: '🚦 ലൈറ്റ് ചേർത്താൽ കളിക്കാരൻ IF ഉപയോഗിക്കണം — അതാണ് നിന്റെ ഗെയിമിന്റെ നിയമം (Rule).',
        m: [LT({ len: 4, turn: 2, tag: 'conditions' }), DB({ base: LT({ len: 4 }), bug: 'swap', tag: 'debugging' }), MK({ req: { coins: 1, walls: 2, light: true } })] },
      { t: 'നിധിവേട്ട', term: ['Playtest', 'കളിച്ചുനോക്കൽ'], learn: 'കൂടുതൽ നാണയങ്ങളുള്ള നിധിവേട്ട! ഉണ്ടാക്കിയ ശേഷം കളിച്ചുനോക്കൂ (Playtest) — ജയിക്കാൻ പറ്റുന്നുണ്ടോ?',
        m: [SQ({ dirs: ALL4, len: 9, segMax: 3, wallP: 0.5, coins: 3, req: true, pal: 'all', tag: 'algorithms' }), EV({ dirs: ['R', 'U', 'D'], len: 7, wallP: 0.35, coins: 1, req: true, tag: 'events' }), MK({ req: { coins: 4, walls: 4 } })] },
      { t: 'അച്ഛനും കളിക്കട്ടെ', term: ['Player', 'കളിക്കാരൻ'], learn: 'നല്ല ഗെയിം മറ്റുള്ളവർക്കും കളിക്കാൻ രസമായിരിക്കും. REPEAT വേണ്ട ഒരു ഗെയിം ഉണ്ടാക്കി വീട്ടുകാരെ കളിപ്പിക്കൂ!',
        m: [ST({ W: 6, H: 5, tag: 'conditions' }), DB({ base: SQ({ dirs: ALL4, len: 8, segMax: 3, wallP: 0.4, pal: 'all' }), bug: 'missing', tag: 'debugging' }), MK({ req: { coins: 2, walls: 3, repeat: true } })] },
      { assess: true, m: [LP({ two: true, reps: [4, 5], coins: 2, req: true, tag: 'loops' }), DB({ base: ST({ W: 5, H: 4 }), bug: 'swap', tag: 'debugging' }), MK({ req: { coins: 3, walls: 3, repeat: true }, tag: 'algorithms' })] }
    ] },
  { w: 12, world: 5, skill: 'independent', title: 'ഫൈനൽ പ്രോജക്ട്', en: 'Final project & graduation',
    quiz: ['ഇപ്പോൾ നീ ആരാണ്?', ['ഒരു കോഡർ! 👩‍💻', 'ഒന്നും പഠിച്ചിട്ടില്ല', 'റോബോ']], tell: 'അഭിമാനത്തോടെ പറയൂ: "ഞാൻ സ്വന്തമായി ഒരു ഗെയിം ഉണ്ടാക്കി!" 🎉',
    days: [
      { t: 'പ്രോജക്ട് പ്ലാൻ', term: ['Project', 'പദ്ധതി'], learn: 'നിന്റെ വലിയ ഫൈനൽ Project! ആദ്യം ഒരു ചെറിയ പ്ലാൻ: എവിടെ തുടങ്ങും? നാണയങ്ങൾ എവിടെ? തടസ്സങ്ങൾ എവിടെ?',
        m: [SQ({ dirs: ALL4, len: 9, segMax: 3, wallP: 0.5, coins: 3, req: true, pal: 'all', tag: 'algorithms' }), LP({ two: true, reps: [4, 6], tag: 'loops' }), MK({ req: { coins: 2, walls: 3 } })] },
      { t: 'ഗെയിം നിർമ്മാണം', term: ['Build', 'നിർമ്മിക്കൽ'], learn: 'ഇനി നിർമ്മിക്കാം (Build)! REPEAT വേണ്ടിവരുന്ന ഒരു ഗെയിം ഉണ്ടാക്കൂ.',
        m: [ST({ W: 6, H: 5, tag: 'conditions' }), EV({ dirs: ['R', 'U', 'D'], len: 7, wallP: 0.35, tag: 'events' }), MK({ req: { coins: 3, walls: 3, repeat: true } })] },
      { t: 'വെല്ലുവിളി ചേർക്കാം', term: ['Feature', 'സവിശേഷത'], learn: 'നിന്റെ ഗെയിമിൽ 🚦 ട്രാഫിക് ലൈറ്റ് എന്ന പുതിയ Feature ചേർക്കൂ.',
        m: [LT({ len: 5, turn: 2, tag: 'conditions' }), DB({ base: LP({ two: true, reps: [4, 5] }), bug: 'count', tag: 'debugging' }), MK({ req: { coins: 2, walls: 3, light: true } })] },
      { t: 'പരിശോധനയും മിനുക്കലും', term: ['Polish', 'മിനുക്കൽ'], learn: 'നല്ല ഗെയിം ഉണ്ടാക്കുന്നവർ പലതവണ കളിച്ചുനോക്കി ശരിയാക്കും (Polish). ഇന്ന് ഏറ്റവും നല്ല ഗെയിം ഉണ്ടാക്കി പേരിടൂ!',
        m: [ST({ W: 6, H: 6, tag: 'conditions' }), SQ({ dirs: ALL4, len: 10, segMax: 3, wallP: 0.55, coins: 3, req: true, W: 7, H: 6, pal: 'all', tag: 'algorithms' }), MK({ req: { coins: 3, walls: 4, repeat: true } })] },
      { assess: true, grad: true, m: [LP({ two: true, reps: [4, 5], coins: 2, req: true, tag: 'loops' }), ST({ W: 6, H: 5, tag: 'conditions' }), MK({ req: { coins: 3, walls: 4, repeat: true }, tag: 'algorithms', final: true })] }
    ] }
];
WEEKS.forEach(W => { W.days[4].t = W.days[4].grad ? 'ബിരുദദാനം 🎓' : 'പരീക്ഷണ ദൗത്യം 🏅'; W.days[4].learn = ASSESS_LEARN; W.days[4].term = ['Assessment', 'പരീക്ഷണം']; });

const BLK = {
  R: { i: '➡️', ml: 'വലത്തോട്ട്', en: 'RIGHT' }, L: { i: '⬅️', ml: 'ഇടത്തോട്ട്', en: 'LEFT' }, U: { i: '⬆️', ml: 'മുകളിലേക്ക്', en: 'UP' }, D: { i: '⬇️', ml: 'താഴേക്ക്', en: 'DOWN' },
  WAIT: { i: '⏳', ml: 'കാത്തിരിക്കുക', en: 'WAIT' }, REPEAT: { i: '🔁', ml: 'ആവർത്തിക്കുക', en: 'REPEAT' },
  IF: { i: '❓', ml: 'എങ്കിൽ', en: 'IF' }, IFELSE: { i: '🔀', ml: 'എങ്കിൽ / അല്ലെങ്കിൽ', en: 'IF / ELSE' }, EVENT: { i: '⚡', ml: 'സംഭവം', en: 'EVENT' }
};
const CONDS = { green: ['🟢 ലൈറ്റ് പച്ചയാണോ?', '🟢 light is green?'], wallR: ['➡️ വലതുവശത്ത് തടസ്സമുണ്ടോ?', '➡️ blocked on the right?'], wallU: ['⬆️ മുകളിൽ തടസ്സമുണ്ടോ?', '⬆️ blocked above?'], wallD: ['⬇️ താഴെ തടസ്സമുണ്ടോ?', '⬇️ blocked below?'], wallL: ['⬅️ ഇടതുവശത്ത് തടസ്സമുണ്ടോ?', '⬅️ blocked on the left?'] };
const EVC = { red: '🔴', blue: '🔵', yellow: '🟡' };
const DIRV = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1] };
const DIR2EV = { R: 'red', U: 'blue', D: 'yellow', L: 'red' };

/* ================= STATE ================= */
const KEY = 'inaaya-codequest-v1';
function defState() {
  return { v: 1, created: Date.now(), childName: '', lang: null, pin: null, muted: false, music: true, unlockAll: false,
    days: {}, missions: {}, time: {}, history: [], adapt: {}, games: [], coins: 0, stars: 0, graduated: null, quiz: {} };
}
let S;
function loadState() { try { const raw = localStorage.getItem(KEY); S = Object.assign(defState(), raw ? JSON.parse(raw) : {}); } catch (e) { S = defState(); } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
loadState();
function logHist(o) { S.history.push({ ts: Date.now(), date: todayKey(), ...o }); if (S.history.length > 1500) S.history.splice(0, S.history.length - 1500); }

/* ================= PROGRAM MODEL ================= */
let uid = 1; const nid = () => 'b' + (uid++);
function mk(t, o = {}) {
  const n = { id: nid(), t, ...o };
  if (t === 'REPEAT') { n.n = n.n || 3; n.body = n.body || []; }
  if (t === 'IF' || t === 'IFELSE') { n.c = n.c || 'wallR'; n.body = n.body || []; if (t === 'IFELSE') n.else = n.else || []; }
  if (t === 'EVENT') { n.ev = n.ev || 'red'; n.body = n.body || []; }
  return n;
}
function cloneList(list) { return (list || []).map(n => { const c = { ...n, id: nid() }; if (n.body) c.body = cloneList(n.body); if (n.else) c.else = cloneList(n.else); return c; }); }
function cloneProg(p) { return { main: cloneList(p.main), events: cloneList(p.events || []) }; }
function countBlocks(list) { let c = 0; for (const n of list) { c++; if (n.body) c += countBlocks(n.body); if (n.else) c += countBlocks(n.else); } return c; }
function progCount(p) { return countBlocks(p.main) + countBlocks(p.events); }
function progHas(p, t) { const f = l => l.some(n => n.t === t || (t === 'IF' && n.t === 'IFELSE') || (n.body && f(n.body)) || (n.else && f(n.else))); return f(p.main) || f(p.events); }
function evHasBody(p) { return p.events.some(e => e.body.length); }

/* ================= LEVEL GENERATORS ================= */
function emptyGrid(W, H) { return Array.from({ length: H }, () => Array(W).fill('.')); }
function walkPath(W, H, start, dirs, len, r, segMax, segExact, turns) {
  const seen = new Set([start.x + ',' + start.y]); let x = start.x, y = start.y; const moves = []; let dir = null; let nTurns = 0;
  while (moves.length < len) {
    let opts = dirs.filter(d => d !== dir);
    if (dir && turns !== undefined && nTurns >= turns) opts = [];
    if (!dir) opts = dirs.slice();
    const cand = opts.sort(() => r() - 0.5);
    let ok = false;
    for (const d of cand) {
      let seg = segExact || ri(r, 1, segMax || 3); if (dirs.length === 1) seg = len - moves.length; if (turns !== undefined && dir === null) seg = Math.max(1, Math.min(seg, len - moves.length - 1)); seg = Math.min(seg, len - moves.length);
      if (turns !== undefined && dir && nTurns + 1 >= turns) seg = len - moves.length;
      let cx = x, cy = y, good = true; const cells = [];
      for (let i = 0; i < seg; i++) { cx += DIRV[d][0]; cy += DIRV[d][1]; const k = cx + ',' + cy; if (cx < 0 || cy < 0 || cx >= W || cy >= H || seen.has(k)) { good = false; break; } cells.push(k); }
      if (!good) continue;
      cells.forEach(k => seen.add(k)); for (let i = 0; i < seg; i++) moves.push(d);
      if (dir) nTurns++;
      x = cx; y = cy; dir = d; ok = true; break;
    }
    if (!ok) return null;
  }
  return { moves, end: { x, y } };
}
function pathCells(start, moves) { const c = [{ ...start }]; let { x, y } = start; for (const m of moves) { x += DIRV[m][0]; y += DIRV[m][1]; c.push({ x, y }); } return c; }
function buildLevel(W, H, start, moves, r, o) {
  const cells = pathCells(start, moves); const g = emptyGrid(W, H); const onPath = new Set(cells.map(c => c.x + ',' + c.y));
  const wp = o.wallP || 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (!onPath.has(x + ',' + y) && r() < wp) g[y][x] = '#';
  const goal = cells[cells.length - 1]; g[goal.y][goal.x] = 'G';
  const inner = cells.slice(1, -1); const nc = Math.min(o.coins || 0, inner.length);
  inner.sort(() => r() - 0.5).slice(0, nc).forEach(c => { g[c.y][c.x] = 'c'; });
  return { W, H, grid: g, start: { ...start }, goal: { ...goal } };
}
function seqProg(moves) { return { main: moves.map(m => mk(m)), events: [] }; }
function genSeq(sp, diff, r) {
  const W = sp.W || 6, H = sp.H || 5; const len = Math.max(1, Math.min(sp.len + (sp.H === 1 || sp.W === 3 ? 0 : diff - 1), W * H - 2));
  for (let t = 0; t < 400; t++) {
    const start = { x: ri(r, 0, W - 1), y: ri(r, 0, H - 1) };
    const p = walkPath(W, H, start, sp.dirs, len, r, sp.segMax || 3, sp.segExact, sp.turns);
    if (!p) continue;
    const L = buildLevel(W, H, start, p.moves, r, sp);
    L.ref = seqProg(p.moves); L.requireCoins = !!sp.req; L.palette = PAL[sp.pal || 'm4'];
    if (sp.tight) L.maxBlocks = p.moves.length;
    return L;
  }
  throw new Error('genSeq failed');
}
function placeMoves(moves, minW, minH, r, o) {
  let x = 0, y = 0, minx = 0, miny = 0, maxx = 0, maxy = 0;
  for (const m of moves) { x += DIRV[m][0]; y += DIRV[m][1]; minx = Math.min(minx, x); miny = Math.min(miny, y); maxx = Math.max(maxx, x); maxy = Math.max(maxy, y); }
  const bw = maxx - minx + 1, bh = maxy - miny + 1; const W = Math.max(minW, bw), H = Math.max(minH, bh);
  const ox = ri(r, 0, W - bw) - minx, oy = ri(r, 0, H - bh) - miny;
  return buildLevel(W, H, { x: ox, y: oy }, moves, r, o);
}
function genLoop(sp, diff, r) {
  const d = diff - 1; let moves, ref;
  if (sp.two) {
    const a = pick(r, ['R', 'L']), b = pick(r, ['U', 'D']); const ra = Math.min(7, ri(r, sp.reps[0], sp.reps[1]) + d), rb = Math.min(5, ri(r, 2, 4) + Math.max(0, d));
    const first = r() < 0.5; const [d1, n1, d2, n2] = first ? [a, ra, b, rb] : [b, rb, a, ra];
    moves = [...Array(n1).fill(d1), ...Array(n2).fill(d2)];
    ref = { main: [mk('REPEAT', { n: n1, body: [mk(d1)] }), mk('REPEAT', { n: n2, body: [mk(d2)] })], events: [] };
  } else {
    const unit = pick(r, sp.units); let n = ri(r, sp.reps[0], sp.reps[1]) + d;
    const maxN = Math.floor(7 / Math.max(1, unit.filter(u => u === 'R' || u === 'L').length || 1));
    const maxV = Math.floor(6 / Math.max(1, unit.filter(u => u === 'U' || u === 'D').length || 1));
    n = Math.max(2, Math.min(n, maxN, maxV, 9));
    moves = []; for (let i = 0; i < n; i++) moves.push(...unit);
    ref = { main: [mk('REPEAT', { n, body: unit.map(u => mk(u)) })], events: [] };
  }
  const L = placeMoves(moves, 5, 4, r, { wallP: sp.wallP ?? 0.25, coins: sp.coins || 0 });
  L.ref = ref; L.requireCoins = !!sp.req; L.palette = PAL.loop; L.maxBlocks = progCount(ref) + 1; L.requireBlock = 'REPEAT';
  return L;
}
function genEvent(sp, diff, r) {
  const L = genSeq({ ...sp, pal: 'evt', segMax: sp.segMax || 3 }, diff, r);
  L.pathMoves = L.ref.main.map(n => n.t);
  const used = [...new Set(L.ref.main.map(n => n.t))];
  L.ref = { main: [], events: used.map(d => mk('EVENT', { ev: DIR2EV[d], body: [mk(d)] })) };
  L.evPress = L._moves = null; L.palette = PAL.evt; L.requireBlock = 'EVENT'; L.maxBlocks = undefined;
  return L;
}
function lightProgFor(dir, n) { return mk('REPEAT', { n, body: [mk('IFELSE', { c: 'green', body: [mk(dir)], else: [mk('WAIT'), mk(dir)] })] }); }
function genLight(sp, diff, r) {
  const len = sp.len + (sp.tight ? Math.max(0, diff - 1) : 0); let moves, ref;
  if (sp.turn) { const v = pick(r, ['U', 'D']); moves = [...Array(len).fill('R'), ...Array(sp.turn).fill(v)]; ref = { main: [lightProgFor('R', len), lightProgFor(v, sp.turn)], events: [] }; }
  else { moves = Array(len).fill('R'); ref = { main: [lightProgFor('R', len)], events: [] }; }
  const L = placeMoves(moves, Math.max(4, len + 1), sp.turn ? sp.turn + 2 : 3, r, { wallP: 0.5 });
  L.ref = ref; L.light = true; L.palette = PAL.cond; L.conds = ['green']; L.requireBlock = 'IF';
  if (sp.tight) L.maxBlocks = progCount(ref) + 2;
  return L;
}
function stairLayout(W, H, r) {
  const moves = [...Array(W - 1).fill('R'), ...Array(H - 1).fill('U')].sort(() => r() - 0.5);
  const start = { x: 0, y: H - 1 }; const cells = pathCells(start, moves); const on = new Set(cells.map(c => c.x + ',' + c.y));
  const g = emptyGrid(W, H); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (!on.has(x + ',' + y)) g[y][x] = '#';
  g[0][W - 1] = 'G'; return { W, H, grid: g, start, goal: { x: W - 1, y: 0 }, moves };
}
function genStair(sp, diff, r) {
  const W = Math.min(7, sp.W + (diff >= 3 ? 1 : 0)), H = sp.H;
  const L = stairLayout(W, H, r); delete L.moves;
  L.stair = true; L.palette = PAL.cond; L.conds = ['wallR', 'wallU']; L.requireBlock = 'IF';
  L.ref = { main: [mk('REPEAT', { n: W + H - 2, body: [mk('IFELSE', { c: 'wallR', body: [mk('U')], else: [mk('R')] })] })], events: [] };
  return L;
}
function flatMoves(list) { return list.filter(n => DIRV[n.t]); }
function genDebug(sp, diff, r) {
  const L = genLevel(sp.base, Math.min(diff, 1), r); const ref = L.ref; let bug = cloneProg(ref); let bugId = null;
  for (let t = 0; t < 60; t++) {
    bug = cloneProg(ref); bugId = null;
    if (sp.bug === 'dir' || sp.bug === 'missing' || sp.bug === 'extra') {
      const mv = flatMoves(bug.main); const i = ri(r, 0, mv.length - 1);
      if (sp.bug === 'dir') { const n = mv[i]; n.t = pick(r, ALL4.filter(d => d !== n.t)); bugId = n.id; }
      else if (sp.bug === 'missing') { if (mv.length < 2) continue; const j = bug.main.indexOf(mv[i]); bug.main.splice(j, 1); bugId = (bug.main[Math.max(0, j - 1)] || {}).id; }
      else { const n = mk(pick(r, ALL4)); const j = bug.main.indexOf(mv[i]); bug.main.splice(j, 0, n); bugId = n.id; }
    } else if (sp.bug === 'count') {
      const reps = bug.main.filter(n => n.t === 'REPEAT' && n.n >= 2); if (!reps.length) continue; const n = pick(r, reps); n.n -= ri(r, 1, Math.max(1, Math.min(2, n.n - 1))); bugId = n.id;
    } else if (sp.bug === 'unit') {
      const rep = bug.main.find(n => n.t === 'REPEAT'); const mv = rep.body.filter(n => DIRV[n.t]); const n = pick(r, mv); n.t = pick(r, ALL4.filter(d => d !== n.t)); bugId = n.id;
    } else if (sp.bug === 'swap') {
      const f = l => { for (const n of l) { if (n.t === 'IFELSE') return n; if (n.body) { const x = f(n.body); if (x) return x; } } };
      const n = f(bug.main); const b = n.body; n.body = n.else; n.else = b; bugId = n.id;
    }
    let allFail = true; for (let k = 0; k < (L.light || L.stair ? 12 : 1); k++) { const Lr = L.stair ? { ...L, ...stairLayout(L.W, L.H, Math.random) } : L; if (simulate(Lr, bug).win) { allFail = false; break; } }
    if (allFail) break;
  }
  L.prefill = bug; L.bugId = bugId; L.debug = true; L.maxBlocks = undefined;
  if (L.requireBlock === 'REPEAT') L.maxBlocks = progCount(ref) + 1;
  return L;
}
function genLevel(sp, diff, r) {
  const g = { seq: genSeq, loop: genLoop, event: genEvent, light: genLight, stair: genStair, debug: genDebug }[sp.k];
  const L = g(sp, diff, r); L.kind = sp.k === 'debug' ? 'debug' : sp.k; L.baseKind = sp.k === 'debug' ? sp.base.k : sp.k;
  if (sp.goal) L.goalIcon = sp.goal; if (sp.story) L.story = sp.story;
  return L;
}

/* ================= ENGINE (shared by game + tests) ================= */
function newWorld(L, rand) {
  const coins = new Set(); L.grid.forEach((row, y) => row.forEach((c, x) => { if (c === 'c') coins.add(x + ',' + y); }));
  return { L, x: L.start.x, y: L.start.y, coins, total: coins.size, light: L.light ? (rand() < 0.5 ? 'green' : 'red') : null, rand, moves: 0, won: false };
}
function blocked(w, d) { const nx = w.x + DIRV[d][0], ny = w.y + DIRV[d][1]; return nx < 0 || ny < 0 || nx >= w.L.W || ny >= w.L.H || w.L.grid[ny][nx] === '#'; }
function evalCond(w, c) { if (c === 'green') return w.light === 'green'; const d = { wallR: 'R', wallU: 'U', wallD: 'D', wallL: 'L' }[c]; return d ? blocked(w, d) : false; }
function* execList(list, w) {
  for (const n of list) {
    if (DIRV[n.t]) yield { n, a: 'move', d: n.t };
    else if (n.t === 'WAIT') yield { n, a: 'wait' };
    else if (n.t === 'REPEAT') { for (let i = 0; i < n.n; i++) { yield { n, a: 'loop', i }; yield* execList(n.body, w); } }
    else if (n.t === 'IF' || n.t === 'IFELSE') { const ok = evalCond(w, n.c); yield { n, a: 'cond', ok }; yield* execList(ok ? n.body : (n.else || []), w); }
  }
}
// returns {res:'ok'|'win'|'fail', reason, coin}
function applyStep(w, s) {
  if (s.a === 'wait') { if (w.light) w.light = w.light === 'green' ? 'red' : 'green'; return { res: 'ok' }; }
  if (s.a !== 'move') return { res: 'ok' };
  const d = s.d; const nx = w.x + DIRV[d][0], ny = w.y + DIRV[d][1];
  if (w.light && w.light === 'red') return { res: 'fail', reason: 'red' };
  if (nx < 0 || ny < 0 || nx >= w.L.W || ny >= w.L.H) return { res: 'fail', reason: 'edge' };
  if (w.L.grid[ny][nx] === '#') return { res: 'fail', reason: 'wall' };
  w.x = nx; w.y = ny; w.moves++; let coin = false;
  const k = nx + ',' + ny; if (w.coins.has(k)) { w.coins.delete(k); coin = true; }
  if (w.light) w.light = w.rand() < 0.5 ? 'green' : 'red';
  if (nx === w.L.goal.x && ny === w.L.goal.y && (!w.L.requireCoins || w.coins.size === 0)) { w.won = true; return { res: 'win', coin }; }
  return { res: 'ok', coin };
}
function preCheck(L, p) {
  if (!progCount(p)) return 'empty';
  if (L.maxBlocks && progCount(p) > L.maxBlocks) return 'max';
  if (L.requireBlock && !progHas(p, L.requireBlock)) return 'require';
  if (L.requireBlock === 'EVENT' && !evHasBody(p)) return 'evEmpty';
  return null;
}
// headless simulation; presses: array of event colors pressed after main finishes
function simulate(L, p, presses, rand = Math.random) {
  const w = newWorld(L, rand); let steps = 0;
  const runGen = g => { for (const s of g) { if (++steps > 2000) return { res: 'fail', reason: 'loop' }; const r = applyStep(w, s); if (r.res !== 'ok') return r; } return null; };
  let r = runGen(execList(p.main, w));
  if (!r && presses) for (const c of presses) { const h = p.events.find(e => e.ev === c); if (!h) continue; r = runGen(execList(h.body, w)); if (r) break; }
  if (r && r.res === 'win') return { win: true };
  if (r) return { win: false, reason: r.reason };
  return { win: false, reason: (w.x === L.goal.x && w.y === L.goal.y) ? 'coins' : 'notReached' };
}

/* ================= AUDIO ================= */
const AU = { ctx: null, musicTimer: null };
function actx() { if (!AU.ctx) { try { AU.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } } if (AU.ctx && AU.ctx.state === 'suspended') AU.ctx.resume(); return AU.ctx; }
function tone(f, dur = 0.12, type = 'sine', vol = 0.15, when = 0) {
  if (S.muted) return; const c = actx(); if (!c) return; const t = c.currentTime + when;
  const o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
const SFX = {
  click: () => tone(660, 0.06, 'triangle', 0.08), add: () => tone(880, 0.08, 'triangle', 0.1), del: () => tone(300, 0.08, 'triangle', 0.08),
  move: () => tone(520, 0.07, 'square', 0.04), coin: () => { tone(988, 0.08, 'triangle', 0.12); tone(1319, 0.14, 'triangle', 0.12, 0.08); },
  bump: () => { tone(140, 0.25, 'sawtooth', 0.12); }, wait: () => tone(400, 0.15, 'sine', 0.06),
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', 0.14, i * 0.11)),
  star: () => tone(1175, 0.2, 'triangle', 0.12)
};
function musicLoop() {
  clearInterval(AU.musicTimer); AU.musicTimer = null;
  if (S.muted || !S.music) return;
  const notes = [392, 440, 523, 587, 523, 440, 392, 330, 349, 392, 440, 392, 330, 294, 330, 392]; let i = 0;
  AU.musicTimer = setInterval(() => { if (document.hidden || S.muted || !S.music) return; tone(notes[i % notes.length], 0.28, 'sine', 0.035); if (i % 4 === 0) tone(notes[i % notes.length] / 2, 0.4, 'triangle', 0.025); i++; }, 360);
}

/* ================= TIME TRACKING ================= */
let lastAct = Date.now(); let tickN = 0;
['pointerdown', 'keydown', 'touchstart'].forEach(e => addEventListener(e, () => { lastAct = Date.now(); }, true));
setInterval(() => {
  if (document.visibilityState !== 'visible' || Date.now() - lastAct > 120000 || UI.screen === 'parent' || UI.screen === 'pin') return;
  const k = todayKey(); S.time[k] = (S.time[k] || 0) + 1; if (G && G.mid && UI.screen === 'play') { const m = S.missions[G.mid]; if (m) m.sec = (m.sec || 0) + 1; }
  if (++tickN % 10 === 0) save(); updateTimerUI();
}, 1000);
addEventListener('visibilitychange', save); addEventListener('pagehide', save);
function mins(sec) { return Math.floor((sec || 0) / 60); }
function updateTimerUI() {
  const el = $('#todayTime'); if (!el) return; const s = S.time[todayKey()] || 0; const m = mins(s);
  el.innerHTML = `⏱️ ${T('ഇന്ന്', 'Today')} ${m}/30 ${T('മിനിറ്റ്', 'min')}<span class="bar"><i style="width:${Math.min(100, s / 18)}%"></i></span>`;
  if (s === 1800) toast(T('🌟 ഇന്നത്തെ 30 മിനിറ്റ് കഴിഞ്ഞു! അടിപൊളി! ഇനി വിശ്രമിക്കാം, നാളെ കാണാം 👋', '🌟 You did 30 minutes today! Great job! Time to rest — see you tomorrow 👋'), 6000);
}

/* ================= PROGRESS HELPERS ================= */
const did = (w, d) => `w${w}d${d}`;
const LESSONS = []; WEEKS.forEach(W => W.days.forEach((D, i) => LESSONS.push({ w: W.w, d: i + 1 })));
function dayDone(w, d) { return !!(S.days[did(w, d)] && S.days[did(w, d)].done); }
function firstOpenIdx() { const i = LESSONS.findIndex(x => !dayDone(x.w, x.d)); return i < 0 ? LESSONS.length : i; }
function isUnlocked(w, d) { if (S.unlockAll) return true; if (d >= 6) return dayDone(w, 5); const i = LESSONS.findIndex(x => x.w === w && x.d === d); return i <= firstOpenIdx(); }
function mid(w, d, i) { return `w${w}d${d}m${i}`; }
function mrec(id) { return S.missions[id] || (S.missions[id] = { attempts: 0, hints: 0, solved: false, indep: false, stars: 0, sec: 0 }); }
function missionSpec(w, d, i) { return WEEKS[w - 1].days[d - 1].m[i]; }
function specTags(W, sp, assess) {
  const t = new Set(); let main = sp.tag || W.skill; if (main === 'independent') main = sp.k === 'debug' ? 'debugging' : sp.k === 'loop' ? 'loops' : sp.k === 'event' ? 'events' : (sp.k === 'light' || sp.k === 'stair') ? 'conditions' : 'algorithms';
  t.add(main); if (W.w >= 8 && assess) t.add('independent'); return [...t];
}
function levelFor(w, d, i, practice) {
  const W = WEEKS[w - 1], D = W.days[d - 1], sp = D.m[i], id = mid(w, d, i), m = mrec(id);
  if (m.diff === undefined) { m.diff = D.assess ? 1 : (S.adapt[specTags(W, sp, false)[0]]?.d ?? 1); m.tags = specTags(W, sp, !!D.assess); m.assess = !!D.assess; m.first = Date.now(); }
  if (sp.k === 'make') return null;
  const diff = practice ? 0 : m.diff;
  const L = genLevel(sp, diff, RNG(hashStr(id + ':' + diff + (practice ? ':p' + practice : ''))));
  L.world = W.world; return L;
}
function skillStatus(sk) {
  const recs = Object.entries(S.missions).filter(([, m]) => m.assess && m.tags && m.tags.includes(sk) && m.attempts > 0).sort((a, b) => (a[1].first || 0) - (b[1].first || 0)).map(x => x[1]);
  if (!recs.length) return { st: 'none', n: 0 };
  const last = recs.slice(-3); const ind = last.filter(m => m.solved && m.indep && m.solveAttempts <= 3).length; const sol = last.filter(m => m.solved).length;
  let st; if (ind >= 2 || (last.length === 1 && ind === 1)) st = 'indep'; else if (sol >= Math.min(2, last.length)) st = 'help'; else st = 'practice';
  return { st, n: recs.length, ind, sol, last: last.length };
}
function adaptAfter(tag, m, practice) {
  if (practice || m.assess) return null; const a = S.adapt[tag] || (S.adapt[tag] = { d: 1, good: 0, bad: 0 }); let msg = null;
  if (m.indep && m.solveAttempts <= 2) { a.good++; a.bad = 0; if (a.good >= 2 && a.d < 3) { a.d++; a.good = 0; msg = T('സൂപ്പർ! 🚀 അടുത്ത ദൗത്യങ്ങൾ കുറച്ചുകൂടി കട്ടിയാക്കാം.', 'Super! 🚀 The next missions will be a little harder.'); } }
  else if (m.hints > 0 || m.solveAttempts >= 4) { a.bad++; a.good = 0; if (a.bad >= 2 && a.d > 0) { a.d--; a.bad = 0; } }
  return msg;
}

/* ================= UI CORE ================= */
const UI = { screen: 'home' };
let G = null; // play state
function show(screen, html) { UI.screen = screen; const app = $('#app'); app.innerHTML = html; app.scrollTop = 0; window.scrollTo(0, 0); document.body.dataset.screen = screen; }
function toast(t, ms = 3200) { const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = t; $('#toasts').appendChild(el); setTimeout(() => el.classList.add('out'), ms); setTimeout(() => el.remove(), ms + 500); }
function modal(html, buttons = [{ t: T('ശരി', 'OK'), v: true }], opts = {}) {
  return new Promise(res => {
    const bg = document.createElement('div'); bg.className = 'modal-bg';
    bg.innerHTML = `<div class="modal ${opts.cls || ''}">${html}<div class="mbtns">${buttons.map((b, i) => `<button class="btn ${b.cls || (i === 0 ? 'primary' : '')}" data-i="${i}">${b.t}</button>`).join('')}</div></div>`;
    bg.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (!b) return; SFX.click(); const v = buttons[+b.dataset.i].v; const extra = opts.read ? opts.read(bg) : undefined; bg.remove(); res(extra !== undefined ? { v, extra } : v); });
    $('#modals').appendChild(bg); const f = bg.querySelector('input'); if (f) setTimeout(() => f.focus(), 50);
  });
}
const ROBO = `<svg viewBox="0 0 100 100" class="robo-svg"><line x1="50" y1="6" x2="50" y2="20" stroke="#5a6b7d" stroke-width="4" stroke-linecap="round"/><circle class="bulb" cx="50" cy="7" r="6" fill="#ff5c8a"/><rect x="16" y="20" width="68" height="50" rx="18" fill="#62cdf5" stroke="#2b86b8" stroke-width="4"/><rect x="26" y="30" width="48" height="30" rx="12" fill="#fff"/><g class="eyes"><circle cx="40" cy="44" r="5.5" fill="#1d2b3a"/><circle cx="60" cy="44" r="5.5" fill="#1d2b3a"/><circle cx="42" cy="42" r="1.8" fill="#fff"/><circle cx="62" cy="42" r="1.8" fill="#fff"/></g><circle cx="31" cy="53" r="3.5" fill="#ffb3c7"/><circle cx="69" cy="53" r="3.5" fill="#ffb3c7"/><path d="M43 53 Q50 59 57 53" stroke="#1d2b3a" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="30" y="70" width="40" height="20" rx="7" fill="#62cdf5" stroke="#2b86b8" stroke-width="4"/><circle cx="50" cy="80" r="4" fill="#ffd34d"/><rect x="8" y="40" width="9" height="18" rx="4" fill="#2b86b8"/><rect x="83" y="40" width="9" height="18" rx="4" fill="#2b86b8"/></svg>`;
const CHEST = `<div class="chest"><div class="lid"></div><div class="box"><i></i></div></div>`;
function topbar(back, title) {
  return `<header class="top"><button class="ib" data-go="${back}" aria-label="തിരികെ">⬅️</button><div class="ttl">${title}</div><div class="tright"><span class="pill">🪙 ${S.coins}</span><span class="pill">⭐ ${S.stars}</span><button class="ib" id="muteBtn" aria-label="ശബ്ദം">${S.muted ? '🔇' : '🔊'}</button></div></header>`;
}
document.addEventListener('click', e => {
  if (e.target.closest('#langBtn')) { S.lang = LG() === 'en' ? 'ml' : 'en'; document.documentElement.lang = S.lang; save(); SFX.click(); home(); return; }
  const g = e.target.closest('[data-go]'); if (g) { SFX.click(); go(g.dataset.go); return; }
  if (e.target.closest('#muteBtn')) { S.muted = !S.muted; save(); $('#muteBtn').textContent = S.muted ? '🔇' : '🔊'; musicLoop(); }
  if (e.target.closest('#musicBtn')) { S.music = !S.music; save(); musicLoop(); e.target.closest('#musicBtn').textContent = S.music ? T('🎵 സംഗീതം: ഓൺ', '🎵 Music: on') : T('🎵 സംഗീതം: ഓഫ്', '🎵 Music: off'); }
});
function go(where) {
  stopRun();
  const [a, b, c] = where.split(':');
  if (a === 'home') home(); else if (a === 'map') mapScreen(); else if (a === 'day') dayScreen(+b, +c); else if (a === 'parent') parentGate(); else if (a === 'games') gamesScreen(); else if (a === 'dash') dashboard(b || 'overview');
}

/* ================= HOME & MAP ================= */
function nextLesson() { const i = firstOpenIdx(); return LESSONS[Math.min(i, LESSONS.length - 1)]; }
function home() {
  const n = nextLesson(); const W = WEEKS[n.w - 1]; const wd = WORLDS[W.world];
  const doneCount = LESSONS.filter(x => dayDone(x.w, x.d)).length;
  show('home', `<div class="home" style="--bg:${wd.bg}">
  <div class="home-top"><span class="pill">🪙 ${S.coins}</span><span class="pill">⭐ ${S.stars}</span><button class="ib" id="muteBtn">${S.muted ? '🔇' : '🔊'}</button><button class="ib" data-go="parent" title="Parent">👨‍👧</button></div>
  <h1 class="logo">Codeloo<br><span>${T('കളിച്ച് പഠിക്കാം, കോഡ് ചെയ്യാം!', 'Learn to code by playing!')}</span></h1>
  <div class="hero">${ROBO}<div class="bubble">${T(`ഹായ് ${esc(kidName())}! 👋 ഇന്നത്തെ പാഠം: ${dTitle(W, n.d)}`, `Hi ${esc(kidName())}! 👋 Today's lesson: ${dTitle(W, n.d)}`)}</div></div>
  <div id="todayTime" class="timer"></div>
  <button class="btn big primary" data-go="day:${n.w}:${n.d}">▶️ ${T('ഇന്നത്തെ പാഠം', "Today's Lesson")}<small>${T('ആഴ്ച', 'Week')} ${n.w} · ${T('ദിവസം', 'Day')} ${n.d} · ${wd.icon} ${T(wd.name, wd.en)}</small></button>
  <div class="row2"><button class="btn big" data-go="map">🗺️ ${T('ഭൂപടം', 'Map')}</button><button class="btn big" data-go="games">🎨 ${T('എന്റെ ഗെയിമുകൾ', 'My Games')}</button></div>
  <div class="progress-line">${T('പൂർത്തിയാക്കിയ പാഠങ്ങൾ', 'Lessons done')}: <b>${doneCount}/60</b> ${S.graduated ? T('· 🎓 ബിരുദം നേടി!', '· 🎓 Graduated!') : ''}</div>
  <div class="credit">${CREDIT}</div>
  <button class="btn small" id="langBtn">🌐 ${T('English', 'മലയാളം')}</button>
  <button class="btn small ghost" id="musicBtn">${S.music ? T('🎵 സംഗീതം: ഓൺ', '🎵 Music: on') : T('🎵 സംഗീതം: ഓഫ്', '🎵 Music: off')}</button>
  </div>`);
  updateTimerUI();
}
function mapScreen() {
  let h = topbar('home', T('🗺️ ഭൂപടം', '🗺️ Map')) + '<div class="map">';
  WORLDS.forEach((wd, wi) => {
    h += `<section class="world" style="--bg:${wd.bg};--edge:${wd.edge}"><h2>${wd.icon} ${T(wd.name, wd.en)}</h2>`;
    WEEKS.filter(W => W.world === wi).forEach(W => {
      h += `<div class="week"><div class="wk-t">${T('ആഴ്ച', 'Week')} ${W.w}: ${wTitle(W)}</div><div class="days">`;
      for (let d = 1; d <= 7; d++) {
        const un = isUnlocked(W.w, d), dn = dayDone(W.w, d); const lbl = d <= 4 ? d : d === 5 ? '🏅' : '✨';
        h += `<button class="dayb ${dn ? 'done' : ''} ${un ? '' : 'locked'} ${d >= 6 ? 'opt' : ''}" ${un ? `data-go="day:${W.w}:${d}"` : 'disabled'} title="${d <= 5 ? dTitle(W, d) : T('സൃഷ്ടി ദിവസം', 'Creative day')}">${un ? (dn ? '⭐' : lbl) : '🔒'}<small>${d <= 5 ? T('ദിവസം ', 'Day ') + d : T('ബോണസ്', 'Bonus')}</small></button>`;
      }
      h += '</div></div>';
    });
    h += '</section>';
  });
  show('map', h + `<p class="note">${T('🔒 മുമ്പത്തെ പാഠം കഴിയുമ്പോൾ അടുത്ത ദിവസം തുറക്കും. ✨ ബോണസ് ദിവസങ്ങൾ നിർബന്ധമില്ല.', '🔒 A day opens when you finish the one before it. ✨ Bonus days are optional.')}</p></div>`);
}

/* ================= DAY HUB ================= */
function dayScreen(w, d) {
  if (!isUnlocked(w, d)) { toast(T('🔒 ഈ ദിവസം ഇനിയും തുറന്നിട്ടില്ല', '🔒 This day is still locked')); return home(); }
  const W = WEEKS[w - 1], wd = WORLDS[W.world];
  if (d >= 6) return creativeDay(w, d);
  const D = W.days[d - 1]; const rec = S.days[did(w, d)] || (S.days[did(w, d)] = {}); if (!rec.opened) { rec.opened = Date.now(); logHist({ type: 'day-open', id: did(w, d) }); save(); }
  const ms = D.m.map((sp, i) => ({ sp, i, m: S.missions[mid(w, d, i)] }));
  const allSolved = ms.every(x => x.m && x.m.solved);
  let h = topbar('map', `${T('ആഴ്ച', 'Week')} ${w} · ${T('ദിവസം', 'Day')} ${d}`) + `<div class="day" style="--bg:${wd.bg}">
  <div class="learn card"><div class="lh"><span class="step">1</span> 📖 ${T('പഠിക്കാം', 'Learn')} <small>(5 ${T('മിനിറ്റ്', 'min')})</small></div>
   <h2>${wd.icon} ${dTitle(W, d)}</h2><div class="learn-body"><div class="mini-robo">${ROBO}</div><p>${dLearn(W, d)}</p></div>
   <div class="term">${dTerm(W, d)}</div>
   ${D.assess ? `<p class="assess-note">${T('🏅 ഇന്ന് പരീക്ഷണ ദിവസമാണ്. സൂചനകൾ ഉണ്ട്, പക്ഷേ ആദ്യം സ്വന്തമായി ശ്രമിക്കൂ!', '🏅 Test day! Hints are there, but try on your own first!')}</p>` : ''}
  </div>
  <div class="card"><div class="lh"><span class="step">2</span> 🎮 ${T('കളിച്ച് കോഡ് ചെയ്യാം', 'Play & code')} <small>(20 ${T('മിനിറ്റ്', 'min')})</small></div><div class="missions">`;
  ms.forEach(({ sp, i, m }) => {
    const unlocked = i === 0 || (S.missions[mid(w, d, i - 1)] || {}).solved || S.unlockAll;
    const icon = sp.k === 'make' ? '🎨' : sp.k === 'debug' ? '🐞' : sp.k === 'event' ? '⚡' : sp.k === 'light' ? '🚦' : sp.k === 'stair' ? '🧠' : sp.k === 'loop' ? '🔁' : '🧭';
    h += `<button class="mcard ${m && m.solved ? 'done' : ''}" ${unlocked ? `data-mission="${w}:${d}:${i}"` : 'disabled'}><span class="mi">${unlocked ? icon : '🔒'}</span><span>${T('ദൗത്യം', 'Mission')} ${i + 1}${sp.k === 'make' ? T(' · ഗെയിം ഉണ്ടാക്കാം', ' · Make a game') : ''}</span><span class="ms">${m && m.solved ? '⭐'.repeat(m.stars || 1) : ''}</span></button>`;
  });
  h += `</div></div><div class="card"><div class="lh"><span class="step">3</span> 🗣️ ${T('പഠിച്ചത് പറയാം', 'Tell what you learned')} <small>(5 ${T('മിനിറ്റ്', 'min')})</small></div>
   ${rec.done ? `<p>${T('✅ ഇന്നത്തെ പാഠം കഴിഞ്ഞു! 🎉', '✅ Today\'s lesson is done! 🎉')}</p>` : allSolved ? `<button class="btn primary" id="reflectBtn">🗣️ ${T('പറഞ്ഞുകൊടുക്കാം', 'Tell & answer')}</button>` : `<p class="muted">${T('എല്ലാ ദൗത്യങ്ങളും കഴിഞ്ഞാൽ ഇത് തുറക്കും.', 'This opens after all missions are done.')}</p>`}</div></div>`;
  show('day', h);
  $$('[data-mission]').forEach(b => b.onclick = () => { SFX.click(); const [a, bb, c] = b.dataset.mission.split(':').map(Number); startMission(a, bb, c); });
  const rb = $('#reflectBtn'); if (rb) rb.onclick = () => reflect(w, d);
}
async function reflect(w, d) {
  const W = WEEKS[w - 1]; const [q, opts] = wQuiz(W); const order = opts.map((o, i) => i).sort(() => Math.random() - 0.5);
  let tries = 0;
  for (; ;) {
    const v = await modal(`<h3>🗣️ ${T('പഠിച്ചത് പറയാം', 'Tell what you learned')}</h3><p class="tell">${wTell(W)}</p><hr><p><b>${q}</b></p>`, order.map(i => ({ t: opts[i], v: i, cls: 'opt' })), { cls: 'quiz' });
    tries++;
    if (v === 0) break;
    SFX.bump(); await modal(T('<p>🤔 ഏകദേശം ശരിയാണ്! ഒന്നുകൂടി ആലോചിച്ചു നോക്കൂ.</p>', '<p>🤔 Almost! Think again.</p>'), [{ t: T('വീണ്ടും ശ്രമിക്കാം', 'Try again'), v: 1 }]);
  }
  SFX.win();
  const k = did(w, d); S.quiz[k] = { tries, ts: Date.now() };
  const rec = S.days[k] || (S.days[k] = {}); const first = !rec.done; rec.done = true; rec.doneAt = rec.doneAt || Date.now();
  if (first) { S.coins += 10; logHist({ type: 'day-complete', id: k, quizTries: tries }); }
  save();
  await modal(`<div class="reward">${CHEST.replace('chest', 'chest open')}</div><h2>🎉 ${T('ദിവസം', 'Day')} ${d} ${T('കഴിഞ്ഞു!', 'complete!')}</h2><p>${T('നിധിപ്പെട്ടി തുറന്നു', 'Treasure opened')}: +10 🪙</p>${d === 5 ? `<p>🏅 ${T('ആഴ്ച', 'Week')} ${w} ${T('ബാഡ്ജ്', 'badge')}: ${WORLDS[W.world].icon} ${wTitle(W)}</p>` : ''}`, [{ t: T('അടുത്തത് ➡️', 'Next ➡️'), v: 1 }]);
  confetti();
  if (W.days[d - 1].grad) return graduation();
  home();
}
function creativeDay(w, d) {
  const W = WEEKS[w - 1], wd = WORLDS[W.world];
  show('day', topbar('map', `${T('ആഴ്ച', 'Week')} ${w} · ✨ ${T('സൃഷ്ടി ദിവസം', 'Creative day')}`) + `<div class="day" style="--bg:${wd.bg}"><div class="card"><h2>✨ ${T('സൃഷ്ടി ദിവസം (നിർബന്ധമില്ല)', 'Creative day (optional)')}</h2>
  <div class="learn-body"><div class="mini-robo">${ROBO}</div><p>${T('ഇന്ന് ഇഷ്ടമുള്ളത് ചെയ്യാം! സ്വന്തം ലെവൽ ഉണ്ടാക്കൂ, അല്ലെങ്കിൽ ഉണ്ടാക്കിയ ഗെയിമുകൾ കളിക്കൂ. ഒരു ഗെയിം സേവ് ചെയ്താൽ ഈ ദിവസത്തിന് ⭐ കിട്ടും.', 'Do what you like today! Make your own level or play your games. Save a game to get a ⭐ for this day.')}</p></div>
  <button class="btn big primary" id="cMake">🎨 ${T('പുതിയ ഗെയിം ഉണ്ടാക്കാം', 'Make a new game')}</button><button class="btn big" data-go="games">📂 ${T('എന്റെ ഗെയിമുകൾ', 'My Games')}</button>
  <button class="btn" data-go="day:${w}:1">🔁 ${T('ഈ ആഴ്ചയിലെ പാഠങ്ങൾ വീണ്ടും കളിക്കാം', "Replay this week's lessons")}</button></div></div>`);
  $('#cMake').onclick = () => maker({ creative: did(w, d), world: W.world });
}

/* ================= PLAY SCREEN ================= */
function startMission(w, d, i, practice = 0) {
  const sp = missionSpec(w, d, i);
  if (sp.k === 'make') { const W = WEEKS[w - 1]; mrec(mid(w, d, i)); levelFor(w, d, i); return maker({ mission: { w, d, i }, req: sp.req, world: W.world, final: sp.final }); }
  const L = levelFor(w, d, i, practice);
  play(L, { w, d, i, practice, mid: mid(w, d, i) });
}
function kindStory(L) {
  if (L.story) return tx(L.story);
  const ml = L.maxBlocks ? T(` (പരമാവധി ${L.maxBlocks} ബ്ലോക്കുകൾ)`, ` (max ${L.maxBlocks} blocks)`) : '';
  switch (L.kind) {
    case 'loop': return T('🔁 REPEAT ഉപയോഗിച്ച്, കുറച്ച് ബ്ലോക്കുകൾ കൊണ്ട് പെട്ടിയിൽ എത്തൂ!', '🔁 Use REPEAT to reach the chest with few blocks!') + ml;
    case 'event': return T('⚡ EVENT ബ്ലോക്കുകൾ വെക്കൂ. ▶️ അമർത്തിയ ശേഷം നിറമുള്ള ബട്ടണുകൾ അമർത്തി റോബോയെ കൊണ്ടുപോകൂ!', '⚡ Add EVENT blocks. Press ▶️, then use the coloured buttons to guide Robo!');
    case 'light': return T('🚦 ലൈറ്റ് പച്ചയാണെങ്കിൽ മാത്രം നീങ്ങണം! ചുവപ്പാണെങ്കിൽ ⏳ കാത്തിരിക്കൂ.', '🚦 Move only when the light is green! If it is red, ⏳ wait.') + ml;
    case 'stair': return T('🧠 ▶️ അമർത്തുമ്പോഴെല്ലാം വഴി മാറും! IF ഉപയോഗിച്ച്, ഏത് വഴിയിലും ജയിക്കുന്ന പ്രോഗ്രാം ഉണ്ടാക്കൂ.', '🧠 The path changes every time you press ▶️! Use IF to make a program that wins on any path.');
    case 'debug': return T('🐞 ഈ പ്രോഗ്രാമിൽ ഒരു ബഗ് (തെറ്റ്) ഉണ്ട്! ▶️ അമർത്തി നോക്കി, തെറ്റ് കണ്ടുപിടിച്ച് തിരുത്തൂ.', '🐞 This program has a bug! Press ▶️, find the mistake and fix it.');
    case 'custom': return T('🎮 നിങ്ങളുടെ സ്വന്തം ഗെയിം! കോഡ് ചെയ്ത് ജയിക്കൂ.', '🎮 Your own game! Code it and win.');
    default: return (L.requireCoins ? T('എല്ലാ 🪙 നാണയങ്ങളും എടുത്ത് റോബോയെ നിധിപ്പെട്ടിയിൽ എത്തിക്കൂ!', 'Collect all 🪙 coins and take Robo to the treasure chest!') : T('റോബോയെ നിധിപ്പെട്ടിയിൽ എത്തിക്കൂ!', 'Take Robo to the treasure chest!')) + ml;
  }
}
function play(L, ctx) {
  const wd = WORLDS[L.world || 0];
  G = { L, ctx, mid: ctx.mid || null, prog: L.prefill ? cloneProg(L.prefill) : (ctx.draft ? cloneProg(ctx.draft) : { main: [], events: [] }), target: 'main', hearts: 3, running: false, paused: false, fast: false, fails: 0, hintLvl: 0, runId: 0 };
  if (L.prefill && L.bugId) { const mapId = (a, b) => { for (let i = 0; i < a.length; i++) { if (a[i].id === L.bugId) return b[i].id; for (const k of ['body', 'else']) if (a[i][k]) { const r = mapId(a[i][k], b[i][k]); if (r) return r; } } return null; }; G.bugId = mapId(L.prefill.main, G.prog.main); }
  const title = ctx.mid ? `${T('ദൗത്യം', 'Mission')} ${ctx.i + 1}/3${ctx.practice ? T(' · പരിശീലനം', ' · Practice') : ''}` : (ctx.title || '🎮');
  const back = ctx.back || (ctx.w ? `day:${ctx.w}:${ctx.d}` : 'games');
  show('play', topbar(back, title) + `<div class="play" style="--bg:${wd.bg};--tile:${wd.tile};--edge:${wd.edge}">
   <div class="pleft">
    <div class="story"><span class="sr">🤖</span><span id="storyTxt">${kindStory(L)}</span></div>
    <div class="status"><span id="hearts"></span><span id="lightUI"></span><span id="blkCount"></span></div>
    <div class="board-wrap"><div id="board"></div></div>
    <div id="evBtns" class="evbtns"></div>
    <div class="controls"><button class="btn run" id="runBtn">▶️ ${T('തുടങ്ങൂ', 'Run')}</button><button class="btn" id="pauseBtn" disabled>⏸️</button><button class="btn" id="resetBtn" title="Reset">🔄</button><button class="btn" id="speedBtn">🐢</button><button class="btn hint" id="hintBtn">💡 ${T('സൂചന', 'Hint')}</button></div>
   </div>
   <div class="pright">
    <div class="pal-title">🧩 ${T('ബ്ലോക്കുകൾ', 'Blocks')} <small>${T('തൊട്ടാൽ ചേരും · വലിച്ചുനീക്കി ക്രമം മാറ്റാം', 'Tap to add · Drag to move')}</small></div>
    <div id="palette" class="palette"></div>
    <div id="workspace" class="workspace"></div>
    <button class="btn small ghost" id="clearBtn">🧹 ${T('എല്ലാം മായ്ക്കുക', 'Clear all')}</button>
   </div></div>`);
  renderPalette(); renderBoard(); renderProg(); renderHearts();
  $('#runBtn').onclick = runProgram; $('#pauseBtn').onclick = togglePause; $('#resetBtn').onclick = () => { stopRun(); resetBoard(); };
  $('#speedBtn').onclick = () => { G.fast = !G.fast; $('#speedBtn').textContent = G.fast ? '🐇' : '🐢'; };
  $('#hintBtn').onclick = giveHint;
  $('#clearBtn').onclick = async () => { if (G.running) return; if (await modal(T('<p>എല്ലാ ബ്ലോക്കുകളും മായ്ക്കണോ?</p>', '<p>Clear all blocks?</p>'), [{ t: T('മായ്ക്കാം', 'Yes'), v: true }, { t: T('വേണ്ട', 'No'), v: false }])) { G.prog = { main: [], events: [] }; G.target = 'main'; renderProg(); } };
  addEventListener('resize', onResize);
}
function onResize() { if (UI.screen === 'play' && G) renderBoard(true); }
function renderHearts() { const h = $('#hearts'); if (h) h.innerHTML = '❤️'.repeat(G.hearts) + '🤍'.repeat(3 - G.hearts); }
function cellSize() { const wrap = $('.board-wrap'); const avail = Math.min(wrap ? wrap.clientWidth - 8 : 340, 520); const L = G.L; return Math.max(34, Math.min(72, Math.floor(avail / L.W), Math.floor((innerHeight * (innerWidth > 900 ? 0.55 : 0.38)) / L.H))); }
function renderBoard(keepWorld) {
  const L = G.L, b = $('#board'); if (!b) return; const cs = cellSize(); G.cs = cs;
  if (!keepWorld || !G.world) G.world = newWorld(L, Math.random);
  const w = G.world; b.style.gridTemplateColumns = `repeat(${L.W},${cs}px)`; b.style.width = cs * L.W + 'px'; b.style.height = cs * L.H + 'px'; b.style.setProperty('--cs', cs + 'px');
  const ob = WORLDS[L.world || 0].ob; let h = '';
  for (let y = 0; y < L.H; y++) for (let x = 0; x < L.W; x++) {
    const c = L.grid[y][x]; const k = x + ',' + y; let inner = '';
    if (c === '#') inner = `<span class="ob">${ob}</span>`; else if (c === 'c' && w.coins.has(k)) inner = '<span class="coin">🪙</span>';
    else if (c === 'G') inner = L.goalIcon ? `<span class="goal-ic">${L.goalIcon}</span>` : CHEST;
    h += `<div class="cell ${(x + y) % 2 ? 'alt' : ''} ${c === '#' ? 'wall' : ''} ${c === 'G' ? 'goal' : ''}" data-c="${k}">${inner}</div>`;
  }
  h += `<div id="robo" class="robo" style="width:${cs}px;height:${cs}px">${ROBO}</div>`;
  b.innerHTML = h; placeRobo(true); renderLight();
}
function placeRobo(instant) { const r = $('#robo'); if (!r) return; if (instant) r.style.transition = 'none'; r.style.transform = `translate(${G.world.x * G.cs}px,${G.world.y * G.cs}px)`; if (instant) { r.offsetHeight; r.style.transition = ''; } }
function renderLight() { const el = $('#lightUI'); if (!el) return; el.innerHTML = G.world.light ? `<span class="tl ${G.world.light}"><i class="r"></i><i class="g"></i></span>` : ''; }
function resetBoard() {
  if (G.L.stair) { Object.assign(G.L, stairLayout(G.L.W, G.L.H, Math.random)); delete G.L.moves; }
  G.world = null; renderBoard(); clearHL(); $('#evBtns').innerHTML = '';
}
function renderPalette() {
  const p = $('#palette'); p.innerHTML = G.L.palette.map(t => `<div class="pal blk t-${t}" data-type="${t}"><span class="bi">${BLK[t].i}</span><span class="bl">${blkL(t)}</span></div>`).join('');
}
/* ---- program rendering ---- */
function condOpts() { return G.L.conds || ['wallR', 'wallU', 'wallD', 'wallL', ...(G.L.light ? ['green'] : [])]; }
function renderNode(n, path) {
  const sel = (p) => G.target === p ? ' target' : '';
  const del = `<button class="x" data-del="${n.id}" aria-label="നീക്കുക">✖</button>`;
  if (DIRV[n.t] || n.t === 'WAIT') return `<div class="blk t-${n.t}" data-id="${n.id}"><span class="bi">${BLK[n.t].i}</span><span class="bl">${blkL(n.t)}</span>${del}</div>`;
  if (n.t === 'REPEAT') return `<div class="blk cont t-REPEAT" data-id="${n.id}"><div class="bh"><span class="bi">🔁</span><span class="bl">${blkL('REPEAT')}</span><span class="cnt"><button data-dec="${n.id}">−</button><b>${n.n}</b><button data-inc="${n.id}">+</button></span><span class="tv">${T('തവണ', 'times')}</span>${del}</div>${renderList(n.body, path + '.body', sel(path + '.body'))}</div>`;
  if (n.t === 'IF' || n.t === 'IFELSE') return `<div class="blk cont t-IF" data-id="${n.id}"><div class="bh"><span class="bl"><b>IF</b> ${T('എങ്കിൽ', '')}</span><button class="cond" data-cond="${n.id}">${tx(CONDS[n.c])}</button>${del}</div>${renderList(n.body, path + '.body', sel(path + '.body'))}${n.t === 'IFELSE' ? `<div class="bh else"><span class="bl"><b>ELSE</b> ${T('അല്ലെങ്കിൽ', '')}</span></div>${renderList(n.else, path + '.else', sel(path + '.else'))}` : ''}</div>`;
  if (n.t === 'EVENT') return `<div class="blk cont t-EVENT" data-id="${n.id}"><div class="bh"><span class="bi">⚡</span><span class="bl"><b>EVENT</b> ${T('സംഭവം:', 'when')}</span><button class="evc" data-evc="${n.id}">${EVC[n.ev]}</button><span class="tv">${T('അമർത്തുമ്പോൾ', 'is pressed')}</span>${del}</div>${renderList(n.body, path + '.body', sel(path + '.body'))}</div>`;
}
function renderList(list, path, cls = '') { return `<div class="list${cls}" data-path="${path}">${list.map((n, i) => renderNode(n, path + '.' + i)).join('')}${G.target === path ? `<div class="here">${T('👇 പുതിയ ബ്ലോക്ക് ഇവിടെ വരും', '👇 New blocks go here')}</div>` : ''}</div>`; }
function renderProg() {
  const ws = $('#workspace'); if (!ws) return;
  const hasEv = G.L.palette.includes('EVENT');
  ws.innerHTML = `<div class="script"><div class="hat">🚩 <b>START</b> ${T('തുടക്കം', '')}</div>${renderList(G.prog.main, 'main', G.target === 'main' ? ' target' : '')}</div>` +
    (hasEv || G.prog.events.length ? `<div class="script ev"><div class="hat ev">⚡ EVENTS ${T('– സംഭവങ്ങൾ', '')}</div>${renderList(G.prog.events, 'events', '')}</div>` : '');
  const bc = $('#blkCount'); const c = progCount(G.prog); if (bc) bc.innerHTML = `🧩 ${c}${G.L.maxBlocks ? '/' + G.L.maxBlocks : ''}`; if (bc) bc.className = G.L.maxBlocks && c > G.L.maxBlocks ? 'over' : '';
}
function getList(path) { const t = path.split('.'); let o = G.prog[t[0]]; for (let i = 1; i < t.length; i++) { const k = t[i]; o = /^\d+$/.test(k) ? o[+k] : o[k]; if (!o) return null; } return o; }
function findNode(id, list = null, parent = null) {
  const lists = list ? [list] : [G.prog.main, G.prog.events];
  for (const l of lists) for (let i = 0; i < l.length; i++) { const n = l[i]; if (n.id === id) return { list: l, i, n }; for (const k of ['body', 'else']) if (n[k]) { const r = findNode(id, n[k]); if (r) return r; } }
  return null;
}
function containsList(n, arr) { for (const k of ['body', 'else']) if (n[k]) { if (n[k] === arr) return true; for (const c of n[k]) if (containsList(c, arr)) return true; } return false; }
function insertNode(node, path, idx) {
  if (node.t === 'EVENT') { path = 'events'; if (G.prog.events.some(e => e.ev === node.ev)) { const free = Object.keys(EVC).find(c => !G.prog.events.some(e => e.ev === c)); if (!free) { toast(T('മൂന്ന് EVENT ബ്ലോക്കുകൾ മാത്രമേ വെക്കാൻ പറ്റൂ', 'Only three EVENT blocks are allowed')); return false; } node.ev = free; } }
  else if (path === 'events') path = 'main';
  const list = getList(path) || G.prog.main; if (idx === undefined || idx > list.length) idx = list.length; list.splice(idx, 0, node); return true;
}
function addFromPalette(t, path, idx) {
  if (G.running) return; const n = mk(t, t === 'IF' || t === 'IFELSE' ? { c: condOpts()[0] } : {});
  if (!insertNode(n, path ?? G.target, idx)) return;
  if (n.body) G.target = (n.t === 'EVENT' ? 'events.' + G.prog.events.indexOf(n) : pathOf(n.id)) + '.body';
  SFX.add(); renderProg();
}
function pathOf(id) {
  const walk = (list, p) => { for (let i = 0; i < list.length; i++) { const n = list[i]; const np = p + '.' + i; if (n.id === id) return np; for (const k of ['body', 'else']) if (n[k]) { const r = walk(n[k], np + '.' + k); if (r) return r; } } return null; };
  return walk(G.prog.main, 'main') || walk(G.prog.events, 'events');
}
/* ---- interactions: tap + pointer drag ---- */
document.addEventListener('click', e => {
  if (UI.screen !== 'play' || !G) return;
  const t = e.target;
  if (G.running && t.closest('#workspace')) return;
  const del = t.closest('[data-del]'); if (del) { const f = findNode(del.dataset.del); if (f) { f.list.splice(f.i, 1); if (!getList(G.target)) G.target = 'main'; SFX.del(); renderProg(); } return; }
  const inc = t.closest('[data-inc]'), dec = t.closest('[data-dec]');
  if (inc || dec) { const f = findNode((inc || dec).dataset[inc ? 'inc' : 'dec']); f.n.n = Math.max(1, Math.min(10, f.n.n + (inc ? 1 : -1))); SFX.click(); renderProg(); return; }
  const cd = t.closest('[data-cond]'); if (cd) { const f = findNode(cd.dataset.cond); const o = condOpts(); f.n.c = o[(o.indexOf(f.n.c) + 1) % o.length]; SFX.click(); renderProg(); return; }
  const ev = t.closest('[data-evc]'); if (ev) { const f = findNode(ev.dataset.evc); const cs = Object.keys(EVC).filter(c => c === f.n.ev || !G.prog.events.some(e => e.ev === c)); f.n.ev = cs[(cs.indexOf(f.n.ev) + 1) % cs.length]; SFX.click(); renderProg(); return; }
  const lst = t.closest('#workspace .list'); const hdr = t.closest('#workspace .bh');
  if (hdr) { const id = hdr.parentElement.dataset.id; const p = pathOf(id); if (p) { G.target = p + '.body'; renderProg(); } return; }
  if (lst && !t.closest('.blk:not(.cont)')) { if (lst.dataset.path !== 'events') { G.target = lst.dataset.path; renderProg(); } return; }
  if (t.closest('.hat') && !t.closest('.hat.ev')) { G.target = 'main'; renderProg(); }
});
let DR = null;
document.addEventListener('pointerdown', e => {
  if (UI.screen !== 'play' || !G || G.running) return;
  if (e.button > 0 || e.target.closest('button')) return;
  const pal = e.target.closest('.pal'); const blk = !pal && e.target.closest('#workspace .blk');
  if (!pal && !blk) return;
  DR = { pal: !!pal, type: pal ? pal.dataset.type : null, id: blk ? blk.dataset.id : null, el: pal || blk, sx: e.clientX, sy: e.clientY, moved: false, pid: e.pointerId };
});
document.addEventListener('pointermove', e => {
  if (!DR || e.pointerId !== DR.pid) return;
  if (!DR.moved) { if (Math.hypot(e.clientX - DR.sx, e.clientY - DR.sy) < 8) return; DR.moved = true; const gh = DR.el.cloneNode(true); gh.classList.add('dragghost'); gh.querySelectorAll('.list').forEach(x => x.remove()); document.body.appendChild(gh); DR.ghost = gh; if (!DR.pal) DR.el.classList.add('dragging'); }
  e.preventDefault(); if (e.clientY > innerHeight - 50) scrollBy(0, 14); else if (e.clientY < 70) scrollBy(0, -14);
  DR.ghost.style.transform = `translate(${e.clientX - 30}px,${e.clientY - 20}px)`;
  const tgt = dropTarget(e.clientX, e.clientY); $$('.ins').forEach(x => x.remove()); $$('.list.hover').forEach(x => x.classList.remove('hover'));
  if (tgt && tgt.list) { tgt.list.classList.add('hover'); const line = document.createElement('div'); line.className = 'ins'; const kids = tgt.kids; if (tgt.idx < kids.length) tgt.list.insertBefore(line, kids[tgt.idx]); else tgt.list.appendChild(line); }
  $('#palette').classList.toggle('trash', !!(tgt && tgt.trash && !DR.pal));
}, { passive: false });
document.addEventListener('pointerup', e => {
  if (!DR || e.pointerId !== DR.pid) return; const d = DR; DR = null;
  $$('.ins').forEach(x => x.remove()); $$('.list.hover').forEach(x => x.classList.remove('hover')); if ($('#palette')) $('#palette').classList.remove('trash');
  if (d.ghost) d.ghost.remove(); if (d.el) d.el.classList.remove('dragging');
  if (!d.moved) { if (d.pal) addFromPalette(d.type); return; }
  const tgt = dropTarget(e.clientX, e.clientY);
  if (d.pal) { if (tgt && tgt.list) addFromPalette(d.type, tgt.path, tgt.idx); return; }
  const f = findNode(d.id); if (!f) return;
  if (!tgt || tgt.trash) { f.list.splice(f.i, 1); if (!getList(G.target)) G.target = 'main'; SFX.del(); renderProg(); return; }
  if (!tgt.list) return;
  const dest = getList(tgt.path); if (!dest || dest === f.n.body || dest === f.n.else || containsList(f.n, dest)) return;
  let idx = tgt.idx; if (dest === f.list && f.i < idx) idx--;
  f.list.splice(f.i, 1);
  if (f.n.t === 'EVENT' && tgt.path !== 'events') { G.prog.events.splice(Math.min(f.i, G.prog.events.length), 0, f.n); }
  else if (f.n.t !== 'EVENT' && tgt.path === 'events') { G.prog.main.push(f.n); }
  else dest.splice(idx, 0, f.n);
  if (!getList(G.target)) G.target = 'main'; SFX.add(); renderProg();
});
document.addEventListener('pointercancel', () => { if (DR) { if (DR.ghost) DR.ghost.remove(); if (DR.el) DR.el.classList.remove('dragging'); DR = null; $$('.ins').forEach(x => x.remove()); } });
function dropTarget(x, y) {
  const el = document.elementFromPoint(x, y); if (!el) return null;
  if (el.closest('#palette')) return { trash: true };
  let list = el.closest('#workspace .list');
  if (!list) { if (el.closest('#workspace')) list = $('#workspace .list[data-path="main"]'); else return { trash: true }; }
  const kids = [...list.children].filter(c => c.classList.contains('blk') && !c.classList.contains('dragging'));
  const all = [...list.children].filter(c => c.classList.contains('blk'));
  let idx = all.length; for (let i = 0; i < all.length; i++) { const r = all[i].getBoundingClientRect(); if (y < r.top + r.height / 2) { idx = i; break; } }
  return { list, path: list.dataset.path, idx, kids: all };
}

/* ---- running ---- */
function clearHL() { $$('.blk.running,.blk.err').forEach(x => x.classList.remove('running', 'err')); }
function hl(id, cls = 'running') { clearHL(); const el = document.querySelector(`#workspace [data-id="${id}"]`); if (el) { el.classList.add(cls); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } }
function stopRun() { if (G) { G.runId++; G.running = false; G.paused = false; } }
function togglePause() { if (!G.running) return; G.paused = !G.paused; $('#pauseBtn').textContent = G.paused ? '▶️' : '⏸️'; }
const REASON = {
  wall: ['അയ്യോ! റോബോ തടസ്സത്തിൽ ഇടിച്ചു 💥 തിളങ്ങുന്ന ബ്ലോക്ക് നോക്കൂ.', 'Oops! Robo bumped into an obstacle 💥 Look at the glowing block.'],
  edge: ['അയ്യോ! റോബോ കളത്തിന് പുറത്തേക്ക് പോകാൻ നോക്കി 🙈', 'Oops! Robo tried to walk off the board 🙈'],
  red: ['ചുവപ്പ് ലൈറ്റ്! 🔴 പച്ചയാകുന്നത് വരെ ⏳ കാത്തിരിക്കണമായിരുന്നു.', 'Red light! 🔴 Robo had to ⏳ wait for green.'],
  notReached: ['റോബോ ലക്ഷ്യത്തിൽ എത്തിയില്ല. കുറച്ച് ബ്ലോക്കുകൾ കൂടി വേണോ? 🤔', 'Robo did not reach the goal. Do you need more blocks? 🤔'],
  coins: ['എല്ലാ 🪙 നാണയങ്ങളും എടുത്തില്ല. വഴി ഒന്ന് മാറ്റി നോക്കൂ!', 'Not all 🪙 coins were collected. Try a different path!'],
  loop: ['റോബോ കുറേ നേരം ഓടി ക്ഷീണിച്ചു 😵 ബ്ലോക്കുകളോ എണ്ണമോ കുറയ്ക്കൂ.', 'Robo ran too long and got tired 😵 Use fewer blocks or a smaller number.'],
  idle: ['നിറമുള്ള ബട്ടണുകൾ അമർത്തിയില്ലല്ലോ! ▶️ അമർത്തിയ ശേഷം 🔴🔵🟡 അമർത്തണം.', 'You did not press the coloured buttons! Press ▶️, then press 🔴🔵🟡.']
};
async function runProgram() {
  if (G.running) return; actx();
  const pc = preCheck(G.L, G.prog);
  if (pc) {
    const rb = G.L.requireBlock ? BLK[G.L.requireBlock].i + ' ' + BLK[G.L.requireBlock].en : '';
    const msg = { empty: T('ആദ്യം ബ്ലോക്കുകൾ വെക്കൂ! 🧩 ബ്ലോക്കിൽ തൊട്ടാൽ അത് പ്രോഗ്രാമിലേക്ക് വരും.', 'Add some blocks first! 🧩 Tap a block to add it.'), max: T(`ബ്ലോക്കുകൾ കൂടുതലാണ്! പരമാവധി ${G.L.maxBlocks}. 🔁 REPEAT ഉപയോഗിച്ച് ചെറുതാക്കാമോ?`, `Too many blocks! Max ${G.L.maxBlocks}. Can you make it shorter with 🔁 REPEAT?`), require: T(`ഈ ദൗത്യത്തിൽ ${rb} ബ്ലോക്ക് ഉപയോഗിക്കണം.`, `This mission needs the ${rb} block.`), evEmpty: T('⚡ EVENT ബ്ലോക്കിന്റെ ഉള്ളിൽ ദിശാ ബ്ലോക്കുകൾ വെക്കൂ.', '⚡ Put direction blocks inside the EVENT block.') }[pc];
    toast('💡 ' + msg, 4000); return;
  }
  if (G.L.stair) { Object.assign(G.L, stairLayout(G.L.W, G.L.H, Math.random)); delete G.L.moves; }
  G.world = null; renderBoard(); clearHL();
  const myRun = ++G.runId; G.running = true; G.paused = false; $('#runBtn').disabled = true; $('#pauseBtn').disabled = false; $('#pauseBtn').textContent = '⏸️';
  const m = G.mid ? mrec(G.mid) : null; if (m && !G.ctx.practice) { m.attempts++; save(); }
  const w = G.world; const hasEv = G.prog.events.some(e => e.body.length);
  const queue = []; let active = null; let mainGen = execList(G.prog.main, w), mainDone = false, steps = 0, idle = 0, result = null;
  const evb = $('#evBtns'); evb.innerHTML = hasEv ? G.prog.events.filter(e => e.body.length).map(e => `<button class="evbtn ${e.ev}" data-fire="${e.ev}">${EVC[e.ev]}</button>`).join('') + `<button class="btn small" id="stopEv">⏹️ ${T('നിർത്തുക', 'Stop')}</button>` : '';
  evb.onclick = ev => { const b = ev.target.closest('[data-fire]'); if (b) { queue.push(b.dataset.fire); b.classList.add('pressed'); setTimeout(() => b.classList.remove('pressed'), 150); SFX.click(); } if (ev.target.closest('#stopEv')) { result = { res: 'fail', reason: w.moves ? 'notReached' : 'idle' }; } };
  const spd = () => G.fast ? 220 : 480;
  while (G.runId === myRun && !result) {
    while (G.paused && G.runId === myRun) await sleep(100);
    let s = null;
    if (active) { const r = active.next(); if (r.done) { active = null; continue; } s = r.value; }
    else if (!mainDone) { const r = mainGen.next(); if (r.done) { mainDone = true; continue; } s = r.value; }
    else if (queue.length) { const c = queue.shift(); const h = G.prog.events.find(e => e.ev === c); if (h) { active = execList(h.body, w); hl(h.id); await sleep(150); } continue; }
    else if (hasEv) { await sleep(100); idle += 100; if (idle > 40000) result = { res: 'fail', reason: w.moves ? 'notReached' : 'idle' }; continue; }
    else { result = { res: 'fail', reason: (w.x === G.L.goal.x && w.y === G.L.goal.y) ? 'coins' : 'notReached' }; break; }
    idle = 0; if (++steps > 600) { result = { res: 'fail', reason: 'loop' }; break; }
    hl(s.n.id);
    if (s.a === 'loop' || s.a === 'cond') { if (s.a === 'cond') { const el = document.querySelector(`#workspace [data-id="${s.n.id}"]`); if (el) { el.classList.add(s.ok ? 'yes' : 'no'); setTimeout(() => el.classList.remove('yes', 'no'), 400); } } await sleep(G.fast ? 90 : 220); continue; }
    const r = applyStep(w, s);
    if (r.res === 'fail') { result = r; bumpAnim(s.d); hl(s.n.id, 'err'); break; }
    if (s.a === 'wait') { SFX.wait(); $('#robo').classList.add('waiting'); renderLight(); await sleep(spd()); $('#robo').classList.remove('waiting'); continue; }
    SFX.move(); placeRobo(); $('#robo').classList.add('hop'); setTimeout(() => { const rb = $('#robo'); if (rb) rb.classList.remove('hop'); }, 300);
    if (r.coin) { SFX.coin(); const c = document.querySelector(`.cell[data-c="${w.x},${w.y}"] .coin`); if (c) c.classList.add('got'); }
    await sleep(spd()); renderLight();
    if (r.res === 'win') { result = r; break; }
  }
  if (G.runId !== myRun) return;
  G.running = false; $('#runBtn').disabled = false; $('#pauseBtn').disabled = true; evb.innerHTML = '';
  if (result.res === 'win') return onWin(); return onFail(result.reason);
}
function bumpAnim(d) { SFX.bump(); const r = $('#robo'); if (!r) return; r.style.setProperty('--bx', (d ? DIRV[d][0] * 10 : 0) + 'px'); r.style.setProperty('--by', (d ? DIRV[d][1] * 10 : 0) + 'px'); r.classList.add('bump'); setTimeout(() => r.classList.remove('bump'), 500); }
async function onFail(reason) {
  G.fails++; G.hearts = Math.max(0, G.hearts - 1); renderHearts();
  if (G.mid) logHist({ type: 'run', id: G.mid, ok: false, reason, practice: G.ctx.practice || 0 });
  save(); await sleep(500);
  if (G.hearts === 0) {
    const easy = G.ctx.mid && !G.ctx.practice;
    const v = await modal(`<div class="mrobo">${ROBO}</div><h3>${T('റോബോ ഒന്ന് വിശ്രമിക്കട്ടെ 😊', 'Robo needs a little rest 😊')}</h3><p>${tx(REASON[reason]) || ''}</p><p>${T('സാരമില്ല! തെറ്റുകളിൽ നിന്നാണ് നമ്മൾ പഠിക്കുന്നത്.', 'No problem! We learn from mistakes.')} ${easy ? T('ഒരു എളുപ്പമുള്ള പരിശീലനം ചെയ്തിട്ട് തിരിച്ചു വരാം?', 'Shall we do an easier practice first?') : ''}</p>`,
      easy ? [{ t: T('🌱 എളുപ്പമുള്ള പരിശീലനം', '🌱 Easier practice'), v: 'easy' }, { t: T('💡 സൂചന നോക്കാം', '💡 See a hint'), v: 'hint' }, { t: T('🔄 വീണ്ടും ശ്രമിക്കാം', '🔄 Try again'), v: 'retry' }] : [{ t: T('🔄 വീണ്ടും ശ്രമിക്കാം', '🔄 Try again'), v: 'retry' }, { t: T('💡 സൂചന', '💡 Hint'), v: 'hint' }]);
    G.hearts = 3; renderHearts();
    if (v === 'easy') { const c = G.ctx; logHist({ type: 'practice-start', id: c.mid }); const L = levelFor(c.w, c.d, c.i, (c.practiceN || 0) + 1); return play(L, { ...c, practice: 1, practiceN: (c.practiceN || 0) + 1, parentCtx: c }); }
    if (v === 'hint') giveHint();
    return;
  }
  const v = await modal(`<div class="mrobo sad">${ROBO}</div><p>${tx(REASON[reason]) || T('ഒന്നുകൂടി ശ്രമിക്കൂ!', 'Try again!')}</p><p class="muted">${T('സാരമില്ല! 💪 ബ്ലോക്കുകൾ മാറ്റി വീണ്ടും ▶️ അമർത്തൂ.', 'No problem! 💪 Change the blocks and press ▶️ again.')}</p>`, G.fails >= 2 ? [{ t: T('ശരി, ഞാൻ ശരിയാക്കാം', 'OK, I will fix it'), v: 'ok' }, { t: T('💡 സൂചന വേണോ?', '💡 Need a hint?'), v: 'hint' }] : [{ t: T('ശരി, ഞാൻ ശരിയാക്കാം', 'OK, I will fix it'), v: 'ok' }]);
  if (v === 'hint') giveHint();
}
function stars() { let s = 1; if (G.world.total === 0 || G.world.coins.size === 0) s++; if (progCount(G.prog) <= progCount(G.L.ref || G.prog) + 1) s++; return s; }
async function onWin() {
  SFX.win(); const goalCell = document.querySelector('.cell.goal .chest'); if (goalCell) goalCell.classList.add('open'); confetti();
  const st = stars(); const got = G.world.total - G.world.coins.size; let extra = '';
  if (G.mid && !G.ctx.practice) {
    const m = mrec(G.mid); const firstSolve = !m.solved;
    if (firstSolve) { m.solved = true; m.indep = m.hints === 0; m.solveAttempts = m.attempts; m.solvedAt = Date.now(); S.coins += got + 5; }
    if (st > (m.stars || 0)) { S.stars += st - (m.stars || 0); m.stars = st; }
    logHist({ type: 'run', id: G.mid, ok: true, stars: st, attempts: m.attempts, hints: m.hints, first: firstSolve });
    if (firstSolve) { const msg = adaptAfter(m.tags[0], m, false); if (msg) extra = `<p class="adapt">${msg}</p>`; }
  } else if (G.mid && G.ctx.practice) { logHist({ type: 'practice-win', id: G.mid }); extra = T('<p>🌱 പരിശീലനം കഴിഞ്ഞു! ഇനി യഥാർത്ഥ ദൗത്യം ഒന്നുകൂടി ശ്രമിക്കാം 💪</p>', '<p>🌱 Practice done! Now try the real mission again 💪</p>'); }
  else if (G.ctx.onWin) { save(); await sleep(600); return G.ctx.onWin(G); }
  save(); await sleep(700);
  const c = G.ctx;
  const btns = c.practice ? [{ t: T('ദൗത്യത്തിലേക്ക് ➡️', 'Back to mission ➡️'), v: 'back' }] : c.mid ? (c.i < 2 ? [{ t: T('അടുത്ത ദൗത്യം ➡️', 'Next mission ➡️'), v: 'next' }, { t: T('🔄 വീണ്ടും കളിക്കാം', '🔄 Play again'), v: 'again' }] : [{ t: T('പഠിച്ചത് പറയാം 🗣️', 'Tell what you learned 🗣️'), v: 'day' }]) : [{ t: T('ശരി', 'OK'), v: 'games' }];
  const v = await modal(`<div class="reward">${CHEST.replace('chest', 'chest open')}</div><h2>${T('അടിപൊളി', 'Awesome')} ${esc(kidName())}! 🎉</h2><div class="stars">${'⭐'.repeat(st)}${'☆'.repeat(3 - st)}</div><p>+${got} 🪙 ${T('നാണയങ്ങൾ', 'coins')}</p>${extra}`, btns);
  if (v === 'next') startMission(c.w, c.d, c.i + 1); else if (v === 'again') startMission(c.w, c.d, c.i); else if (v === 'back') startMission(c.w, c.d, c.i); else if (v === 'day') dayScreen(c.w, c.d); else go(c.back || 'games');
}
function confetti() { const box = document.createElement('div'); box.className = 'confetti'; for (let i = 0; i < 40; i++) { const s = document.createElement('i'); s.style.left = Math.random() * 100 + '%'; s.style.background = `hsl(${Math.random() * 360},90%,60%)`; s.style.animationDelay = Math.random() * 0.4 + 's'; s.style.transform = `rotate(${Math.random() * 360}deg)`; box.appendChild(s); } document.body.appendChild(box); setTimeout(() => box.remove(), 2200); }

/* ---- hints ---- */
function describeList(list, depth = 0) {
  return list.map(n => { const pad = '&nbsp;'.repeat(depth * 4); if (DIRV[n.t] || n.t === 'WAIT') return pad + BLK[n.t].i + ' ' + BLK[n.t].en;
    if (n.t === 'REPEAT') return pad + `🔁 REPEAT ${n.n}<br>` + describeList(n.body, depth + 1);
    if (n.t === 'EVENT') return pad + `⚡ EVENT ${EVC[n.ev]}<br>` + describeList(n.body, depth + 1);
    return pad + `IF ${tx(CONDS[n.c])}<br>` + describeList(n.body, depth + 1) + (n.else ? `<br>${pad}ELSE<br>` + describeList(n.else, depth + 1) : ''); }).join('<br>');
}
function firstHint(L) {
  const k = L.kind;
  if (k === 'seq' || k === 'custom') return T('റോബോയുടെ വഴി വിരൽ കൊണ്ട് തൊട്ട് എണ്ണി നോക്കൂ. ഓരോ കളത്തിനും ഒരു ദിശാ ബ്ലോക്ക്. തടസ്സങ്ങൾക്ക് ചുറ്റും പോകണം.', 'Trace Robo\'s path with your finger and count. One direction block for each square. Go around obstacles.');
  if (k === 'loop') return T('ഒരേ നീക്കങ്ങൾ വീണ്ടും വീണ്ടും വരുന്നുണ്ടോ? ആ ഭാഗം 🔁 REPEAT-ന്റെ ഉള്ളിൽ വെച്ച്, എത്ര തവണ എന്ന് + / − കൊണ്ട് മാറ്റൂ.', 'Do the same moves repeat? Put that part inside 🔁 REPEAT and set how many times with + / −.');
  if (k === 'event') return T('⚡ EVENT ബ്ലോക്ക് എടുക്കൂ. അതിന്റെ ഉള്ളിൽ ദിശാ ബ്ലോക്ക് വെക്കൂ. നിറത്തിൽ തൊട്ടാൽ നിറം മാറും. ▶️ അമർത്തിയ ശേഷം താഴെ വരുന്ന നിറ ബട്ടൺ അമർത്തൂ.', 'Take an ⚡ EVENT block and put a direction block inside it. Tap the colour to change it. Press ▶️, then press the coloured button that appears.');
  if (k === 'light') return T('IF 🟢 ലൈറ്റ് പച്ചയാണോ? → ദിശ. ELSE → ⏳ WAIT പിന്നെ ദിശ. ഇത് 🔁 REPEAT-ന്റെ ഉള്ളിൽ വെച്ചാൽ എല്ലാ കളത്തിലും പ്രവർത്തിക്കും.', 'IF 🟢 light is green → move. ELSE → ⏳ WAIT, then move. Put it inside 🔁 REPEAT so it works on every square.');
  if (k === 'stair') return T('"➡️ വലതുവശത്ത് തടസ്സമുണ്ടോ?" എന്ന IF ഉപയോഗിക്കൂ. ഉണ്ടെങ്കിൽ ⬆️, ഇല്ലെങ്കിൽ ➡️. ഇത് REPEAT-ന്റെ ഉള്ളിൽ വെക്കൂ.', 'Use the IF "➡️ blocked on the right?". If yes ⬆️, if no ➡️. Put it inside REPEAT.');
  if (k === 'debug') return T('▶️ അമർത്തി റോബോ എവിടെ നിൽക്കുന്നു / ഇടിക്കുന്നു എന്ന് നോക്കൂ. ചുവന്ന് തിളങ്ങുന്ന ബ്ലോക്കിന് അടുത്താണ് ബഗ്.', 'Press ▶️ and watch where Robo stops or bumps. The bug is near the block that glows red.');
  return T('ശ്രദ്ധിച്ച് നോക്കി, ചെറിയ കഷണങ്ങളായി പ്ലാൻ ചെയ്യൂ.', 'Look carefully and plan in small parts.');
}
async function giveHint() {
  if (G.running) return; const L = G.L; const hm = G.mid || G.ctx.hintMid; const m = hm && !G.ctx.practice ? mrec(hm) : null;
  G.hintLvl = Math.min(3, G.hintLvl + 1); if (m) { m.hints++; logHist({ type: 'hint', id: hm, level: G.hintLvl }); save(); }
  let html;
  if (G.hintLvl === 1) html = `<h3>💡 ${T('സൂചന', 'Hint')} 1</h3><p>${firstHint(L)}</p>`;
  else if (G.hintLvl === 2) {
    if (L.kind === 'debug' && G.bugId) { html = T('<h3>💡 സൂചന 2</h3><p>ബഗ് ഉള്ള ബ്ലോക്ക് ഇപ്പോൾ മഞ്ഞ നിറത്തിൽ മിന്നുന്നു! 👀</p>', '<h3>💡 Hint 2</h3><p>The block with the bug is flashing yellow now! 👀</p>'); setTimeout(() => { const el = document.querySelector(`#workspace [data-id="${G.bugId}"]`); if (el) { el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 4000); } }, 300); }
    else if (L.ref) { const first = L.ref.main[0] || (L.ref.events[0]); html = `<h3>💡 ${T('സൂചന', 'Hint')} 2</h3><p>${T('ഇങ്ങനെ തുടങ്ങാം:', 'You can start like this:')}</p><div class="sol">${describeList([first])}</div>`; }
    else html = `<h3>💡 ${T('സൂചന', 'Hint')} 2</h3><p>${firstHint(L)}</p>`;
  } else html = L.ref ? `<h3>💡 ${T('ഉത്തരം', 'Answer')}</h3><p>${T('ഒരു ശരിയായ പ്രോഗ്രാം ഇതാ. ഇത് നോക്കി സ്വന്തമായി ബ്ലോക്കുകൾ വെക്കൂ:', 'Here is one correct program. Look at it and build it yourself:')}</p><div class="sol">${describeList(L.ref.main.length ? L.ref.main : [])}${L.ref.events.length ? describeList(L.ref.events) : ''}</div>` : `<h3>💡</h3><p>${firstHint(L)}</p>`;
  await modal(html, [{ t: T('നന്ദി! 👍', 'Thanks! 👍'), v: 1 }]);
}

/* ================= GAME MAKER ================= */
const MAKER_TOOLS = [{ k: 'S', i: '🤖', t: ['റോബോ', 'Robo'] }, { k: 'G', i: '🎁', t: ['പെട്ടി', 'Chest'] }, { k: 'c', i: '🪙', t: ['നാണയം', 'Coin'] }, { k: '#', i: null, t: ['തടസ്സം', 'Wall'] }, { k: '.', i: '🧽', t: ['മായ്ക്കുക', 'Erase'] }];
function maker(opts) {
  const world = opts.world ?? 4; const wd = WORLDS[world]; const W = 6, H = 5;
  const M = opts.edit ? JSON.parse(JSON.stringify(opts.edit)) : { name: '', grid: emptyGrid(W, H), start: { x: 0, y: H - 1 }, goal: { x: W - 1, y: 0 }, light: false, world };
  if (!opts.edit) M.grid[0][W - 1] = 'G';
  let tool = 'c'; const req = opts.req || null;
  const back = opts.mission ? `day:${opts.mission.w}:${opts.mission.d}` : opts.creative ? 'map' : 'games';
  show('maker', topbar(back, T('🎨 ഗെയിം ഉണ്ടാക്കാം', '🎨 Game Maker')) + `<div class="maker" style="--bg:${wd.bg};--tile:${wd.tile};--edge:${wd.edge}">
   <div class="story"><span class="sr">🤖</span><span>${T('ഒരു ടൂൾ എടുത്ത് കളങ്ങളിൽ തൊട്ട് സ്വന്തം ലെവൽ ഉണ്ടാക്കൂ. പിന്നെ ▶️ കോഡ് ചെയ്ത് ജയിക്കൂ!', 'Pick a tool and tap squares to build your level. Then ▶️ code it and win!')}</span></div>
   ${req ? `<div class="reqs" id="reqs"></div>` : ''}
   <div class="tools">${MAKER_TOOLS.map(t => `<button class="tool" data-tool="${t.k}">${t.i || wd.ob}<small>${tx(t.t)}</small></button>`).join('')}<button class="tool" id="lightTool">🚦<small>${T('ലൈറ്റ്', 'Light')}</small></button></div>
   <div class="board-wrap"><div id="mboard" class="mboard"></div></div>
   <label class="namef">${T('ഗെയിമിന്റെ പേര്', 'Game name')}: <input id="gname" maxlength="30" placeholder="${T('എന്റെ ഗെയിം', 'My game')}" value="${esc(M.name)}"></label>
   <button class="btn big primary" id="testBtn">▶️ ${T('കളിച്ചുനോക്കാം (കോഡ് ചെയ്ത് ജയിക്കണം)', 'Play-test (code it and win)')}</button></div>`);
  const cs = Math.min(64, Math.floor(($('.board-wrap').clientWidth - 8) / W));
  const draw = () => {
    let h = ''; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const c = M.grid[y][x]; const isS = M.start.x === x && M.start.y === y;
      h += `<div class="cell ${(x + y) % 2 ? 'alt' : ''}" data-x="${x}" data-y="${y}" style="width:${cs}px;height:${cs}px">${isS ? '<span class="mk-robo">' + ROBO + '</span>' : c === '#' ? `<span class="ob">${wd.ob}</span>` : c === 'c' ? '🪙' : c === 'G' ? CHEST : ''}</div>`; }
    const b = $('#mboard'); b.style.gridTemplateColumns = `repeat(${W},${cs}px)`; b.style.setProperty('--cs', cs + 'px'); b.innerHTML = h;
    $$('.tool[data-tool]').forEach(t => t.classList.toggle('on', t.dataset.tool === tool)); $('#lightTool').classList.toggle('on', M.light);
    if (req) { const cnt = countCells(M); const items = [[T(`🪙 കുറഞ്ഞത് ${req.coins} നാണയം`, `🪙 at least ${req.coins} coins`), cnt.c >= req.coins], [T(`${wd.ob} കുറഞ്ഞത് ${req.walls} തടസ്സം`, `${wd.ob} at least ${req.walls} walls`), cnt.w >= req.walls]];
      if (req.light) items.push([T('🚦 ട്രാഫിക് ലൈറ്റ് ഓൺ', '🚦 traffic light on'), M.light]); if (req.repeat) items.push([T('🔁 REPEAT ഉപയോഗിച്ച് ജയിക്കണം', '🔁 win using REPEAT'), null]); items.push([T('▶️ സ്വന്തം കോഡ് കൊണ്ട് ജയിക്കണം', '▶️ win with your own code'), null]);
      if (req.coins || req.walls || req.light || req.repeat || true) $('#reqs').innerHTML = `<b>${T('ഈ ദൗത്യത്തിന്:', 'For this mission:')}</b> ` + items.map(([t, ok]) => `<span class="${ok === true ? 'ok' : ok === false ? 'no' : ''}">${ok === true ? '✅' : ok === false ? '⬜' : '🎯'} ${t}</span>`).join(''); }
  };
  draw();
  $$('.tool[data-tool]').forEach(t => t.onclick = () => { tool = t.dataset.tool; SFX.click(); draw(); });
  $('#lightTool').onclick = () => { M.light = !M.light; SFX.click(); draw(); };
  $('#mboard').onclick = e => {
    const c = e.target.closest('.cell'); if (!c) return; const x = +c.dataset.x, y = +c.dataset.y;
    const isS = M.start.x === x && M.start.y === y, isG = M.goal.x === x && M.goal.y === y;
    if (tool === 'S') { if (isG) return toast(T('അവിടെ പെട്ടിയുണ്ട്!', 'The chest is there!')); M.grid[y][x] = '.'; M.start = { x, y }; }
    else if (tool === 'G') { if (isS) return toast(T('അവിടെ റോബോ ഉണ്ട്!', 'Robo is there!')); M.grid[M.goal.y][M.goal.x] = '.'; M.grid[y][x] = 'G'; M.goal = { x, y }; }
    else { if (isS || isG) return toast(T('റോബോയെയും പെട്ടിയെയും മാറ്റാൻ അവയുടെ ടൂൾ എടുക്കൂ', 'Use the Robo or Chest tool to move them')); M.grid[y][x] = M.grid[y][x] === tool && tool !== '.' ? '.' : tool; }
    SFX.add(); draw();
  };
  $('#testBtn').onclick = () => {
    M.name = ($('#gname').value || '').trim() || `${T('എന്റെ ഗെയിം', 'My game')} ${S.games.length + 1}`;
    if (req) { const cnt = countCells(M); if (cnt.c < req.coins || cnt.w < req.walls || (req.light && !M.light)) return toast(T('🎯 ആദ്യം മുകളിലെ നിബന്ധനകൾ പൂർത്തിയാക്കൂ ⬜', '🎯 First complete the goals above ⬜'), 3500); }
    const L = levelFromMaker(M); if (req && req.repeat) { L.requireBlock = 'REPEAT'; }
    play(L, { title: '🎮 ' + M.name, back, draft: null, hintMid: opts.mission ? mid(opts.mission.w, opts.mission.d, opts.mission.i) : null, onWin: async (g) => {
      const game = { ...M, id: M.id || ('g' + Date.now()), updated: Date.now(), solution: { main: g.prog.main, events: g.prog.events }, usedRepeat: progHas(g.prog, 'REPEAT') };
      const i = S.games.findIndex(x => x.id === game.id); if (i >= 0) S.games[i] = game; else S.games.push(game);
      logHist({ type: 'game-saved', name: game.name });
      if (opts.creative) { const r = S.days[opts.creative] || (S.days[opts.creative] = {}); r.done = true; r.doneAt = Date.now(); }
      let txt = '';
      if (opts.mission) { const id = mid(opts.mission.w, opts.mission.d, opts.mission.i); const m = mrec(id); m.attempts = Math.max(m.attempts, g.fails + 1); const first = !m.solved; if (first) { m.solved = true; m.indep = m.hints === 0; m.solveAttempts = g.fails + 1; m.stars = 3; S.stars += 3; S.coins += 10; } logHist({ type: 'run', id, ok: true, make: true, attempts: m.attempts }); txt = T('<p>ദൗത്യം കഴിഞ്ഞു! +10 🪙 ⭐⭐⭐</p>', '<p>Mission complete! +10 🪙 ⭐⭐⭐</p>'); }
      save(); SFX.win(); confetti();
      await modal(`<div class="mrobo">${ROBO}</div><h2>🎉 "${esc(game.name)}" ${T('റെഡി!', 'is ready!')}</h2><p>${T('സ്വന്തമായി ഒരു ഗെയിം ഉണ്ടാക്കി, അത് കോഡ് ചെയ്ത് ജയിക്കുകയും ചെയ്തു! 👩‍💻', 'You made your own game and won it with code! 👩‍💻')}</p><p class="big-quote">${T('"ഞാൻ സ്വന്തമായി ഒരു ഗെയിം ഉണ്ടാക്കി!"', '"I made my own game!"')}</p>${txt}`, [{ t: T('ശരി ➡️', 'OK ➡️'), v: 1 }]);
      if (opts.final) return go(`day:${opts.mission.w}:${opts.mission.d}`);
      go(back);
    } });
  };
}
function countCells(M) { let c = 0, w = 0; M.grid.forEach(r => r.forEach(v => { if (v === 'c') c++; if (v === '#') w++; })); return { c, w }; }
function levelFromMaker(M) {
  const g = M.grid.map(r => r.slice()); g[M.start.y][M.start.x] = '.'; g[M.goal.y][M.goal.x] = 'G';
  return { W: g[0].length, H: g.length, grid: g, start: { ...M.start }, goal: { ...M.goal }, light: !!M.light, requireCoins: true, palette: PAL.all, kind: 'custom', world: M.world ?? 4, conds: M.light ? ['green', 'wallR', 'wallU', 'wallD', 'wallL'] : undefined, ref: M.solution ? cloneProg(M.solution) : null };
}
function gamesScreen() {
  let h = topbar('home', T('🎨 എന്റെ ഗെയിമുകൾ', '🎨 My Games')) + `<div class="games"><button class="btn big primary" id="newGame">➕ ${T('പുതിയ ഗെയിം ഉണ്ടാക്കാം', 'Make a new game')}</button>`;
  if (!S.games.length) h += `<p class="muted">${T('ഇതുവരെ ഗെയിമുകൾ ഇല്ല. ഒരെണ്ണം ഉണ്ടാക്കിയാലോ? 🎨', 'No games yet. Shall we make one? 🎨')}</p>`;
  h += S.games.map((g, i) => { const c = countCells(g); return `<div class="gcard"><div><b>${esc(g.name)}</b><small>🪙 ${c.c} · ${T('തടസ്സം', 'walls')} ${c.w}${g.light ? ' · 🚦' : ''} · ${new Date(g.updated).toLocaleDateString()}</small></div><div><button class="btn small primary" data-play="${i}">▶️</button><button class="btn small" data-edit="${i}">✏️</button><button class="btn small" data-del-game="${i}">🗑️</button></div></div>`; }).join('');
  show('games', h + '</div>');
  $('#newGame').onclick = () => maker({ world: 4 });
  $$('[data-play]').forEach(b => b.onclick = () => { const gm = S.games[+b.dataset.play]; const L = levelFromMaker(gm); logHist({ type: 'game-play', name: gm.name }); save(); play(L, { title: '🎮 ' + gm.name, back: 'games', onWin: async () => { await modal(T('<h2>🎉 ജയിച്ചു!</h2>', '<h2>🎉 You won!</h2>'), [{ t: T('ശരി', 'OK'), v: 1 }]); gamesScreen(); } }); });
  $$('[data-edit]').forEach(b => b.onclick = () => maker({ edit: S.games[+b.dataset.edit], world: S.games[+b.dataset.edit].world }));
  $$('[data-del-game]').forEach(b => b.onclick = async () => { if (await modal(T('<p>ഈ ഗെയിം കളയണോ?</p>', '<p>Delete this game?</p>'), [{ t: T('വേണ്ട', 'No'), v: false }, { t: T('കളയാം 🗑️', 'Delete 🗑️'), v: true, cls: 'danger' }])) { S.games.splice(+b.dataset.delGame, 1); save(); gamesScreen(); } });
}
async function graduation() {
  S.graduated = S.graduated || Date.now(); save(); confetti();
  showCertificate();
}
function showCertificate() {
  const skills = Object.keys(SKILLS).map(k => { const s = skillStatus(k); return `<li>${STATUS[s.st][2]} ${SKILLS[k][0]} – ${SKILLS[k][1]}</li>`; }).join('');
  show('cert', topbar('home', T('🎓 സർട്ടിഫിക്കറ്റ്', '🎓 Certificate')) + `<div class="cert" id="certBox"><div class="cert-in"><div class="cert-robo">${ROBO}</div><h1>🎓 ${T('ബിരുദ സർട്ടിഫിക്കറ്റ്', 'Certificate of Graduation')}</h1><p>Codeloo 🤖</p><h2>${esc(kidName())}</h2><p>${T('Codeloo-യിലെ 12 ആഴ്ചത്തെ കോഡിംഗ് യാത്ര വിജയകരമായി പൂർത്തിയാക്കി!', 'has completed the 12-week Codeloo coding journey!')}</p><p class="big-quote">${T('"ഞാൻ സ്വന്തമായി ഒരു ഗെയിം ഉണ്ടാക്കി!"', '"I made my own game!"')}</p><ul class="cert-sk">${skills}</ul><p>🎮 ${T('ഉണ്ടാക്കിയ ഗെയിമുകൾ', 'Games made')}: ${S.games.length} · ⭐ ${S.stars} · 🪙 ${S.coins}</p><p>${new Date(S.graduated || Date.now()).toLocaleDateString(T('ml-IN', 'en-GB'))}</p><p class="credit">${CREDIT}</p></div></div><div class="center"><button class="btn primary" onclick="window.print()">🖨️ ${T('പ്രിന്റ് ചെയ്യാം', 'Print')}</button></div>`);
}

/* ================= PARENT AREA ================= */
function pinHash(p) { return 'h' + hashStr('inaaya-salt:' + p).toString(36); }
async function parentGate() {
  stopRun(); UI.screen = 'pin';
  if (!S.pin) {
    const r = await modal(`<h3>👨‍👧 Parent Dashboard – PIN</h3><p>${T('കുട്ടിക്ക് അറിയാത്ത ഒരു 4 അക്ക PIN ഉണ്ടാക്കൂ.', 'Create a 4-digit PIN your child does not know.')}</p><input id="p1" type="password" inputmode="numeric" maxlength="4" class="pin" placeholder="PIN"><input id="p2" type="password" inputmode="numeric" maxlength="4" class="pin" placeholder="${T('PIN വീണ്ടും', 'Confirm PIN')}">`, [{ t: T('സേവ് ചെയ്യുക', 'Save'), v: 'ok' }, { t: T('വേണ്ട', 'Cancel'), v: 'x' }], { read: bg => ({ a: bg.querySelector('#p1').value, b: bg.querySelector('#p2').value }) });
    if (r.v !== 'ok') return home();
    if (!/^\d{4}$/.test(r.extra.a) || r.extra.a !== r.extra.b) { toast(T('PIN 4 അക്കം ആയിരിക്കണം, രണ്ടും ഒന്നായിരിക്കണം', 'PIN must be 4 digits and both must match')); return home(); }
    S.pin = pinHash(r.extra.a); save(); return dashboard('overview');
  }
  const r = await modal(`<h3>👨‍👧 Parent PIN</h3><input id="p1" type="password" inputmode="numeric" maxlength="4" class="pin" placeholder="PIN">`, [{ t: T('തുറക്കുക', 'Open'), v: 'ok' }, { t: T('വേണ്ട', 'Cancel'), v: 'x' }, { t: T('PIN മറന്നോ?', 'Forgot PIN?'), v: 'forgot', cls: 'ghost' }], { read: bg => bg.querySelector('#p1').value });
  if (r.v === 'forgot') {
    const a = 13 + Math.floor(Math.random() * 7), b = 6 + Math.floor(Math.random() * 4);
    const q = await modal(`<h3>PIN Reset</h3><p>Adults only: ${a} × ${b} = ?</p><input id="ans" inputmode="numeric" class="pin">`, [{ t: 'Reset PIN', v: 'ok' }, { t: 'Cancel', v: 'x' }], { read: bg => bg.querySelector('#ans').value });
    if (q.v === 'ok' && +q.extra === a * b) { S.pin = null; save(); toast(T('PIN മാറ്റി. പുതിയ PIN ഉണ്ടാക്കൂ. Progress സുരക്ഷിതമാണ്.', 'PIN removed. Create a new one. Progress is safe.')); return parentGate(); }
    return home();
  }
  if (r.v !== 'ok') return home();
  if (pinHash(r.extra) !== S.pin) { toast(T('❌ PIN തെറ്റാണ്', '❌ Wrong PIN')); return home(); }
  dashboard('overview');
}
function fmtMin(s) { const m = Math.round((s || 0) / 60); return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} min`; }
function stats() {
  const ms = Object.entries(S.missions).filter(([, m]) => m.attempts > 0 || m.solved);
  const solved = ms.filter(([, m]) => m.solved); const indep = solved.filter(([, m]) => m.indep);
  const days = Object.keys(S.time).filter(k => S.time[k] >= 60).sort();
  const total = Object.values(S.time).reduce((a, b) => a + b, 0);
  const lessons = LESSONS.filter(x => dayDone(x.w, x.d)).length;
  const hints = ms.reduce((a, [, m]) => a + (m.hints || 0), 0);
  return { ms, solved, indep, days, total, lessons, hints, rate: solved.length ? Math.round(indep.length * 100 / solved.length) : 0 };
}
function missionName(id) { const m = id.match(/w(\d+)d(\d+)m(\d+)/); if (!m) return id; const W = WEEKS[m[1] - 1]; return `W${m[1]} D${m[2]} M${+m[3] + 1} · ${W.days[m[2] - 1].t}`; }
function recommendations() {
  const out = []; const n = nextLesson(); const W = WEEKS[n.w - 1];
  if (firstOpenIdx() < 60) out.push(`▶️ Next lesson: Week ${n.w} Day ${n.d} – ${W.days[n.d - 1].t} (${W.en})`);
  Object.keys(SKILLS).forEach(k => { const s = skillStatus(k); if (s.st === 'practice') { const wk = WEEKS.find(x => x.skill === k) || WEEKS[7]; out.push(`🔁 Practise ${SKILLS[k][0]} (${SKILLS[k][1]}): replay Week ${wk.w} Days 1–4, then retry the Day 5 assessment missions.`); } if (s.st === 'help') out.push(`🤝 ${SKILLS[k][0]}: solved with help — ask her to replay one mission and explain each block aloud before pressing Run.`); });
  const t = S.time[todayKey()] || 0; if (t < 1800) out.push(`⏱️ Today: ${fmtMin(t)} of the 30-minute goal.`);
  return out;
}
function weekProgress() { return WEEKS.map(W => { const dn = [1, 2, 3, 4, 5].filter(d => dayDone(W.w, d)).length; return { W, dn }; }); }
function dashboard(tab) {
  UI.screen = 'parent'; const st = stats();
  const tabs = [['overview', '📊 Overview'], ['skills', '🧠 Skills'], ['missions', '🎯 Missions'], ['history', '📜 History'], ['settings', '⚙️ Settings']];
  let h = `<header class="top parent-top"><button class="ib" data-go="home">⬅️</button><div class="ttl">👨‍👧 Parent Dashboard – രക്ഷിതാവ്</div><button class="btn small" id="printBtn">🖨️ Report</button></header><nav class="tabs">${tabs.map(([k, t]) => `<button class="${k === tab ? 'on' : ''}" data-go="dash:${k}">${t}</button>`).join('')}</nav><div class="dash">`;
  if (tab === 'overview') {
    const last14 = [...Array(14)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 13 + i); const k = todayKey(d); return { k, s: S.time[k] || 0 }; });
    h += `<div class="kpis">${[['Learning days', st.days.length], ['Total time', fmtMin(st.total)], ['Today', fmtMin(S.time[todayKey()])], ['Lessons done', st.lessons + '/60'], ['Missions solved', st.solved.length], ['Independent rate', st.rate + '%'], ['Hints used', st.hints], ['Games created', S.games.length]].map(([a, b]) => `<div class="kpi"><b>${b}</b><span>${a}</span></div>`).join('')}</div>
    <h3>Daily learning time (last 14 days, goal 30 min)</h3><div class="bars">${last14.map(x => `<div class="bcol" title="${x.k}: ${fmtMin(x.s)}"><i style="height:${Math.min(100, x.s / 18)}%" class="${x.s >= 1800 ? 'goal' : ''}"></i><small>${x.k.slice(8)}</small></div>`).join('')}</div>
    <h3>Weekly progress</h3><table class="tbl"><tr><th>Week</th><th>Topic</th><th>Days done</th></tr>${weekProgress().map(({ W, dn }) => `<tr><td>${W.w}</td><td>${W.en}<br><small>${W.title}</small></td><td><span class="mbar"><i style="width:${dn * 20}%"></i></span> ${dn}/5</td></tr>`).join('')}</table>
    <h3>Recommended next</h3><ul class="recs">${recommendations().map(r => `<li>${r}</li>`).join('')}</ul>`;
  } else if (tab === 'skills') {
    h += `<p class="muted">Mastery uses <b>assessment challenges only</b> (Day 5 of each week, and Week 8–12 assessments for independent problem-solving) — not simple level completion. Independent = ≥2 of the last 3 assessment challenges solved with no hints in ≤3 runs.</p><div class="skills">`;
    Object.keys(SKILLS).forEach(k => { const s = skillStatus(k); h += `<div class="skill st-${s.st}"><b>${STATUS[s.st][2]} ${SKILLS[k][0]}</b><span>${SKILLS[k][1]}</span><em>${STATUS[s.st][0]} – ${STATUS[s.st][1]}</em><small>${s.n ? `Assessment challenges: ${s.n} · last ${s.last}: ${s.ind} independent, ${s.sol} solved` : 'No assessment yet'}</small></div>`; });
    h += `</div><h3>Skills requiring practice</h3><ul class="recs">${Object.keys(SKILLS).filter(k => skillStatus(k).st === 'practice').map(k => `<li>${SKILLS[k][0]} – ${SKILLS[k][1]}</li>`).join('') || '<li>None right now 🎉</li>'}</ul>
    <h3>Adaptive difficulty (0 easy – 3 hard)</h3><p>${Object.entries(S.adapt).map(([k, a]) => `${SKILLS[k] ? SKILLS[k][0] : k}: <b>${a.d}</b>`).join(' · ') || 'Default (1) for all skills'}</p>`;
  } else if (tab === 'missions') {
    h += `<table class="tbl"><tr><th>Mission</th><th>Runs</th><th>Hints</th><th>Result</th><th>Time</th></tr>${st.ms.sort((a, b) => (a[1].first || 0) - (b[1].first || 0)).map(([id, m]) => `<tr><td>${missionName(id)}${m.assess ? ' 🏅' : ''}</td><td>${m.attempts}</td><td>${m.hints}</td><td>${m.solved ? (m.indep ? '🟢 Independent' : '🟡 With help') + ' ' + '⭐'.repeat(m.stars || 0) : '🔴 Not yet'}</td><td>${fmtMin(m.sec)}</td></tr>`).join('') || '<tr><td colspan=5>No missions yet</td></tr>'}</table>`;
  } else if (tab === 'history') {
    const byDay = {}; S.history.forEach(e => { (byDay[e.date] = byDay[e.date] || []).push(e); });
    h += Object.keys(byDay).sort().reverse().slice(0, 60).map(d => { const ev = byDay[d]; const runs = ev.filter(e => e.type === 'run'); return `<details><summary><b>${d}</b> · ${fmtMin(S.time[d])} · runs ${runs.length} · solved ${runs.filter(r => r.ok && r.first).length} · hints ${ev.filter(e => e.type === 'hint').length}</summary><ul>${ev.map(e => `<li>${new Date(e.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${histText(e)}</li>`).join('')}</ul></details>`; }).join('') || '<p>No history yet.</p>';
  } else if (tab === 'settings') {
    h += `<div class="set"><label>Child name / കുട്ടിയുടെ പേര്: <input id="cname" value="${esc(S.childName)}"></label><button class="btn small" id="saveName">Save</button></div>
    <div class="set"><b>💾 Local storage notice:</b> Progress is saved automatically in this browser on this device only (localStorage). It does <b>not</b> sync to other devices. Clearing browser data deletes it — export a backup regularly.</div>
    <div class="set"><button class="btn" id="expBtn">⬇️ Export progress (JSON)</button><label class="btn">⬆️ Import JSON<input type="file" id="impFile" accept="application/json,.json" hidden></label></div>
    <div class="set"><label><input type="checkbox" id="unlockAll" ${S.unlockAll ? 'checked' : ''}> Unlock all days (parent/testing mode)</label></div>
    <div class="set"><button class="btn" id="chgPin">🔑 Change PIN</button> ${S.graduated ? '<button class="btn" id="certBtn">🎓 Certificate</button>' : ''}</div>
    <div class="set danger-zone"><button class="btn danger" id="resetBtn2">🗑️ Reset all progress</button></div>
    <p class="muted">${CREDIT}</p><p class="muted">Privacy: no ads, no accounts, no tracking, no AI services, no network calls. Everything stays on this device.</p>`;
  }
  h += `</div><div id="report" class="report"></div>`;
  show('parent', h);
  $('#printBtn').onclick = printReport;
  if (tab === 'settings') {
    $('#saveName').onclick = () => { S.childName = $('#cname').value.trim(); save(); toast('Saved'); };
    $('#expBtn').onclick = exportJSON; $('#impFile').onchange = importJSON;
    $('#unlockAll').onchange = e => { S.unlockAll = e.target.checked; save(); };
    $('#chgPin').onclick = () => { S.pin = null; save(); parentGate(); };
    if ($('#certBtn')) $('#certBtn').onclick = showCertificate;
    $('#resetBtn2').onclick = resetAll;
  }
}
function histText(e) {
  if (e.type === 'run') return `${e.ok ? '✅' : '❌'} ${missionName(e.id)}${e.ok ? ` (${e.stars || ''}⭐${e.first ? ', first solve' : ''})` : ` – ${e.reason}`}${e.practice ? ' [practice]' : ''}`;
  if (e.type === 'hint') return `💡 Hint ${e.level} – ${missionName(e.id)}`;
  if (e.type === 'day-complete') return `🏁 Completed ${e.id.replace('w', 'Week ').replace('d', ' Day ')} (quiz tries: ${e.quizTries})`;
  if (e.type === 'day-open') return `📖 Opened ${e.id.replace('w', 'Week ').replace('d', ' Day ')}`;
  if (e.type === 'practice-start') return `🌱 Simpler practice offered – ${missionName(e.id)}`;
  if (e.type === 'practice-win') return `🌱 Practice solved – ${missionName(e.id)}`;
  if (e.type === 'game-saved') return `🎨 Created game "${esc(e.name)}"`;
  if (e.type === 'game-play') return `🎮 Played own game "${esc(e.name)}"`;
  return e.type;
}
function exportJSON() {
  const data = JSON.stringify({ app: 'inaaya-codequest', exported: new Date().toISOString(), state: S }, null, 1);
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' })); a.download = `codeloo-progress-${todayKey()}.json`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  toast('⬇️ Exported');
}
async function importJSON(e) {
  const f = e.target.files[0]; if (!f) return; let obj;
  try { obj = JSON.parse(await f.text()); } catch (er) { return toast('❌ Invalid JSON file'); }
  const st = obj && obj.app === 'inaaya-codequest' ? obj.state : obj;
  if (!st || st.v !== 1 || typeof st.missions !== 'object' || typeof st.days !== 'object') return toast('❌ Not an INAAYA Code Quest progress file');
  if (!await modal('<p>Replace current progress on this device with the imported file?</p>', [{ t: 'Import', v: true }, { t: 'Cancel', v: false }])) return;
  S = Object.assign(defState(), st); save(); toast('✅ Imported'); dashboard('overview');
}
async function resetAll() {
  const r = await modal('<h3>⚠️ Reset all progress?</h3><p>This deletes all progress, games and history on this device. Type <b>RESET</b> and your PIN to confirm. (Export a backup first!)</p><input id="rs" placeholder="RESET"><input id="rp" type="password" inputmode="numeric" maxlength="4" class="pin" placeholder="PIN">', [{ t: 'Cancel', v: false }, { t: 'Delete everything', v: true, cls: 'danger' }], { read: bg => ({ a: bg.querySelector('#rs').value, p: bg.querySelector('#rp').value }) });
  if (!r.v) return; if (r.extra.a !== 'RESET' || pinHash(r.extra.p) !== S.pin) return toast('❌ Not confirmed – nothing deleted');
  const pin = S.pin; S = defState(); S.pin = pin; save(); toast('Progress reset'); dashboard('overview');
}
function printReport() {
  const st = stats();
  $('#report').innerHTML = `<h1>Codeloo · Progress Report</h1><p>Child: <b>${esc(S.childName || '-')}</b> · Printed ${new Date().toLocaleString()}</p>
  <p>Learning days: <b>${st.days.length}</b> · Total time: <b>${fmtMin(st.total)}</b> · Lessons: <b>${st.lessons}/60</b> · Missions solved: <b>${st.solved.length}</b> · Independent rate: <b>${st.rate}%</b> · Hints: <b>${st.hints}</b> · Games created: <b>${S.games.length}</b></p>
  <h2>Skill mastery (assessment-based)</h2><table class="tbl">${Object.keys(SKILLS).map(k => { const s = skillStatus(k); return `<tr><td>${SKILLS[k][0]} – ${SKILLS[k][1]}</td><td>${STATUS[s.st][0]} – ${STATUS[s.st][1]}</td></tr>`; }).join('')}</table>
  <h2>Weekly progress</h2><table class="tbl">${weekProgress().map(({ W, dn }) => `<tr><td>Week ${W.w}: ${W.en}</td><td>${dn}/5 days</td></tr>`).join('')}</table>
  <h2>Recommended next</h2><ul>${recommendations().map(r => `<li>${r}</li>`).join('')}</ul>
  <h2>Missions</h2><table class="tbl"><tr><th>Mission</th><th>Runs</th><th>Hints</th><th>Result</th></tr>${st.ms.map(([id, m]) => `<tr><td>${missionName(id)}</td><td>${m.attempts}</td><td>${m.hints}</td><td>${m.solved ? (m.indep ? 'Independent' : 'With help') : 'Needs practice'}</td></tr>`).join('')}</table>`;
  setTimeout(() => window.print(), 100);
}

/* ================= BOOT ================= */
document.addEventListener('pointerdown', function once() { actx(); musicLoop(); document.removeEventListener('pointerdown', once); }, { once: true });
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) { try { navigator.serviceWorker.register('sw.js').catch(() => { }); } catch (e) { } }
async function firstRun() {
  show('home', `<div class="home"><h1 class="logo">Codeloo<br><span>🤖</span></h1><div class="hero">${ROBO}<div class="bubble">ഭാഷ തിരഞ്ഞെടുക്കൂ<br>Choose your language</div></div></div>`);
  const lang = await modal('<h2>🌐</h2><p>ഭാഷ തിരഞ്ഞെടുക്കൂ<br>Choose your language</p>', [{ t: '🇮🇳 മലയാളം', v: 'ml' }, { t: '🇬🇧 English', v: 'en' }]);
  S.lang = lang; document.documentElement.lang = lang;
  const r = await modal(`<h3>${T('നിങ്ങളുടെ പേര് എന്താണ്? 😊', 'What is your name? 😊')}</h3><input id="kn" maxlength="20" value="${esc(S.childName || '')}" placeholder="${T('പേര്', 'Name')}">`, [{ t: T('തുടങ്ങാം ▶️', "Let's start ▶️"), v: 1 }], { read: bg => bg.querySelector('#kn').value });
  S.childName = (r.extra || '').trim(); save(); home();
}
window.__CQ = { WEEKS, genLevel, simulate, RNG, hashStr, mk, stairLayout, levelFor, skillStatus, get S() { return S; }, preCheck, cloneProg, progCount, get G() { return G; } };
if (!S.lang) firstRun(); else { document.documentElement.lang = S.lang; home(); }
