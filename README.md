# 🐍 Snake Game (DOM, HTML/CSS/JS)

A responsive, mobile-friendly Snake game built with **plain HTML, CSS Grid, and modular JavaScript**.  
Includes start/pause/resume/restart controls, sounds, scoring with localStorage, and touch controls.

---

## ✨ Features

- **DOM grid board** driven by CSS variables for rows/columns and size.
- **Modular architecture**: `Game`, `Snake`, and `Food` classes with a small bootstrap script.
- **Start overlay + actions bar** (pause/play/restart).
- **Keyboard & touch controls** (WASD/Arrows + on-screen arrows).
- **Scoring + High score persistence** via `localStorage`.
- **Sound effects** for eat & game over (preloaded `<audio>`).
- **Pause/Resume** without losing state.
- **Mobile layout** with responsive controls.

---

## 🗂️ Project Structure

```
.
├── images/
│   ├── apple.png
│   ├── pause.png
│   ├── play.png
│   ├── restart.png
│   └── snake.png
├── sounds/
│   ├── eat.mp3
│   └── game-over.mp3
├── Food.js
├── Game.js
├── Snake.js
├── script.js
├── style.css
└── index.html
```

- **index.html** – markup, controls, audio elements.
- **style.css** – CSS variables, grid layout, overlays, actions, and mobile controls.
- **script.js** – bootstraps a game, global helpers (CSS vars, sound, sleep), and event listeners.
- **Game.js** – main loop, score handling, pause/resume/restart, game over UI & high score.
- **Snake.js** – snake parts, movement, collision, eat handling, direction change rules.
- **Food.js** – food element and random placement on the grid.

---

## 🚀 Getting Started

### 1) Run locally
This is a static project—no build step is required.

- **Option A (recommended):** Serve with a simple HTTP server to avoid CORS issues for ES modules.
  - VS Code: use “Live Server” extension  
  - Node: `npx http-server` (or any static server)
- **Option B:** Open `index.html` directly in your browser (some browsers may block ES module imports from `file://`).

### 2) Play
- Click **Start playing**.
- Use **Arrow keys** or **WASD**.  
- On mobile, tap the on-screen arrows.

---

## 🎮 Controls

- **Keyboard:** `ArrowUp/Down/Left/Right` or `W/A/S/D`.
- **Touch:** tap the arrow buttons in the bottom control pad.
- **Pause / Resume:** top-bar buttons.
- **Restart:** available in header and game-over screen.

---

## 🧠 How It Works

- **Grid & Sizing**  
  The board is a square CSS Grid using variables:
  - `--game-rows`, `--game-columns`, `--game-size`.

- **Main Loop**  
  `Game.loop()` advances the game on a timer (ms per frame in `this.time`) and gently speeds up over time.

- **Snake Movement & Collision**  
  The snake is an array of parts (DOM `<div>`s). Movement updates the head’s grid cell, shifts the body, prevents 180° turns, and checks wall/self collisions.

- **Food & Eating**  
  Food is an `<img>` placed at random grid coordinates; when the head overlaps, the snake grows, score increases, and an eat sound plays.

- **Scoring & High Score**  
  Score combines time survived + foods eaten, with high score stored in `localStorage`.

---

## ⚙️ Configuration & Customization

Edit **`style.css`**:

- **Board size:** `--game-size` (e.g., `min(60vw, 60vh)`).
- **Grid dimensions:** `--game-rows`, `--game-columns` (default `15`).
- **Colors:** `--snake-color`, `--snake-head-color`.

Adjust **initial speed** by changing `this.time` in `Game`’s constructor (lower = faster).

---

## 📦 Assets

- Images in `images/` (snake, apple, pause/play/restart icons).  
- Sounds in `sounds/` (`eat.mp3`, `game-over.mp3`).  
Linked in `index.html` and preloaded via `<audio>`.

---

## 🧪 Troubleshooting

- **Module import errors** (e.g., `import ... from '/Game.js'`):  
  Run via a local server so ES module paths resolve correctly.
- **No sound on first interaction:**  
  Some browsers block autoplay; sounds will play after the first user action.
- **Controls not responding:**  
  Ensure the game has started (click **Start playing**) and the window has focus.

---

## 🗺️ Roadmap Ideas

- Smooth cell-to-cell animation (CSS transitions).  
- Obstacles & levels.  
- Power-ups (speed boost, shrink, multiplier).  
- Swipe gestures for mobile.  
- Save/restore full game state on pause/leave.  

---

## 📄 License

MIT — feel free to use and modify.
