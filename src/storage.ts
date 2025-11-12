import { STORAGE_KEY } from "./constants";
import { sortDayActions } from "./helpers";
import { CurrentDay, Action, Player } from "./types";

function exampleData(): CurrentDay {
  const player: Player = {
    name: "Adventurer",
    startOfDayCoin: { focus: 0, recovery: 0 },
    currentDayGain: { focus: 0, recovery: 0 },
    currentDayLoss: { focus: 0, recovery: 0 },
  };

  const makeAction = (label: string, order:number , focusCost: number = 0, recoveryCost = 0, isFavorite = false): Action => ({
    id: label.toLowerCase().replace(/\s+/g, "-"),
    label,
    price: { focus: focusCost, recovery: recoveryCost },
    isFavorite: isFavorite,
    count: 0,
    order,
  });

  return sortDayActions({
    adventurer: player,
    boons: [
      makeAction("🌒Napping", 0, 0, -3),
      makeAction("📕Reading", 1, 0, -3),
      makeAction("🍦Tasty treat", 2, 0, -3),
      makeAction("🎥Watching videos", 3, 0, -6),
      makeAction("📲Scrolling", 4, -6, 0),
    ],
    encounters: [
      makeAction("🛏️In bed at 9:30", 0, 1, 0, true),
      makeAction("🍽️Unload dishwasher", 1, 0, 2),
      makeAction("👟Follow exercise program", 2, 0, 2),
      makeAction("🧼Clean an area (shower after)", 3, 0, 2),
      makeAction("🍽️Clear dirty dishes", 4, 0, 1),
      makeAction("🍽️Unload drying wrack", 5, 0, 1),
      makeAction("👕Wash and dry laundry", 6, 1, 0),
      makeAction("👕Fold laundry", 7, 0, 1),
      makeAction("✏️Write something", 8, 0, 1),
      makeAction("🍎Pick up groceries", 9, 0, 1),
      makeAction("🧼Clean an area (no shower)", 10, 0, 1),
      makeAction("👟Record weight", 11, 0, 1),
    ],
    adventures: [
      makeAction("🧠Skills (professional)", 0, 2, 1),
      makeAction("🍎Healthy diet", 1, 1, 2),
      makeAction("💼Self parenting", 2, 0, 4, true),
      makeAction("✅Task backlog", 3, 0, 3),
      makeAction("🧠Skills (personal)", 3, 0, 3),
      makeAction("💖Healthy mind & relationships", 4, 0, 3),
      makeAction("👟Physical fitness", 5, 0, 2),
      makeAction("🧼Cleaning", 6, 0, 1),
    ],
    todayLocal: new Date(),
  });
}

export function loadCurrentDay(): CurrentDay {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const ex = exampleData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ex));
      return ex;
    }

    const data = JSON.parse(raw) as CurrentDay;
    return sortDayActions(data);
  } catch (e) {
    const ex = exampleData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ex));
    return ex;
  }
}

/**
 * Split the day at 3:00 AM local time instead of midnight, allows for more lenient day tracking
 * for late-night adventurers.
 */
export function isNewDay(savedDate: Date): boolean {
  let today = "";
  const now = new Date();
  if (now.getHours() < 3) {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    today = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
  } else {
    today = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  }

  return (
    today !== `${savedDate.getFullYear()}-${savedDate.getMonth()}-${savedDate.getDate()}`
  );
}

export function cashOutCurrentDay(): CurrentDay {
  const currentDay = loadCurrentDay();
  const endOfDayFocus = currentDay.adventurer.startOfDayCoin.focus + currentDay.adventurer.currentDayGain.focus + currentDay.adventurer.currentDayLoss.focus;
  const endOfDayRecovery = currentDay.adventurer.startOfDayCoin.recovery + currentDay.adventurer.currentDayGain.recovery + currentDay.adventurer.currentDayLoss.recovery;

  // Tally and reset balances
  currentDay.adventurer.startOfDayCoin.focus = endOfDayFocus;
  currentDay.adventurer.startOfDayCoin.recovery = endOfDayRecovery;
  currentDay.adventurer.currentDayGain = { focus: 0, recovery: 0 };
  currentDay.adventurer.currentDayLoss = { focus: 0, recovery: 0 };
  
  // Clear day's action counts
  [...currentDay.boons, ...currentDay.encounters, ...currentDay.adventures].forEach((action) => {
    action.count = 0;
  });

  return currentDay;
}

export function saveCurrentDay(data: CurrentDay) {
  if (isNewDay(new Date(data.todayLocal))) {
    data = cashOutCurrentDay();
  }
  data.todayLocal = new Date();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sortDayActions(data)));
}
