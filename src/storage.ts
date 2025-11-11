import { STORAGE_KEY } from "./constants";
import { sortDayActions } from "./helpers";
import { CurrentDay, Action, Player } from "./types";

function exampleData(): CurrentDay {
  const player: Player = {
    name: "Adventurer",
    startOfDayCoin: { focus: 10, recovery: 5 },
    currentDayGain: { focus: 0, recovery: 0 },
    currentDayLoss: { focus: 0, recovery: 0 },
  };

  const makeAction = (label: string, order:number , f: number, r = 0,isFavorite = false): Action => ({
    id: label.toLowerCase().replace(/\s+/g, "-"),
    label,
    price: { focus: f, recovery: r },
    isFavorite: isFavorite,
    count: 0,
    order,
  });

  return sortDayActions({
    adventurer: player,
    boons: [
      makeAction("📕Reading", 0, -1, 0),
      makeAction("🍦Tasty treat", 1, -3, -1),
    ],
    encounters: [
      makeAction("👕Wash and dry laundry", 0, 1, 0),
      makeAction("🛏️In bed at 9:30", 1, 2, 1, true),
    ],
    adventures: [
      makeAction("👟Physical fitness", 0, 1, 1),
      makeAction("🍎Healthy diet", 1, 3, 0, true),
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

  currentDay.adventurer.startOfDayCoin.focus = endOfDayFocus;
  currentDay.adventurer.startOfDayCoin.recovery = endOfDayRecovery;
  currentDay.adventurer.currentDayGain = { focus: 0, recovery: 0 };
  currentDay.adventurer.currentDayLoss = { focus: 0, recovery: 0 };
  return currentDay;
}

export function saveCurrentDay(data: CurrentDay) {
  if (isNewDay(new Date(data.todayLocal))) {
    data = cashOutCurrentDay();
  }
  data.todayLocal = new Date();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sortDayActions(data)));
}
