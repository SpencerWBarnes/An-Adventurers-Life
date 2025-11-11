import { Action, CurrentDay } from "./types";

export const sortActionsByOrder = (actions: Action[]): Action[] => {
  const sortedActions = actions.slice().sort((a, b) => a.order - b.order);
  sortedActions.forEach((action, index) => {
    action.order = index;
  });
  return sortedActions;
}

export const sortDayActions = (day: CurrentDay): CurrentDay => {
  return {
    ...day,
    boons: sortActionsByOrder(day.boons),
    encounters: sortActionsByOrder(day.encounters),
    adventures: sortActionsByOrder(day.adventures),
  };
}