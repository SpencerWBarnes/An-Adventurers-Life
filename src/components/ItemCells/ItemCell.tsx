import React from "react";
import { Action } from "../../types";
import ReadonlyItemCell from "./ReadonlyItemCell";
import EditableItemCell from "./EditableItemCell";

type Props = {
  action: Action;
  onChange: (next: Action) => void;
  /** when true render the editable version */
  isEditable?: boolean;
};

export default function ItemCell({ action, onChange, isEditable = false }: Props) {
  if (isEditable) {
    return <EditableItemCell action={action} onChange={onChange} />;
  }

  return <ReadonlyItemCell action={action} onChange={onChange} />;
}