import { useMemo } from "react";
import { Action, ActionType } from "../types";
import ItemCard from "./ItemCard/ItemCard";
import Tooltip from "./Tooltip";
import { useCurrentDay } from "../CurrentDayContext";

type Props = {
  title: string
  type: ActionType
  description: string
  isEditable?: boolean
}

export default function Section({ title, type, description, isEditable = false }: Props) {
  const {
    currentDay,
    createAction,
    updateAction,
    deleteAction,
    reorderActionList,
  } = useCurrentDay();

  const actions = useMemo(() => {
    if (!currentDay) {
      return [];
    }
    return currentDay[type];
  }, [currentDay, type]);

  const onChange = (next: Action) => {
    updateAction(type, next);
  }

  const onDelete = (id: string) => {
    deleteAction(type, id);
  }

  const onReorder = (target: Action, direction: 'earlier' | 'later') => {
    reorderActionList(type, target, direction);
  }

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
          <ItemCard key={a.id} action={a} isEditable={isEditable} onChange={onChange} onDelete={onDelete} onReorder={onReorder} />
        ))}
        {isEditable && (
          <div className="item-card add-new" onClick={() => {
            createAction(type);
          }}>
            + Add New
          </div>
        )}
      </div>
    </section>
  )
}
