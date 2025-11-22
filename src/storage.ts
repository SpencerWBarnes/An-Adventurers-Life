import { STORAGE_KEY } from "./constants";
import { EXAMPLE_DATA } from "./exampleData";
import { sortDayActions } from "./helpers";
import { CurrentDay } from "./types";

export function loadCurrentDay(): CurrentDay {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Save and return example data if nothing was stored yet
    if (!raw) {
      const ex = EXAMPLE_DATA;
      return saveCurrentDay(ex);
    }
    // Parse and return stored data
    return JSON.parse(raw) as CurrentDay;
  } catch (e) {
    // On error, save and return example data
    const ex = EXAMPLE_DATA;
    return saveCurrentDay(ex);
  }
}

/**
 * Save current day data to local storage, sorting and updating the timestamp
 * @param data
 * @return The saved data with updated sorting and timestamp
 */
export function saveCurrentDay(data: CurrentDay): CurrentDay {
  data.todayLocal = new Date();
  data = sortDayActions(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}
