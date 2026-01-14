# [An Adventurer's Life for Me](https://spencerwbarnes.github.io/An-Adventurers-Life/)

This app helps you treat tasks like small adventures and quests: earn and spend coins to build a habit loop and make progress fun.

Earn coins by finishing tasks (encounters) or working towards bigger goals (adventures), then spend them on fun or relaxing activities (boons). The lists are fully customizable and stored locally on your browser, perfect for tailoring them to best motivate you.

## How to Adventure

1. Launch the page at [https://spencerwbarnes.github.io/An-Adventurers-Life/](https://spencerwbarnes.github.io/An-Adventurers-Life/) 
2. Click '+' on tasks as you complete them, some may only be doable once and others multiple times in a day.
3. Check your coin balances in the bottom footer
4. Keep up your task tracking and every day at 3:00 AM your coin balances will be updated and task completions reset for a new day.

### Customization options:

#### Adventurer name

1. Click the pencil edit icon in the footer.
2. Update your name.
3. Update your coin balances from the start of the day.
4. Click 'Save'.

#### Task lists

1. Click the pencil edit icon next to the page title.
2. Update task names and coin earnings/costs.
3. Favorite tasks to give them a golden sheen.
4. Reorder tasks using the '▲' and '▼' arrows.
5. Delete tasks using the '❌' button.
6. Add new tasks using the button at the bottom of the list.
7. Once finished, exit edit mode by clicking the pencil edit icon at the top again.

## Project Documentation

This project is a small React + TypeScript static app intended to be hosted on GitHub Pages. It reads/writes a `currentDay_AdventurersLife` object to localStorage and renders three dynamic task sections:

- Daniel Boon's Shop
- Encounters
- Adventures

Each section shows a dynamic grid of items which can be customized by clicking the pencil icon next to the page's title. The player stats footer shows the coin balance changes for the current day and can be edited by clicking the pencil icon next in the footer.

Quick start

1. Install dependencies:

```powershell
npm install --legacy-peer-deps
```

2. Run locally:

```powershell
npm run dev
```

1. Build and deploy to GitHub Pages:

```powershell
npm run build
npm run deploy
```

### Files of interest

- `src/types.ts` — domain types (Currency, Player, Action, CurrentDay)
- `src/storage.ts` — load & save session data helpers 
- `src/App.tsx` — wiring and page layout
- `src/exampleData.ts` - default data and example of valid objects
- `src/CurrentDayContext.tsx` - central authority for shared data, handling read & write to session storage and data updates
- `src/components/Dialogs` - various popup dialogs/modals used
- `assets` - store static files like images 

### Component hierarchy

- CurrentDayProvider
  - App
    - Sections (Can add new action items)
      - ItemCells
        - ReadonlyItemCells (Can update counts for action items)
        - EditableItemCells (Can delete action items or update label, favorite status, prices, and order of action items)
    - Footer (Can modify Player data)

## Attributions

### Icons

Favicons are courtesy of [icons8.com](https://icons8.com/)