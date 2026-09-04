// Title bar buttons
const { ipcRenderer } = require("electron");
const minimizeBtn = document.getElementById("minimize-btn");
const closeBtn = document.getElementById("close-btn");
minimizeBtn.addEventListener("click", () =>
  ipcRenderer.send("window:minimize"),
);
closeBtn.addEventListener("click", () => ipcRenderer.send("window:close"));


// -- Companion config --
// To swap the companion (e.g. add a rabbit), create a new folder under
// assets/ containing these exact six filenames, then change this one line:
const BUDDY_ASSET_FOLDER = "assets/pig";

// Stage definitions: min (inclusive) up to but not including max.
// Edit thresholds/messages here without touching any logic below.
const STAGES = [
  { min: 0,   max: 20,  file: "starving.gif", mood: "Starving", message: "- Please feed me, I'm starving -" },
  { min: 20,  max: 60,  file: "Stage 2.gif",  mood: "Hungry",   message: "- Getting pretty hungry over here -" },
  { min: 60,  max: 100, file: "Stage 3.gif",  mood: "Normal",   message: "- All good here, just vibing -" },
  { min: 100, max: 150, file: "Stage 4.gif",  mood: "Full",     message: "- Nice and full -" },
  { min: 150, max: 200, file: "Stage 5.gif",  mood: "Obese",    message: "- Maybe ease up on the snacks... -" },
  { min: 200, max: Infinity, file: "Stage 6.gif", mood: "Dead", message: "- Your buddy ate way too much -" },
];

function getStage(level) {
  return STAGES.find(s => level >= s.min && level < s.max) || STAGES[STAGES.length - 1];
}

// Only the top stage (200%, "dead") is terminal.
function isTerminal(stage) {
  return stage.mood === "Dead";
}


// Food meter mechanic
// -- Configuration --
const drain_amount = 1; // % to drain per tick
const drain_interval = 900; // 1% per 0.9s
const feed_cooldown = 10000; // 10s cooldown after feeding
const feed_amount = 25; // % gained per feed
const max_level = 200; // hard cap
// -- State --
let food_level = 100;
let feed_on_cooldown = false;
let cooldown_timer = null;


// -- Elements --
const bars = Array.from({ length: 10 }, (_, i) =>
  document.getElementById(`bar-${i + 1}`),
);
const percentage_el = document.getElementById("percentage");
const mood_tag = document.getElementById("mood");
const buddy_icon = document.getElementById("buddy");
const care_reminder = document.getElementById("message");
const feed_btn = document.getElementById("feed-btn");
const feed_timer_el = feed_btn.querySelector(".timer");
const restart_btn = document.getElementById("restart-btn");


// -- Render --
function updateUI() {
  percentage_el.textContent = `${food_level}%`;

  // bars: 10 bars across a 0-200 range = 20% per bar
  bars.forEach((bar, i) => {
    const threshold = i * 20;
    const filled = food_level > threshold;
    bar.style.background = filled ? "#8FC98A" : "#C2E0B8";
    bar.style.color = filled ? "#8FC98A" : "#C2E0B8";
  });

  const stage = getStage(food_level);
  buddy_icon.src = `${BUDDY_ASSET_FOLDER}/${stage.file}`;
  mood_tag.textContent = stage.mood;
  care_reminder.textContent = stage.message;

  if (isTerminal(stage)) {
    restart_btn.style.display = "flex";
    feed_btn.style.display = "none";
  } else {
    restart_btn.style.display = "none";
    feed_btn.style.display = "flex";
  }
}


// -- Drain loop --
setInterval(() => {
  if (food_level > 0) {
    food_level = Math.max(0, food_level - drain_amount);
    updateUI();
  }
}, drain_interval);

// -- Feed button --
feed_btn.addEventListener("click", () => {
  if (feed_on_cooldown) return;
  food_level = Math.min(max_level, food_level + feed_amount);
  updateUI();
  // start cooldown
  feed_on_cooldown = true;
  feed_btn.disabled = true;
  feed_btn.style.opacity = 0.5;
  let remaining = feed_cooldown / 1000;
  feed_timer_el.textContent = `${remaining}s`;
  cooldown_timer = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(cooldown_timer);
      feed_on_cooldown = false;
      feed_btn.disabled = false;
      feed_btn.style.opacity = 1;
      feed_timer_el.textContent = "READY";
    } else {
      feed_timer_el.textContent = `${remaining}s`;
    }
  }, 1000);
});


// -- Restart button --
restart_btn.addEventListener("click", () => {
  food_level = 100;
  feed_on_cooldown = false;
  feed_btn.disabled = false;
  feed_btn.style.opacity = 1;
  feed_timer_el.textContent = "READY";
  clearInterval(cooldown_timer);
  updateUI();
});

updateUI();