import { useMemo } from "react";
import { Action, ActionType } from "../types";
import ItemCard from "./ItemCards/ItemCard";
import Tooltip from "./Tooltip";
import { useCurrentDay } from "../CurrentDayContext";
import InformationIcon from "./Icons/InformationIcon";

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
            <InformationIcon />
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
