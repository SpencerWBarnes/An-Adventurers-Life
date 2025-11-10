import React, { useState, useEffect } from "react";
import { loadCurrentDay, saveCurrentDay } from "./storage";
import { CurrentDay, Action } from "./types";
import Section from "./components/Section";
import Footer from "./components/Footer";
import LearnMoreDialog from "./components/Dialogs/LearnMoreDialog";

export default function App() {
  const [data, setData] = useState<CurrentDay | null>(null)
  const [learnOpen, setLearnOpen] = useState(false);

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

      const nextData: CurrentDay = { ...prev, [key]: next };
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
        <h1>An Adventurer's Life for Me</h1>
        <p className="subtitle">Gamify your todos. <button className="learn-more" onClick={() => setLearnOpen(true)}>Learn more</button></p>
      </header>

  <LearnMoreDialog open={learnOpen} onClose={() => setLearnOpen(false)} />

      <main>
        <Section
          title="Daniel Boon's Shop"
          description="Spend coins on fun or relaxing boons."
          actions={data.boons}
          onUpdate={updateList("boons")}
        />

        <Section
          title="Encounters"
          description="Gain coin by completing tasks and encounters."
          actions={data.encounters}
          onUpdate={updateList("encounters")}
        />

        <Section
          title="Adventures"
          description="Gain coin by working towards bigger commitments and quests. Each 45 minute span spent on an adventure counts as one completed action."
          actions={data.adventures}
          onUpdate={updateList("adventures")}
        />
      </main>
      
        <Footer player={data.adventurer} onUpdatePlayer={updatePlayer} />
    </div>
  )
}
