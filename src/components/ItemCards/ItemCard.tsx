import { Action } from "../../types";
import ReadonlyItemCard from "./ReadonlyItemCard";
import EditableItemCard from "./EditableItemCard";

type Props = {
  action: Action;
  onChange: (next: Action) => void;
  onDelete: (id: string) => void;
  onReorder: (target: Action, direction: 'earlier' | 'later') => void;
  /** when true render the editable version */
  isEditable?: boolean;
};

export default function ItemCard({ action, onChange, onDelete, onReorder, isEditable = false }: Props) {
  if (isEditable) {
    return <EditableItemCard action={action} onChange={onChange} onDelete={onDelete} onReorder={onReorder} />;
  }

  return <ReadonlyItemCard action={action} onChange={onChange} />;
}