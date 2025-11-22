import { Action, CurrentDay } from "./types";

/**
 * Sort a list of actions by their order property
 * @param actions List of actions (ie. Boons, Adventures, Encounters)
 * @returns Sorted list of actions
 */
export const sortActionsByOrder = (actions: Action[]): Action[] => {
  const sortedActions = actions.slice().sort((a, b) => a.order - b.order);
  sortedActions.forEach((action, index) => {
    action.order = index;
  });
  return sortedActions;
}

/**
 * Sort the action lists within a day by their order property
 * @param day
 * @returns Day with Boons, Encounters, and Adventures sorted by order
 */
export const sortDayActions = (day: CurrentDay): CurrentDay => {
  // console.log("Sorting day actions by order", day);
  return {
    ...day,
    boons: sortActionsByOrder(day.boons),
    encounters: sortActionsByOrder(day.encounters),
    adventures: sortActionsByOrder(day.adventures),
  };
}

/**
 * Determine if the end-of-day has passed since the data was last saved
 * Splits the day at 3:00 AM local time instead of midnight to allow for lenient day tracking
 * for late-night adventurers.
 * @param savedDate Data's last edit timestamp, to be compared against now
 * @returns True if end-of-day has passed since the data's last edit timestamp, otherwise false
 */
export function isNewDay(savedDate: Date): boolean {
  let today = "";
  const now = new Date();
  savedDate = new Date(savedDate);

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

/**
 * Calculate end-of-day balances as start-of-day balances,
 * reset the day's balances and action counts for a fresh start
 * @returns Day with reset balances and action counts
 */
export function cashOutDay(currentDay: CurrentDay): CurrentDay {
  // console.log("Cashing out day", currentDay);
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

/**
 * Recalculate currentDayGain and currentDayLoss based on action counts and prices
 * @param day Day with out-of-date balances
 * @returns Day with recalculated values based on action counts and prices
 */
export function recalculateBalances(day: CurrentDay): CurrentDay {
  // console.log("Recalculating balances for day", day);
  const gain = { focus: 0, recovery: 0 };
  const loss = { focus: 0, recovery: 0 };

  const accumulate = (action: Action | undefined) => {
    if (!action) {
      return;
    }

    const count = action.count ?? 0;
    const focusDelta = (action.price.focus || 0) * count;
    const recoveryDelta = (action.price.recovery || 0) * count;

    if (focusDelta > 0) {
      gain.focus += focusDelta;
    } else {
      loss.focus += focusDelta;
    }

    if (recoveryDelta > 0) {
      gain.recovery += recoveryDelta;
    } else {
      loss.recovery += recoveryDelta;
    }
  };

  [...day.boons, ...day.encounters, ...day.adventures].forEach((a) => {
    accumulate(a);
  });

  return {
    ...day,
    adventurer: {
      ...day.adventurer,
      currentDayGain: gain,
      currentDayLoss: loss
    }
  };
}