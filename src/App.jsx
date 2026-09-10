import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────  PROGRAM DATA (from the PDF)  ───────────────────────── */

const EX = {
  pullups: {
    name: "Pull-ups",
    bench: 8,
    cues: [
      "Hands slightly over shoulder width",
      "Keep scapula slightly retracted through the rep",
      "Back to dead hang each rep, then reactivate scapula",
      "Core engaged — no swinging",
      "Chin clears bar, neutral head; chest as close to bar as possible",
      "Control the negative",
    ],
    prog: [
      "PU negative",
      "Jumping PU with negative",
      "Band assisted PU",
      "Normal PU",
      "Chest to bar PU",
      "Weighted PU",
    ],
  },
  chinups: {
    name: "Chin-ups",
    bench: 8,
    cues: [
      "Hands slightly over shoulder width",
      "Keep scapula slightly retracted through the rep",
      "Back to dead hang each rep, then reactivate scapula",
      "Core engaged — no swinging",
      "Chin clears bar, neutral head; chest as close to bar as possible",
      "Control the negative",
    ],
    prog: [
      "CU negative",
      "Jumping CU with negative",
      "Band assisted CU",
      "Normal CU",
      "Chest to bar CU",
      "Weighted CU",
    ],
  },
  invPullRow: {
    name: "Inverted pull-up rows",
    bench: 10,
    cues: [
      "Hands slightly over shoulder width",
      "Protract scapula before the rep, retract at the top",
      "Core engaged — whole body in one line",
      "Do not flare elbows",
      "Chest as close to the bar as possible",
      "Two chairs or a stable table works",
    ],
    prog: [
      "Bent knee PU row (high bar)",
      "Bent knee PU row (low bar)",
      "Normal PU row (high bar)",
      "Normal PU row (low bar)",
      "PU row, elevated feet",
      "Tucked front lever PU",
      "Advanced tucked FL PU",
      "Straddle / one leg FL PU",
      "Front lever PU",
    ],
  },
  invChinRow: {
    name: "Inverted chin-up rows",
    bench: 10,
    cues: [
      "Hands slightly over shoulder width",
      "Protract scapula before the rep, retract at the top",
      "Core engaged — whole body in one line",
      "Do not flare elbows",
      "Chest as close to the bar as possible",
    ],
    prog: [
      "Bent knee CU row (high bar)",
      "Bent knee CU row (low bar)",
      "Normal CU row (high bar)",
      "Normal CU row (low bar)",
      "CU row, elevated feet",
      "Tucked front lever CU",
      "Advanced tucked FL CU",
      "Straddle / one leg FL CU",
      "Front lever CU",
    ],
  },
  pullNeg: {
    name: "Pull-up negatives",
    hold: true,
    cues: [
      "Jump to the top of the pull-up",
      "Hands slightly over shoulder width",
      "Maintain scapula retraction through the whole negative",
      "Core engaged to minimise swinging",
      "Progress by adding hold time, not reps",
    ],
    prog: [
      "Band assisted PU negative",
      "Faster negative",
      "Slower negative",
      "Isometric hold, mid position",
      "Isometric hold, top position",
      "Weighted isometric hold",
    ],
  },
  chinNeg: {
    name: "Chin-up negatives",
    hold: true,
    cues: [
      "Jump to the top of the chin-up",
      "Maintain scapula retraction through the whole negative",
      "Don't lock out fully at the top — keeps bicep tension",
      "Progress by adding hold time, not reps",
    ],
    prog: [
      "Band assisted CU negative",
      "Faster negative",
      "Slower negative",
      "Isometric hold, mid position",
      "Isometric hold, top position",
      "Weighted isometric hold",
    ],
  },
  negAlt: {
    name: "Chin-up / pull-up negatives, alternating",
    repOut: true,
    cues: ["Alternate each rep", "Max 10 second break between reps", "Go to failure"],
    prog: [],
  },

  dips: {
    name: "Dips",
    bench: 8,
    cues: [
      "Core engaged to prevent swinging",
      "Tall bars: legs straight, in line with body. Short bars: legs bent behind you",
      "Don't cross legs — leads to imbalances over time",
      "Slight lean on the way down",
      "Elbows to 90° or slightly past if mobility allows",
      "Elbows tucked, never flared",
    ],
    prog: [
      "Bent knee bench dip",
      "Straight leg bench dip",
      "Dip negative",
      "Leg / band assisted dip",
      "Normal dip",
      "Weighted dip",
    ],
  },
  cgDecline: {
    name: "Close grip decline push-ups",
    bench: 10,
    cues: [
      "Imagine squeezing both hands together on the way up",
      "Core activated with posterior pelvic tilt",
      "Lower back straight, in line with upper back",
      "Hands in line with shoulders",
      "Do not flare elbows",
      "Elbows a little under 90° at the bottom",
    ],
    prog: [
      "Close grip on knees, decreased decline",
      "Close grip on knees, increased decline",
      "Close grip, decreased decline",
      "Close grip, increased decline",
      "Diamond, decreased decline",
      "Diamond, increased decline",
    ],
    note: "Narrower grip and squeezing harder also increase difficulty.",
  },
  widePush: {
    name: "Wide push-ups",
    bench: 12,
    cues: [
      "Core activated",
      "Posterior pelvic tilt for more range of motion",
      "Lower back straight, in line with upper back",
      "Hands in line with shoulders — not forward or back",
      "Do not flare elbows",
      "Chest should almost touch the floor",
    ],
    prog: [
      "Standard push-up on knees",
      "Wide push-up on knees",
      "Standard push-up",
      "Wide push-up",
      "Archer push-up",
    ],
    note: "The wider your hands beyond shoulder width, the harder it gets.",
  },
  cgIncline: {
    name: "Close grip incline push-ups",
    bench: 14,
    cues: [
      "Imagine squeezing both hands together on the way up",
      "Core activated with posterior pelvic tilt",
      "Lower back straight, in line with upper back",
      "Hands in line with mid chest",
      "Do not flare elbows",
      "Chest should almost touch the surface",
    ],
    prog: [
      "Close grip on knees, increased incline",
      "Close grip on knees, decreased incline",
      "Close grip, increased incline",
      "Close grip, decreased incline",
      "Diamond, increased incline",
      "Diamond, decreased incline",
    ],
  },
  repOutDips: { name: "Rep out dips", repOut: true, cues: ["Max 10 second break between reps", "Go to failure"], prog: [] },
  repOutPush: { name: "Rep out push-ups", repOut: true, cues: ["Max 10 second break between reps", "Go to failure"], prog: [] },

  shrimp: {
    name: "Hand assisted shrimp squats",
    bench: 10,
    perLeg: true,
    cues: [
      "Hold opposite leg, pull back till almost in line with upper body",
      "Other hand for assistance and balance",
      "Knee should touch the floor at the bottom",
      "Core engaged throughout",
    ],
    prog: [
      "Hand assisted shrimp squat with chair (no leg hold)",
      "Hand assisted shrimp squat with chair (leg hold)",
      "Hand assisted shrimp squat (no leg hold)",
      "Hand assisted shrimp squat (leg hold)",
      "Shrimp squat (no leg hold)",
      "Shrimp squat (leg hold)",
    ],
    note: "More hand assistance makes it easier; pulling the leg back harder makes it harder.",
  },
  nordic: {
    name: "Hand assisted nordic curls",
    bench: 12,
    cues: [
      "Go down as far as possible before catching yourself",
      "Do most of the concentric with hamstrings, not the push-up",
      "Engage core, avoid pelvic tilt if strong enough",
      "Wedge legs under something heavy like a couch",
    ],
    prog: [
      "Nordic curl negative with elevation",
      "Nordic curl negative",
      "Hand assisted nordic curl with elevation",
      "Hand assisted nordic curl",
      "Banded nordic curl with elevation",
      "Banded nordic curl",
      "Nordic curl with elevation",
      "Nordic curl",
    ],
    note: "Pushing up higher with hands, or an elevated surface in front, reduces difficulty.",
  },
  pistol: {
    name: "Hand assisted pistol squats",
    bench: 10,
    perLeg: true,
    cues: [
      "Keep opposite leg outstretched throughout",
      "Hand on the extended-leg side for balance, opposite side for assistance",
      "Extended leg parallel to the floor at the bottom",
      "Lacking hamstring flexibility? Do them elevated",
    ],
    prog: [
      "Elevated pistol squat with hand assistance and chair support",
      "Pistol squat with hand assistance and chair support",
      "Pistol squat with hand assistance",
      "Elevated pistol squat",
      "Pistol squat",
      "Weighted pistol squat",
    ],
  },
  calf: {
    name: "Elevated single leg calf raises",
    bench: 20,
    perLeg: true,
    cues: [
      "Use a wall for balance",
      "Pause one second at the top",
      "Pause two seconds at the bottom, feel the stretch",
      "No momentum — slow and controlled",
    ],
    prog: [
      "Calf raises (both legs)",
      "Elevated calf raises",
      "Single leg calf raises",
      "Elevated single leg calf raises",
      "Weighted single leg calf raises",
      "Weighted elevated single leg calf raises",
    ],
  },
  repOutNordic: { name: "Rep out hand assisted nordic curls", repOut: true, cues: ["Max 10 second break between reps", "Go to failure"], prog: [] },
  repOutPistol: { name: "Rep out hand assisted pistol squats", repOut: true, perLeg: true, cues: ["Max 10 second break between reps", "Go to failure"], prog: [] },
};

const WORKOUTS = {
  pull: {
    label: "Pull",
    accent: "#79b4ae",
    bench: ["pullups", "chinups", "invPullRow", "invChinRow"],
    sets: [
      { items: [{ ex: "pullups", off: -2 }, { ex: "chinups", off: -2 }, { ex: "invPullRow", off: -2 }, { ex: "invChinRow", off: -2 }] },
      { items: [{ ex: "pullups", off: -4 }, { ex: "chinups", off: -4 }, { ex: "invPullRow", off: -4 }, { ex: "invChinRow", off: -4 }] },
      { items: [{ ex: "pullups", off: -6 }, { ex: "chinups", off: -6 }, { ex: "invPullRow", off: -6 }, { ex: "invChinRow", off: -6 }] },
      { items: [{ ex: "pullNeg", fixed: 4 }, { ex: "chinNeg", fixed: 4 }, { ex: "invPullRow", off: -6 }, { ex: "invChinRow", off: -6 }] },
      { items: [{ ex: "negAlt" }] },
    ],
  },
  push: {
    label: "Push",
    accent: "#d6b45f",
    bench: ["dips", "cgDecline", "widePush", "cgIncline"],
    sets: [
      { items: [{ ex: "dips", off: -1 }, { ex: "cgDecline", off: -1 }, { ex: "widePush", off: -1 }, { ex: "cgIncline", off: -2 }] },
      { items: [{ ex: "dips", off: -2 }, { ex: "cgDecline", off: -2 }, { ex: "widePush", off: -2 }, { ex: "cgIncline", off: -3 }] },
      { items: [{ ex: "dips", off: -3 }, { ex: "cgDecline", off: -3 }, { ex: "widePush", off: -3 }, { ex: "cgIncline", off: -4 }] },
      { items: [{ ex: "dips", off: -4 }, { ex: "cgDecline", off: -4 }, { ex: "widePush", off: -4 }, { ex: "cgIncline", off: -5 }] },
      { items: [{ ex: "repOutDips" }] },
      { items: [{ ex: "repOutPush" }] },
    ],
  },
  legs: {
    label: "Legs",
    accent: "#a49ed6",
    bench: ["shrimp", "nordic", "pistol", "calf"],
    sets: [
      { items: [{ ex: "shrimp", off: -2 }, { ex: "nordic", off: -2 }, { ex: "pistol", off: -2 }, { ex: "calf", off: -2 }] },
      { items: [{ ex: "shrimp", off: -3 }, { ex: "nordic", off: -3 }, { ex: "pistol", off: -4 }, { ex: "calf", off: -3 }] },
      { items: [{ ex: "shrimp", off: -5 }, { ex: "nordic", off: -4 }, { ex: "pistol", off: -5 }, { ex: "calf", off: -4 }] },
      { items: [{ ex: "shrimp", off: -5 }, { ex: "nordic", off: -5 }, { ex: "pistol", off: -5 }, { ex: "calf", off: -5 }] },
      { items: [{ ex: "repOutNordic" }] },
      { items: [{ ex: "repOutPistol" }] },
    ],
  },
};

const ORDER = ["pull", "push", "legs"];

/* Where each basic eventually leads — the pathway pages of the program */
const PATHWAYS = {
  pull: {
    root: "Pull-ups · Inverted rows",
    branches: [
      {
        name: "Straight arm strength",
        steps: [
          "Inverted pull-up row, elevated feet",
          "Tuck front lever hold / pull-up",
          "Advanced tuck front lever hold / pull-up",
          "Straddle or one leg front lever hold / pull-up",
          "Full front lever hold / pull-up",
        ],
      },
      {
        name: "Bent arm strength",
        steps: ["Weighted pull-ups", "Explosive pull-ups", "Muscle-ups"],
      },
      {
        name: "One arm work",
        steps: [
          "Archer pull-ups",
          "Assisted one arm pull-ups (band or fingers)",
          "One arm pull-ups",
        ],
      },
    ],
  },
  push: {
    root: "Push-ups · Dips · Decline push-ups",
    branches: [
      {
        name: "Handstand line",
        steps: [
          "Pike push-ups",
          "Elevated pike push-ups",
          "Wall handstand push-up",
          "Handstand push-up",
          "90° handstand push-up",
        ],
      },
      {
        name: "Planche line",
        steps: [
          "Planche lean / push-up",
          "Elevated planche lean / push-up",
          "Tuck planche / push-up",
          "Advanced tuck planche / push-up",
          "One leg or straddle planche / push-up",
          "Full planche / push-up",
          "Maltese",
        ],
      },
    ],
  },
  legs: {
    root: "Squat",
    branches: [
      {
        name: "Single leg line",
        steps: [
          "Split squat",
          "Pistol squat",
          "Shrimp squat",
          "Assisted dragon squat",
          "Dragon squat",
        ],
      },
    ],
  },
};

/* ─────────────────────────  STORAGE  ───────────────────────── */

const K_CFG = "lw:config:v1";
const K_HIST = "lw:history:v1";

const DEFAULT_CFG = () => {
  const benchmarks = {};
  ORDER.forEach((w) => {
    benchmarks[w] = {};
    WORKOUTS[w].bench.forEach((id) => (benchmarks[w][id] = EX[id].bench));
  });
  return { benchmarks, swaps: {}, overrides: {}, deload: false, restEx: 90, restSet: 180 };
};

function loadKey(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function saveKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or full storage — the session still works, it just won't persist */
  }
}

function downloadBackup(cfg, history) {
  const blob = new Blob([JSON.stringify({ v: 1, cfg, history }, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `calisthenics-backup-${todayStr()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ─────────────────────────  HELPERS  ───────────────────────── */

const clamp = (n) => Math.max(1, n);

function targetFor(cfg, workout, item) {
  const ov = cfg.overrides?.[`${workout}:${item.key}`];
  let t;
  if (ov != null) t = ov;
  else if (item.fixed != null) t = item.fixed;
  else if (item.off != null) t = clamp((cfg.benchmarks[workout][item.ex] ?? EX[item.ex].bench) + item.off);
  else return null; // rep-out
  if (cfg.deload && item.fixed == null) t = Math.max(1, Math.round(t / 2));
  return t;
}

function buildPlan(cfg, workout) {
  return WORKOUTS[workout].sets.map((s, si) => ({
    n: si + 1,
    items: s.items.map((it, ii) => {
      const item = { ...it, key: `${si}-${ii}` };
      const meta = EX[item.ex];
      return {
        ...item,
        idx: ii,
        setIdx: si,
        name: cfg.swaps[item.ex] || meta.name,
        base: meta.name,
        swapped: !!cfg.swaps[item.ex] && cfg.swaps[item.ex] !== meta.name,
        target: targetFor(cfg, workout, item),
        hold: !!meta.hold,
        repOut: !!meta.repOut,
        perLeg: !!meta.perLeg,
      };
    }),
  }));
}

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const todayStr = () => new Date().toISOString().slice(0, 10);

/* ─────────────────────────  STYLES  ───────────────────────── */

const CSS = `
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.lw{
  --bg:#101317; --panel:#191d23; --panel2:#20252c; --line:#2c333c;
  --ink:#f0f3f4; --mute:#8d959e; --ok:#6fd08c; --warn:#e0705f;
  background:var(--bg); color:var(--ink); min-height:100vh;
  font-family:'IBM Plex Sans',system-ui,-apple-system,sans-serif;
  padding-bottom:120px;
}
.lw h1,.lw h2,.lw .disp{font-family:'Oswald','IBM Plex Sans',sans-serif;font-weight:600;letter-spacing:.02em}
.wrap{max-width:560px;margin:0 auto;padding:0 14px}
.top{position:sticky;top:0;z-index:20;background:linear-gradient(180deg,var(--bg) 78%,transparent);padding:14px 0 10px}
.brand{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px}
.brand h1{font-size:20px;margin:0;text-transform:uppercase;letter-spacing:.08em}
.brand span{color:var(--mute);font-size:12px}
.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.tab{padding:11px 4px;border:1px solid var(--line);background:var(--panel);color:var(--mute);
  border-radius:9px;font-family:'Oswald',sans-serif;font-size:15px;text-transform:uppercase;
  letter-spacing:.06em;cursor:pointer;transition:background .15s,color .15s}
.tab[data-on="1"]{color:#101317;font-weight:600}
.setrow{display:flex;align-items:center;gap:10px;margin:22px 0 8px}
.setrow .disp{font-size:15px;text-transform:uppercase;letter-spacing:.09em}
.setrow .rule{flex:1;height:1px;background:var(--line)}
.setrow .cnt{color:var(--mute);font-size:12px;font-variant-numeric:tabular-nums}
.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.card+.card{margin-top:8px}
.card[data-done="1"]{opacity:.55}
.ex{display:flex;align-items:center;gap:10px;padding:12px 12px}
.tick{width:30px;height:30px;flex:none;border-radius:50%;border:2px solid var(--line);
  background:transparent;cursor:pointer;display:grid;place-items:center;color:transparent;font-size:15px}
.tick[data-on="1"]{border-color:var(--ok);color:#101317;background:var(--ok)}
.exmain{flex:1;min-width:0;cursor:pointer}
.exname{font-size:14.5px;line-height:1.25}
.exsub{color:var(--mute);font-size:11.5px;margin-top:3px;display:flex;gap:7px;flex-wrap:wrap;align-items:center}
.pill{border:1px solid var(--line);border-radius:99px;padding:1px 7px;font-size:10.5px}
.stepper{display:flex;align-items:center;gap:2px;flex:none}
.stepper button{width:34px;height:38px;border:none;background:var(--panel2);color:var(--ink);
  font-size:19px;cursor:pointer;border-radius:8px;line-height:1}
.stepper input{width:52px;height:38px;text-align:center;background:transparent;border:none;
  color:var(--ink);font-family:'Oswald',sans-serif;font-size:23px;font-variant-numeric:tabular-nums;-moz-appearance:textfield}
.stepper input::-webkit-outer-spin-button,.stepper input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.unit{color:var(--mute);font-size:10px;text-align:center;margin-top:-4px}
.detail{border-top:1px solid var(--line);padding:12px;background:var(--panel2);font-size:13px}
.detail ul{margin:6px 0 0;padding-left:16px;color:var(--mute);line-height:1.55}
.detail label{display:block;color:var(--mute);font-size:11px;margin:12px 0 5px}
select,.inp{width:100%;background:var(--bg);color:var(--ink);border:1px solid var(--line);
  border-radius:8px;padding:9px;font-size:13px;font-family:inherit}
.note{color:var(--mute);font-size:11.5px;margin-top:8px;line-height:1.5}
.bar{position:fixed;left:0;right:0;bottom:0;z-index:30;background:rgba(16,19,23,.94);
  backdrop-filter:blur(8px);border-top:1px solid var(--line);padding:10px 14px 16px}
.barin{max-width:560px;margin:0 auto;display:flex;gap:8px;align-items:center}
.btn{flex:1;padding:13px;border-radius:10px;border:1px solid var(--line);background:var(--panel);
  color:var(--ink);font-family:'Oswald',sans-serif;font-size:14px;text-transform:uppercase;
  letter-spacing:.06em;cursor:pointer}
.btn[data-fill="1"]{border:none;color:#101317;font-weight:600}
.btn[data-ghost="1"]{flex:none;padding:13px 14px;color:var(--mute)}
.timer{flex:1;display:flex;align-items:center;gap:10px}
.timer .num{font-family:'Oswald',sans-serif;font-size:30px;font-variant-numeric:tabular-nums;line-height:1}
.timer .lab{color:var(--mute);font-size:11px}
.track{flex:1;height:4px;background:var(--line);border-radius:2px;overflow:hidden}
.fill{height:100%;transition:width .9s linear}
.sheet{position:fixed;inset:0;z-index:40;background:rgba(8,10,12,.72);overflow-y:auto;padding:40px 0 60px}
.sheetin{max-width:560px;margin:0 auto;background:var(--panel);border:1px solid var(--line);
  border-radius:16px;padding:18px}
.sheetin h2{font-size:17px;margin:0 0 4px;text-transform:uppercase;letter-spacing:.07em}
.brow{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--line)}
.brow span{flex:1;font-size:13.5px}
.toggle{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:12px;background:var(--panel2);border-radius:10px;margin-top:10px;font-size:13px}
.sw{width:48px;height:28px;border-radius:99px;background:var(--line);border:none;position:relative;cursor:pointer;flex:none}
.sw i{position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:var(--ink);transition:left .18s}
.sw[data-on="1"] i{left:23px}
.hist{font-size:12px;color:var(--mute);line-height:1.6}
.hrow{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--line);font-size:13px}
.delta{font-size:11px;font-variant-numeric:tabular-nums}
.empty{text-align:center;color:var(--mute);font-size:13px;padding:36px 20px;line-height:1.6}
.rule3{display:flex;gap:12px;padding:16px 0;border-top:1px solid var(--line);font-size:13.5px;line-height:1.4}
.rule3 b{font-weight:600}
.stepn{width:24px;height:24px;flex:none;border-radius:50%;display:grid;place-items:center;
  color:#101317;font-family:'Oswald',sans-serif;font-size:14px;margin-top:1px}
.root{margin-top:14px;padding:12px;border:1px solid;border-radius:10px;font-size:13.5px;text-align:center}
.branch{margin-top:14px}
.bname{font-size:11px;letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px}
.step{display:flex;align-items:center;gap:9px;padding:7px 0;font-size:13px;color:var(--mute)}
.step .dot{width:7px;height:7px;border-radius:50%;flex:none}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`;

/* ─────────────────────────  APP  ───────────────────────── */

export default function App() {
  const [cfg, setCfg] = useState(DEFAULT_CFG);
  const [ready, setReady] = useState(false);
  const [workout, setWorkout] = useState("pull");
  const [log, setLog] = useState({});
  const [open, setOpen] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [history, setHistory] = useState([]);
  const [rest, setRest] = useState(null);
  const tick = useRef(null);

  useEffect(() => {
    const c = loadKey(K_CFG, null);
    const h = loadKey(K_HIST, []);
    if (c) setCfg({ ...DEFAULT_CFG(), ...c });
    setHistory(Array.isArray(h) ? h : []);
    setReady(true);
  }, []);

  const patchCfg = useCallback((fn) => {
    setCfg((prev) => {
      const next = typeof fn === "function" ? fn(prev) : { ...prev, ...fn };
      saveKey(K_CFG, next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (rest == null) return;
    tick.current = setInterval(() => {
      setRest((r) => (r && r.left > 1 ? { ...r, left: r.left - 1 } : null));
    }, 1000);
    return () => clearInterval(tick.current);
  }, [rest?.started]);

  const plan = buildPlan(cfg, workout);
  const accent = WORKOUTS[workout].accent;
  const lastSession = history.filter((h) => h.workout === workout).slice(-1)[0];

  const startRest = (secs, label) =>
    setRest({ left: secs, total: secs, label, started: Date.now() });

  const toggle = (item) => {
    const key = item.key;
    const cur = log[key];
    if (cur?.done) {
      setLog({ ...log, [key]: { ...cur, done: false } });
      return;
    }
    const value = cur?.value ?? item.target ?? 0;
    const next = { ...log, [key]: { done: true, value } };
    setLog(next);
    const set = plan[item.setIdx];
    const isLastOfSet = item.idx === set.items.length - 1;
    const allDone = set.items.every((i) => next[i.key]?.done);
    if (isLastOfSet || allDone) startRest(cfg.restSet, `Set ${set.n} done — rest`);
    else startRest(cfg.restEx, "Rest before next exercise");
  };

  const setValue = (key, v) =>
    setLog((l) => ({ ...l, [key]: { done: l[key]?.done ?? false, value: Math.max(0, v) } }));

  const doneCount = Object.values(log).filter((v) => v.done).length;
  const totalItems = plan.reduce((a, s) => a + s.items.length, 0);

  const finish = () => {
    const entries = {};
    plan.forEach((s) =>
      s.items.forEach((i) => {
        if (log[i.key]?.done) entries[i.key] = { name: i.name, value: log[i.key].value, hold: i.hold };
      })
    );
    if (!Object.keys(entries).length) return;
    const session = {
      id: Date.now(),
      date: todayStr(),
      workout,
      deload: cfg.deload,
      entries,
      total: Object.values(entries).reduce((a, e) => a + (e.hold ? 0 : e.value), 0),
    };
    const next = [...history, session].slice(-60);
    setHistory(next);
    saveKey(K_HIST, next);
    setLog({});
    setRest(null);
    setSheet("saved");
  };

  if (!ready)
    return (
      <div className="lw">
        <style>{CSS}</style>
        <div className="empty">Loading your program…</div>
      </div>
    );

  return (
    <div className="lw">
      <style>{CSS}</style>
      <div className="wrap">
        <div className="top">
          <div className="brand">
            <h1>Starter Program</h1>
            <span>
              {doneCount}/{totalItems} logged{cfg.deload ? " · deload" : ""}
            </span>
          </div>
          <div className="tabs">
            {ORDER.map((w) => (
              <button
                key={w}
                className="tab"
                data-on={w === workout ? "1" : "0"}
                style={w === workout ? { background: WORKOUTS[w].accent, borderColor: WORKOUTS[w].accent } : undefined}
                onClick={() => {
                  setWorkout(w);
                  setOpen(null);
                }}
              >
                {WORKOUTS[w].label}
              </button>
            ))}
          </div>
        </div>

        {plan.map((s) => {
          const done = s.items.filter((i) => log[i.key]?.done).length;
          return (
            <div key={s.n}>
              <div className="setrow">
                <div className="disp" style={{ color: accent }}>
                  Circuit set {s.n}
                </div>
                <div className="rule" />
                <div className="cnt">
                  {done}/{s.items.length}
                </div>
              </div>
              {s.items.map((item) => (
                <ExerciseCard
                  key={item.key}
                  item={item}
                  accent={accent}
                  entry={log[item.key]}
                  open={open === item.key}
                  prev={lastSession?.entries?.[item.key]}
                  onOpen={() => setOpen(open === item.key ? null : item.key)}
                  onToggle={() => toggle(item)}
                  onValue={(v) => setValue(item.key, v)}
                  onSwap={(name) =>
                    patchCfg((c) => ({ ...c, swaps: { ...c.swaps, [item.ex]: name } }))
                  }
                  onOverride={(v) =>
                    patchCfg((c) => ({ ...c, overrides: { ...c.overrides, [`${workout}:${item.key}`]: v } }))
                  }
                  onClearOverride={() =>
                    patchCfg((c) => {
                      const o = { ...c.overrides };
                      delete o[`${workout}:${item.key}`];
                      return { ...c, overrides: o };
                    })
                  }
                  overridden={cfg.overrides?.[`${workout}:${item.key}`] != null}
                />
              ))}
            </div>
          );
        })}

        <div style={{ height: 20 }} />
      </div>

      <div className="bar">
        <div className="barin">
          {rest ? (
            <>
              <div className="timer">
                <div>
                  <div className="num" style={{ color: accent }}>
                    {fmt(rest.left)}
                  </div>
                  <div className="lab">{rest.label}</div>
                </div>
                <div className="track">
                  <div
                    className="fill"
                    style={{ width: `${(rest.left / rest.total) * 100}%`, background: accent }}
                  />
                </div>
              </div>
              <button className="btn" data-ghost="1" onClick={() => setRest(null)}>
                Skip
              </button>
            </>
          ) : (
            <>
              <button className="btn" data-ghost="1" onClick={() => setSheet("settings")}>
                Setup
              </button>
              <button className="btn" data-ghost="1" onClick={() => setSheet("progress")}>
                Progress
              </button>
              <button className="btn" data-ghost="1" onClick={() => setSheet("history")}>
                History
              </button>
              <button
                className="btn"
                data-fill="1"
                style={{ background: accent }}
                onClick={finish}
                disabled={!doneCount}
              >
                Finish {WORKOUTS[workout].label}
              </button>
            </>
          )}
        </div>
      </div>

      {sheet === "settings" && (
        <Settings cfg={cfg} patchCfg={patchCfg} onClose={() => setSheet(null)} />
      )}
      {sheet === "progress" && (
        <Progress
          workout={workout}
          history={history}
          cfg={cfg}
          patchCfg={patchCfg}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === "history" && (
        <History
          history={history}
          cfg={cfg}
          onRestore={(d) => {
            setCfg({ ...DEFAULT_CFG(), ...d.cfg });
            saveKey(K_CFG, d.cfg);
            setHistory(d.history);
            saveKey(K_HIST, d.history);
            setSheet(null);
          }}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === "saved" && (
        <div className="sheet" onClick={() => setSheet(null)}>
          <div className="wrap">
            <div className="sheetin" onClick={(e) => e.stopPropagation()}>
              <h2>Session saved</h2>
              <p className="note">
                Logged to history. Next time you open this workout you'll see each rep count
                against today's numbers. Aim to add one or two reps per exercise per week.
              </p>
              <button className="btn" data-fill="1" style={{ background: accent, marginTop: 14 }} onClick={() => setSheet(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────  EXERCISE CARD  ───────────────────────── */

function ExerciseCard({
  item, accent, entry, open, prev, onOpen, onToggle, onValue,
  onSwap, onOverride, onClearOverride, overridden,
}) {
  const meta = EX[item.ex];
  const value = entry?.value ?? item.target ?? 0;
  const unit = item.hold ? "sec hold" : item.perLeg ? "reps / leg" : "reps";
  const delta = prev && !item.hold ? value - prev.value : null;

  return (
    <div className="card" data-done={entry?.done ? "1" : "0"}>
      <div className="ex">
        <button
          className="tick"
          data-on={entry?.done ? "1" : "0"}
          onClick={onToggle}
          aria-label={entry?.done ? "Mark not done" : "Mark done"}
        >
          ✓
        </button>
        <div className="exmain" onClick={onOpen}>
          <div className="exname">{item.name}</div>
          <div className="exsub">
            {item.repOut ? (
              <span className="pill">Rep out to failure</span>
            ) : (
              <span>
                Target {item.target}
                {item.hold ? " reps × max hold" : item.perLeg ? " per leg" : " reps"}
              </span>
            )}
            {item.swapped && <span className="pill">swapped</span>}
            {overridden && <span className="pill">custom</span>}
            {!item.hold && value >= 15 && (
              <span className="pill" style={{ borderColor: accent, color: accent }}>
                15 reps — level up
              </span>
            )}
            {delta != null && prev && (
              <span className="delta" style={{ color: delta >= 0 ? "var(--ok)" : "var(--warn)" }}>
                {delta >= 0 ? "+" : ""}{delta} vs last
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="stepper">
            <button onClick={() => onValue(value - 1)} aria-label="One less">−</button>
            <input
              type="number"
              value={value}
              onChange={(e) => onValue(parseInt(e.target.value || "0", 10))}
              inputMode="numeric"
            />
            <button onClick={() => onValue(value + 1)} aria-label="One more">+</button>
          </div>
          <div className="unit">{unit}</div>
        </div>
      </div>

      {open && (
        <div className="detail">
          <div style={{ color: accent, fontSize: 11, letterSpacing: ".06em" }}>Form</div>
          <ul>
            {meta.cues.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          {meta.note && <div className="note">{meta.note}</div>}

          {meta.prog?.length > 0 && (
            <>
              <label>Progression — easiest to hardest</label>
              <select value={item.name} onChange={(e) => onSwap(e.target.value)}>
                {(meta.prog.includes(meta.name) ? meta.prog : [meta.name, ...meta.prog]).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="note">
                Pick the variation you can do for roughly 6–10 reps. Once you hit 15, move up.
              </div>
            </>
          )}

          {!item.repOut && (
            <>
              <label>Target for this set</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="inp"
                  type="number"
                  value={item.target}
                  inputMode="numeric"
                  onChange={(e) => onOverride(Math.max(1, parseInt(e.target.value || "1", 10)))}
                />
                {overridden && (
                  <button className="btn" data-ghost="1" onClick={onClearOverride}>
                    Reset
                  </button>
                )}
              </div>
              <div className="note">
                Normally this comes from your benchmark test. Editing it here pins this one set.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────  SETTINGS  ───────────────────────── */

function Settings({ cfg, patchCfg, onClose }) {
  return (
    <div className="sheet" onClick={onClose}>
      <div className="wrap">
        <div className="sheetin" onClick={(e) => e.stopPropagation()}>
          <h2>Benchmark test</h2>
          <p className="note">
            Do the first circuit set of each workout to failure and enter your max reps. Every set
            target rebuilds from these numbers, dropping one or two reps per set the way the
            program lays out.
          </p>

          {ORDER.map((w) => (
            <div key={w} style={{ marginTop: 18 }}>
              <div className="disp" style={{ color: WORKOUTS[w].accent, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase" }}>
                {WORKOUTS[w].label}
              </div>
              {WORKOUTS[w].bench.map((id) => (
                <div className="brow" key={id}>
                  <span>
                    {EX[id].name}
                    {EX[id].perLeg && <span className="pill" style={{ marginLeft: 6 }}>per leg</span>}
                  </span>
                  <div className="stepper">
                    <button onClick={() => patchCfg((c) => ({ ...c, benchmarks: { ...c.benchmarks, [w]: { ...c.benchmarks[w], [id]: Math.max(1, c.benchmarks[w][id] - 1) } } }))}>−</button>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={cfg.benchmarks[w][id]}
                      onChange={(e) =>
                        patchCfg((c) => ({ ...c, benchmarks: { ...c.benchmarks, [w]: { ...c.benchmarks[w], [id]: Math.max(1, parseInt(e.target.value || "1", 10)) } } }))
                      }
                    />
                    <button onClick={() => patchCfg((c) => ({ ...c, benchmarks: { ...c.benchmarks, [w]: { ...c.benchmarks[w], [id]: c.benchmarks[w][id] + 1 } } }))}>+</button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="toggle">
            <div>
              <div>Deload week</div>
              <div className="note" style={{ marginTop: 2 }}>
                Halves every target. Run one every 4–8 weeks of hard training.
              </div>
            </div>
            <button className="sw" data-on={cfg.deload ? "1" : "0"} onClick={() => patchCfg((c) => ({ ...c, deload: !c.deload }))}>
              <i />
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: "var(--mute)", fontSize: 11 }}>Rest between exercises</label>
              <select
                value={cfg.restEx}
                onChange={(e) => patchCfg((c) => ({ ...c, restEx: +e.target.value }))}
              >
                {[60, 75, 90, 120].map((s) => (
                  <option key={s} value={s}>{fmt(s)}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ color: "var(--mute)", fontSize: 11 }}>Rest between sets</label>
              <select
                value={cfg.restSet}
                onChange={(e) => patchCfg((c) => ({ ...c, restSet: +e.target.value }))}
              >
                {[120, 150, 180, 210, 240].map((s) => (
                  <option key={s} value={s}>{fmt(s)}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="note" style={{ marginTop: 16 }}>
            Schedule: push, pull, rest, push, pull, rest, legs. Legs can also ride along with a
            push or pull day. Explosive up, slow down, form over reps.
          </p>

          <button className="btn" data-fill="1" style={{ background: "#79b4ae", marginTop: 14 }} onClick={onClose}>
            Save and close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────  PROGRESS  ───────────────────────── */

function Progress({ workout, history, cfg, patchCfg, onClose }) {
  const [tab, setTab] = useState(workout);
  const accent = WORKOUTS[tab].accent;
  const sessions = history.filter((h) => h.workout === tab);

  // Weeks since the last deload, measured from the most recent deload session.
  const lastDeload = [...history].reverse().find((h) => h.deload);
  const anchor = lastDeload?.date || history[0]?.date;
  const weeksSince = anchor
    ? Math.floor((Date.now() - new Date(anchor).getTime()) / 6048e5)
    : null;

  // Best logged reps per exercise across the last six sessions of this workout.
  const best = {};
  sessions.slice(-6).forEach((s) =>
    Object.values(s.entries).forEach((e) => {
      if (e.hold) return;
      best[e.name] = Math.max(best[e.name] || 0, e.value);
    })
  );
  const ready = Object.entries(best).filter(([, v]) => v >= 15);

  const bump = () =>
    patchCfg((c) => ({
      ...c,
      benchmarks: {
        ...c.benchmarks,
        [tab]: Object.fromEntries(
          Object.entries(c.benchmarks[tab]).map(([k, v]) => [k, v + 1])
        ),
      },
    }));

  return (
    <div className="sheet" onClick={onClose}>
      <div className="wrap">
        <div className="sheetin" onClick={(e) => e.stopPropagation()}>
          <h2>How to progress</h2>
          <p className="note">
            The only way to get stronger in calisthenics is to raise difficulty and intensity. Same
            workout every week maintains what you have; it doesn't build anything new.
          </p>

          <div className="rule3">
            <div className="stepn" style={{ background: accent }}>1</div>
            <div>
              <b>Add one or two reps per exercise, per week.</b>
              <div className="note">
                Small and boring beats big jumps. The tracker shows a delta against your last
                session so you can see whether you actually moved.
              </div>
              <button className="btn" style={{ marginTop: 10, borderColor: accent, color: accent }} onClick={bump}>
                Add 1 rep to every {WORKOUTS[tab].label.toLowerCase()} benchmark
              </button>
            </div>
          </div>

          <div className="rule3">
            <div className="stepn" style={{ background: accent }}>2</div>
            <div>
              <b>At 15 reps, make it harder.</b>
              <div className="note">
                Once an exercise gives you 15 clean reps, either add resistance or move to the next
                progression, then work back up to 15 and repeat. Swap the variation from the
                exercise card on the main screen.
              </div>
              {ready.length > 0 ? (
                <div style={{ marginTop: 10 }}>
                  {ready.map(([name, v]) => (
                    <div className="hrow" key={name}>
                      <span>{name}</span>
                      <span style={{ color: accent }}>{v} reps — move up</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="note" style={{ marginTop: 8 }}>
                  Nothing at 15 yet in your recent {WORKOUTS[tab].label.toLowerCase()} sessions.
                </div>
              )}
            </div>
          </div>

          <div className="rule3">
            <div className="stepn" style={{ background: accent }}>3</div>
            <div>
              <b>Deload every 4 to 8 weeks.</b>
              <div className="note">
                Strain builds in muscles, tendons and joints. Left alone it stalls progress and
                invites injury. For a deload week, halve every rep range and keep everything else
                the same.
              </div>
              <div className="note" style={{ marginTop: 6, color: weeksSince >= 4 ? accent : undefined }}>
                {weeksSince == null
                  ? "No sessions logged yet — the counter starts with your first one."
                  : lastDeload
                  ? `${weeksSince} week${weeksSince === 1 ? "" : "s"} since your last deload.`
                  : `${weeksSince} week${weeksSince === 1 ? "" : "s"} of training logged, no deload yet.`}
              </div>
              <div className="toggle">
                <div>Deload week{cfg.deload ? " is on" : ""}</div>
                <button className="sw" data-on={cfg.deload ? "1" : "0"} onClick={() => patchCfg((c) => ({ ...c, deload: !c.deload }))}>
                  <i />
                </button>
              </div>
            </div>
          </div>

          <div className="rule3">
            <div className="stepn" style={{ background: accent }}>4</div>
            <div>
              <b>Failed mid-set? Finish it on an easier progression.</b>
              <div className="note">
                Owe 2 of 4 inverted rows? Do the rest on an easier variation and note how many you
                replaced. Each week, replace fewer, until the whole set is the real exercise.
              </div>
            </div>
          </div>

          <h2 style={{ marginTop: 26 }}>Where this leads</h2>
          <div className="tabs" style={{ marginTop: 10 }}>
            {ORDER.map((w) => (
              <button
                key={w}
                className="tab"
                data-on={w === tab ? "1" : "0"}
                style={w === tab ? { background: WORKOUTS[w].accent, borderColor: WORKOUTS[w].accent } : undefined}
                onClick={() => setTab(w)}
              >
                {WORKOUTS[w].label}
              </button>
            ))}
          </div>

          <div className="root" style={{ borderColor: accent }}>
            {PATHWAYS[tab].root}
          </div>
          {PATHWAYS[tab].branches.map((b) => (
            <div key={b.name} className="branch">
              <div className="bname" style={{ color: accent }}>{b.name}</div>
              {b.steps.map((s, i) => (
                <div className="step" key={s}>
                  <span className="dot" style={{ background: accent, opacity: 0.3 + (0.7 * i) / (b.steps.length - 1 || 1) }} />
                  {s}
                </div>
              ))}
            </div>
          ))}
          <p className="note">
            These are the skills the basics feed into, not a checklist for now. Master the
            foundations first — skipping them is what makes people stall and quit.
          </p>

          <button className="btn" data-fill="1" style={{ background: accent, marginTop: 16 }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────  HISTORY  ───────────────────────── */

function History({ history, cfg, onRestore, onClose }) {
  const [tab, setTab] = useState("pull");
  const rows = history.filter((h) => h.workout === tab).slice().reverse();

  return (
    <div className="sheet" onClick={onClose}>
      <div className="wrap">
        <div className="sheetin" onClick={(e) => e.stopPropagation()}>
          <h2>History</h2>
          <div className="tabs" style={{ marginTop: 12 }}>
            {ORDER.map((w) => (
              <button
                key={w}
                className="tab"
                data-on={w === tab ? "1" : "0"}
                style={w === tab ? { background: WORKOUTS[w].accent, borderColor: WORKOUTS[w].accent } : undefined}
                onClick={() => setTab(w)}
              >
                {WORKOUTS[w].label}
              </button>
            ))}
          </div>

          {rows.length === 0 ? (
            <div className="empty">
              Nothing logged for {WORKOUTS[tab].label} yet. Finish a session and it lands here.
            </div>
          ) : (
            <div style={{ marginTop: 14 }}>
              {rows.map((s) => (
                <details key={s.id} style={{ marginBottom: 8 }}>
                  <summary style={{ cursor: "pointer", padding: "10px 0", borderBottom: "1px solid var(--line)", fontSize: 13.5 }}>
                    {s.date} · {s.total} total reps{s.deload ? " · deload" : ""}
                  </summary>
                  <div className="hist" style={{ padding: "8px 0 4px" }}>
                    {Object.entries(s.entries).map(([k, e]) => (
                      <div className="hrow" key={k}>
                        <span style={{ color: "var(--ink)" }}>{e.name}</span>
                        <span>{e.value}{e.hold ? "s hold" : ""}</span>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          )}

          <div className="note" style={{ marginTop: 22 }}>
            Your log lives on this device only. Back it up before switching phones or clearing
            browser data.
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn" onClick={() => downloadBackup(cfg, history)}>
              Export backup
            </button>
            <label className="btn" style={{ textAlign: "center", cursor: "pointer" }}>
              Import backup
              <input
                type="file"
                accept="application/json"
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const r = new FileReader();
                  r.onload = () => {
                    try {
                      const d = JSON.parse(r.result);
                      if (d?.cfg && Array.isArray(d?.history)) onRestore(d);
                      else alert("That file isn't a tracker backup.");
                    } catch {
                      alert("Couldn't read that file.");
                    }
                  };
                  r.readAsText(f);
                }}
              />
            </label>
          </div>

          <button className="btn" style={{ marginTop: 16 }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
