import { useState } from "react";
import Section from "./components/Section";
import Footer from "./components/Footer";
import LearnMoreDialog from "./components/Dialogs/LearnMoreDialog";
import { useCurrentDay } from "./CurrentDayContext";

export default function App() {
  const [learnOpen, setLearnOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const {
    isLoading
  } = useCurrentDay();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

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
          type="boons"
          description="Spend coins on fun or relaxing boons."
          isEditable={editing}
        />

        <Section
          title="Encounters"
          type="encounters"
          description="Earn coins by completing tasks."
          isEditable={editing}
        />

        <Section
          title="Adventures"
          type="adventures"
          description="Earn coins by working towards bigger goals. Each 45 minute span spent on an adventure counts as one completion."
          isEditable={editing}
        />
      </main>
      
      <Footer />
    </div>
  )
}
