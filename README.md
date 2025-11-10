# An Adventurer's Life for Me

A static web page to gamify chores and tasks to help avoid procrastination and promote task completion.

---

This project is a small React + TypeScript static app intended to be hosted on GitHub Pages. It reads/writes a `currentDay_AdventurersLife` object to localStorage and renders three dynamic sections:

- Daniel Boon's Shop
- Encounters
- Adventures

Each section shows a dynamic grid of items (number input with +/- controls and a label). The project includes a tiny storage helper that seeds example data when localStorage is empty.

Quick start

1. Install dependencies:

```powershell
npm install
```

2. Run locally:

```powershell
npm start
```

3. Build and deploy to GitHub Pages (set `homepage` in `package.json` and create a repo named `An-Adventurers-Life`):

```powershell
npm run deploy
```

Files of interest

- `src/types.ts` — domain types (Currency, Player, Action, CurrentDay)
- `src/storage.ts` — load/save helpers and example seed data
- `src/components/Section.tsx` and `src/components/ItemCell.tsx` — UI components for the grid
- `src/App.tsx` — wiring and page layout
