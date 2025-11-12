import React, { useState, useEffect } from "react";
import { loadCurrentDay, saveCurrentDay } from "./storage";
import { CurrentDay, Action } from "./types";
import Section from "./components/Section";
import Footer from "./components/Footer";
import LearnMoreDialog from "./components/Dialogs/LearnMoreDialog";
import { sortActionsByOrder } from "./helpers";

export default function App() {
  const [data, setData] = useState<CurrentDay | null>(null)
  const [learnOpen, setLearnOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loaded = loadCurrentDay();
    setData(loaded);
  }, [])

  useEffect(() => {
    if (data) {
      saveCurrentDay(data);
    }
  }, [data]);

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  // Recompute currentDayGain and currentDayLoss based on action counts and prices
  const recomputeFromActions = (currentDay: CurrentDay): CurrentDay => {
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

    [...currentDay.boons, ...currentDay.encounters, ...currentDay.adventures].forEach((a) => {
      accumulate(a);
    });

    return {
      ...currentDay,
      adventurer: {
        ...currentDay.adventurer,
        currentDayGain: gain,
        currentDayLoss: loss
      }
    };
  };

  const updateList = (key: "boons" | "encounters" | "adventures") => (next: Action[]) => {
    setData((prev) => {
      if (!prev) {
        return prev;
      }

      const nextData: CurrentDay = { ...prev, [key]: sortActionsByOrder(next) };
      return recomputeFromActions(nextData);
    });
  };

  const updatePlayer = (nextPlayer: typeof data.adventurer) => {
    setData((prev) => {
      if (!prev) {
        return prev;
      }

      return { ...prev, adventurer: nextPlayer };
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="title-row">
          <h1>An Adventurer's Life for Me</h1>
          <button
          className={`edit-button ${editing ? "editing" : ""}`}
              aria-label="Edit task lists"
              onClick={() => {
                setEditing(!editing);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 21v-3l11-11 3 3L7 21H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                <path d="M14 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>
        <p className="subtitle">Gamify your todos. <button className="learn-more" onClick={() => setLearnOpen(true)}>Learn more</button></p>
      </header>

      <LearnMoreDialog open={learnOpen} onClose={() => setLearnOpen(false)} />

      <main>
        <Section
          title="Daniel Boon's Shop"
          description="Spend coins on fun or relaxing boons."
          actions={data.boons}
          isEditable={editing}
          onUpdate={updateList("boons")}
        />

        <Section
          title="Encounters"
          description="Earn coins by completing tasks."
          actions={data.encounters}
          isEditable={editing}
          onUpdate={updateList("encounters")}
        />

        <Section
          title="Adventures"
          description="Earn coins by working towards bigger goals. Each 45 minute span spent on an adventure counts as one completion."
          actions={data.adventures}
          isEditable={editing}
          onUpdate={updateList("adventures")}
        />
      </main>
      
      <Footer player={data.adventurer} onUpdatePlayer={updatePlayer} />
    </div>
  )
}
