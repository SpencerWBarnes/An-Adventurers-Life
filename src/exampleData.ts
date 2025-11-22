import { EMPTY_CURRENCY } from "./constants";
import { sortActionsByOrder } from "./helpers";
import { Player, Action } from "./types";

export const EXAMPLE_PLAYER = (): Player => ({
  name: "Adventurer",
  startOfDayCoin: EMPTY_CURRENCY(),
  currentDayGain: EMPTY_CURRENCY(),
  currentDayLoss: EMPTY_CURRENCY(),
});

const buildAction = (label: string, focusCost: number, recoveryCost: number, isFavorite: "favorite" | undefined = undefined): Action => ({
  id: crypto.randomUUID(),
  label,
  price: { focus: focusCost, recovery: recoveryCost },
  order: 0,
  count: 0,
  isFavorite: isFavorite === "favorite",
})

const EXAMPLE_BOONS = (): Action[] => [
  buildAction("🌒Napping", 0, 0),
  buildAction("📕Reading", 1, 0),
  buildAction("🍦Tasty treat", 2, 0, "favorite"),
  buildAction("🎥Watching videos", 3, 0),
  buildAction("📲Scrolling", 4, 0),
];

const EXAMPLE_ENCOUNTERS = (): Action[] => [
  buildAction("🛏️In bed at 9:30", 1, 0, "favorite"),
  buildAction("🍽️Unload dishwasher", 0, 2),
  buildAction("👟Follow exercise program", 0, 2),
  buildAction("🧼Clean an area (shower after)", 0, 2),
  buildAction("🍽️Clear dirty dishes", 0, 1),
  buildAction("🍽️Unload drying wrack", 0, 1),
  buildAction("👕Wash and dry laundry", 1, 0),
  buildAction("👕Fold laundry", 0, 1),
  buildAction("✏️Write something", 0, 1),
  buildAction("🍎Pick up groceries", 0, 1),
  buildAction("🧼Clean an area (no shower)", 0, 1),
  buildAction("👟Record weight", 0, 1),
];

const EXAMPLE_ADVENTURES = (): Action[] => [
  buildAction("🧠Skills (professional)", 2, 1),
  buildAction("🍎Healthy diet", 1, 2),
  buildAction("💼Self parenting", 0, 4, "favorite"),
  buildAction("✅Task backlog", 0, 3),
  buildAction("🧠Skills (personal)", 0, 3),
  buildAction("💖Healthy mind & relationships", 0, 3),
  buildAction("👟Physical fitness", 0, 2),
  buildAction("🧼Cleaning", 0, 1),
];

export const EXAMPLE_DATA = {
  adventurer: EXAMPLE_PLAYER(),
  boons: sortActionsByOrder(EXAMPLE_BOONS()),
  encounters: sortActionsByOrder(EXAMPLE_ENCOUNTERS()),
  adventures: sortActionsByOrder(EXAMPLE_ADVENTURES()),
  todayLocal: new Date(),
};