import { Action, Currency } from "./types";

export const FOCUS_ICON = "⭐";
export const RECOVERY_ICON = "❤️";

export const STORAGE_KEY = "currentDay_AdventurersLife";

//#region Empty data helpers
export const EMPTY_CURRENCY = (): Currency => ({ focus: 0, recovery: 0 });
export const EMPTY_ACTION = (): Action => ({
  id: "",
  label: "",
  price: EMPTY_CURRENCY(),
  order: 0,
  count: 0,
});
//#endregion