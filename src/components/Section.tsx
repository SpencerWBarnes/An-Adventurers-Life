import React from "react";
import { Action } from "../types";
import ItemCell from "./ItemCells/ItemCell";
import Tooltip from "./Tooltip";

type Props = {
  title: string
  description: string
  actions: Action[]
  isEditable?: boolean
  onUpdate: (actions: Action[]) => void
}

export default function Section({ title, description, actions, isEditable = false, onUpdate }: Props) {
  const updateAction = (next: Action) => {
    let nextList: Action[];
    // Delete action if it has no name
    if (next.label.trim() === "") {
      nextList = actions.filter((a) => a.id !== next.id);
    }
    // Otherwise update the action based on its id
    else {
      nextList = actions.map((a) => (a.id === next.id ? next : a));
    }
    onUpdate(nextList);
  };

  return (
    <section className="section">
      <header className="section-header">
        <h2>{title}</h2>
        <Tooltip content={description}>
          <button className="info" aria-label={`${title} info`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="16" r="0.75" fill="currentColor" />
            </svg>
          </button>
        </Tooltip>
      </header>

      <div className="grid">
        {actions.map((a) => (
          <ItemCell key={a.id} action={a} isEditable={isEditable} onChange={updateAction} />
        ))}
      </div>
    </section>
  )
}
