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
    const original = actions.find((a) => a.id === next.id);
    // Clamp orders to the list bounds, so it matches list indexes
    if (next.order < 0) {
      next.order = 0;
    }
    if (next.order >= actions.length) {
      next.order = actions.length - 1;
    }

    // Delete action if it has no name
    if (next.label.trim() === "") {
      nextList = actions.filter((a) => a.id !== next.id);
    }
    else if (original?.order === next.order) {
      // No change in order, just update
      nextList = actions.map((a) => (a.id === next.id ? next : a));
    }
    else {
      // Swapping orders
      const swapPartner = actions.find((a) => a.order === next.order && a.id !== next.id);
      swapPartner!.order = original!.order;
      nextList = actions.map((a) => (a.id === next.id ? next : a.id === swapPartner!.id ? swapPartner! : a));
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
        {isEditable && (
          <div className="item-cell add-new" onClick={() => {
            const newAction: Action = {
              id: crypto.randomUUID(),
              label: "New Item",
              price: { focus: 0, recovery: 0 },
              count: 0,
              isFavorite: false,
              order: actions.length,
            };
            onUpdate([...actions, newAction]);
          }}>
            + Add New
          </div>
        )}
      </div>
    </section>
  )
}
