import { STORAGE_KEY } from "./constants";
import { CurrentDay, Action, Player } from "./types";

function exampleData(): CurrentDay {
  const player: Player = {
    name: "Adventurer",
    startOfDayCoin: { focus: 10, recovery: 5 },
    currentDayGain: { focus: 0, recovery: 0 },
    currentDayLoss: { focus: 0, recovery: 0 },
  };

  const makeAction = (label: string, f: number, r = 0, isPriority = false): Action => ({
    id: label.toLowerCase().replace(/\s+/g, "-"),
    label,
    price: { focus: f, recovery: r },
    isHighPriority: isPriority,
    count: 0,
  });

  return {
    adventurer: player,
    boons: [
      makeAction("📕Reading", -1, 0),
      makeAction("🍦Tasty treat", -3, -1),
    ],
    encounters: [
      makeAction("👕Wash and dry laundry", 1, 0),
      makeAction("🛏️In bed at 9:30", 2, 1, true),
    ],
    adventures: [
      makeAction("👟Physical fitness", 1, 1),
      makeAction("🍎Healthy diet", 3, 0, true),
    ],
  };
}

export function loadCurrentDay(): CurrentDay {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const ex = exampleData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ex));
      return ex;
    }

    return JSON.parse(raw) as CurrentDay;
  } catch (e) {
    const ex = exampleData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ex));
    return ex;
  }
}

export function saveCurrentDay(data: CurrentDay) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
