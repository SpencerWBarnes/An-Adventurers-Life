import { STORAGE_KEY } from "./constants";
import { EXAMPLE_DATA } from "./exampleData";
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
    // console.log("Loading current day data from storage", raw);
    return JSON.parse(raw) as CurrentDay;
  } catch (e) {
    // On error, save and return example data
    const ex = EXAMPLE_DATA;
    return saveCurrentDay(ex);
  }
}

/**
 * Save current day data to local storage, updating the timestamp
 * @param data
 * @return The saved data with updated timestamp
 */
export function saveCurrentDay(data: CurrentDay): CurrentDay {
  data.todayLocal = new Date();
  // console.log("Saving current day data to storage", data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}
