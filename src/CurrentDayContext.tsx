import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Action, ActionType, CurrentDay, Player } from "./types";
import { loadCurrentDay, saveCurrentDay } from "./storage";
import { cashOutDay, isNewDay, recalculateBalances } from "./helpers";
import { EMPTY_CURRENCY } from "./constants";

interface CurrentDayContextType {
  currentDay: CurrentDay | undefined;
  createAction: (type: ActionType) => Action[];
  deleteAction: (type: ActionType, id: string) => Action[];
  updateAction: (type: ActionType, updatedAction: Action) => Action[];
  updatePlayer: (player: Player) => Player;
  reorderActionList: (type: ActionType, updatedAction: Action, direction: 'earlier' | 'later') => Action[];
  isLoading: boolean;
}

const CurrentDayContext = createContext<CurrentDayContextType | undefined>(undefined);

export const CurrentDayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDay, setCurrentDay] = useState<CurrentDay | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const loadedDay = loadCurrentDay();
    // Cash out if it's a new day
    if (isNewDay(loadedDay.todayLocal)) {
      updateCurrentDay(cashOutDay(loadedDay));
    }
    else {
      setCurrentDay(loadedDay);
    }
    setIsLoading(false);
  }, []);

  // Every time currentDay changes: check for new day
  useEffect(() => {
    if (currentDay) {
      // If it's a new day, cash out the previous day
      if (isNewDay(currentDay.todayLocal)) {
        const cashedOutDay = cashOutDay(currentDay);
        saveCurrentDay(cashedOutDay);
      }
    }
  }, [currentDay]);

  /**
   * Update current day data in state and storage
   * @param updatedDay 
   * @returns Most recent saved current day data
   */
  const updateCurrentDay = (updatedDay: CurrentDay): CurrentDay => {
    const savedDay = saveCurrentDay(updatedDay);
    setCurrentDay(savedDay);
    return savedDay;
  }

  /**
   * Create a new action at the end of the specified action list
   * @param type Action list to add to
   * @returns The modified action list
   */
  const createAction = (type: ActionType): Action[] => {
    if (!currentDay) {
      console.error("Current day data is not loaded");
      throw new Error("Current day data is not loaded");
    }
    const newAction: Action = {
      id: crypto.randomUUID(),
      label: "New Item",
      price: EMPTY_CURRENCY(),
      count: 0,
      isFavorite: false,
      order: 0,
    };
    // Add to the end of the specified list 
    switch (type) {
      case 'boons':
        newAction.order = currentDay.boons.length;
        currentDay.boons.push(newAction);
        break;
      case 'encounters':
        newAction.order = currentDay.encounters.length;
        currentDay.encounters.push(newAction);
        break;
      case 'adventures':
        newAction.order = currentDay.adventures.length;
        currentDay.adventures.push(newAction);
        break;
    }
    // Save the change and return the updated list
    return updateCurrentDay(currentDay)[type];
  }

  /**
   * Delete an action from the specified action list
   * @param type Action list to delete from
   * @param id Action to be deleted
   * @returns The modified action list
   */
  const deleteAction = (type: ActionType, id: string): Action[] => {
    if (!currentDay) {
      console.error("Current day data is not loaded");
      throw new Error("Current day data is not loaded");
    }
    // Remove from the specified list
    switch (type) {
      case 'boons':
        currentDay.boons = currentDay.boons.filter(a => a.id !== id);
        break;
      case 'encounters':
        currentDay.encounters = currentDay.encounters.filter(a => a.id !== id);
        break;
      case 'adventures':
        currentDay.adventures = currentDay.adventures.filter(a => a.id !== id);
        break;
    }
    // Save the change and return the updated list
    return updateCurrentDay(currentDay)[type];
  }

  /**
   * Replace an action in the specified action list by id
   * @param type Action list to update
   * @param updatedAction New action state
   * @returns The modified action list
   */
  const updateAction = (type: ActionType, updatedAction: Action): Action[] => {
    if (!currentDay) {
      console.error("Current day data is not loaded");
      throw new Error("Current day data is not loaded");
    }
    // Update in the specified list
    switch (type) {
      case 'boons':
        currentDay.boons = currentDay.boons.map(a => a.id === updatedAction.id ? updatedAction : a);
        break;
      case 'encounters':
        currentDay.encounters = currentDay.encounters.map(a => a.id === updatedAction.id ? updatedAction : a);
        break;
      case 'adventures':
        currentDay.adventures = currentDay.adventures.map(a => a.id === updatedAction.id ? updatedAction : a);
        break;
    }
    // Recalculate balances after updating any actions
    const recalculatedBalances = recalculateBalances(currentDay);
    // Save the change and return the updated list
    return updateCurrentDay(recalculatedBalances)[type];
  }

  /**
   * Replace the current player data
   * @param player 
   * @returns 
   */
  const updatePlayer = (player: Player): Player => {
    if (!currentDay) {
      console.error("Current day data is not loaded");
      throw new Error("Current day data is not loaded");
    }
    currentDay.adventurer = player;
    return updateCurrentDay(currentDay).adventurer;
  }

  /**
   * Move an action one position earlier or later in the specified action list, swapping positions with the action currently there
   * @param type Action list to be modified
   * @param updatedAction Action being moved
   * @param direction Earlier to be moved towards the beginning of the list (lower index),
   * later to be moved towards the end of the list (higher index)
   * @returns The modified list, no change if attempting to move out of bounds
   */
  const reorderActionList = (type: ActionType, updatedAction: Action, direction: 'earlier' | 'later'): Action[] => {
    if (!currentDay) {
      console.error("Current day data is not loaded");
      throw new Error("Current day data is not loaded");
    }
    const list = currentDay[type];
    const index = list.findIndex(a => a.id === updatedAction.id);
    if (index === -1) {
      console.error("Action not found in the list");
      throw new Error("Action not found in the list");
    }
    let newIndex = direction === 'earlier' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= list.length) {
      // Out of bounds, no change
      return list;
    }
    // Swap order values between two actions
    const targetAction = list[newIndex];
    const tempOrder = updatedAction.order;
    updatedAction.order = targetAction.order;
    targetAction.order = tempOrder;
    list[index] = targetAction;
    list[newIndex] = updatedAction;
    // Save the change and return the updated list
    return updateCurrentDay(currentDay)[type];
  }

  return (
    <CurrentDayContext.Provider
      value={{
        currentDay,
        createAction,
        deleteAction,
        updateAction,
        updatePlayer,
        reorderActionList,
        isLoading
      }}
    >
      {children}
    </CurrentDayContext.Provider>
  );
};

export const useCurrentDay = () => {
  const context = useContext(CurrentDayContext);
  if (!context) {
    console.error("useCurrentDay must be used within CurrentDayProvider");
    throw new Error('useCurrentDay must be used within CurrentDayProvider');
  }
  return context;
};