import { Action } from "../../types";
import ReadonlyItemCell from "./ReadonlyItemCell";
import EditableItemCell from "./EditableItemCell";

type Props = {
  action: Action;
  onChange: (next: Action) => void;
  onDelete: (id: string) => void;
  onReorder: (target: Action, direction: 'earlier' | 'later') => void;
  /** when true render the editable version */
  isEditable?: boolean;
};

export default function ItemCell({ action, onChange, onDelete, onReorder, isEditable = false }: Props) {
  if (isEditable) {
    return <EditableItemCell action={action} onChange={onChange} onDelete={onDelete} onReorder={onReorder} />;
  }

  return <ReadonlyItemCell action={action} onChange={onChange} />;
}