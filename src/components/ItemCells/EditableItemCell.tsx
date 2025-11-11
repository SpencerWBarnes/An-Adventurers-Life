import React from "react";
import { Action } from "../../types";
import EditablePill from "../EditablePill";

type Props = {
  action: Action;
  onChange: (next: Action) => void;
};

export default function EditableItemCell({ action, onChange }: Props) {
  const { focus, recovery } = action.price;

  const setLabel = (nextLabel: string) => {
    onChange({ ...action, label: nextLabel });
  };

  const setFocusPrice = (v: number) => {
    onChange({ ...action, price: { ...action.price, focus: v } });
  };

  const setRecoveryPrice = (v: number) => {
    onChange({ ...action, price: { ...action.price, recovery: v } });
  };

  const toggleFavorite = () => {
    onChange({ ...action, isFavorite: !action.isFavorite });
  };

  const handleDelete = () => {
    // Removing the label indicates to the list updater that the item should be deleted.
    onChange({ ...action, label: "" });
  };

  return (
    <div className={`item-cell ${action.isFavorite ? "favorite" : ""}`}>
      <div className="item-toolbar">
        <button
          type="button"
          className={`fav-btn ${action.isFavorite ? "fav-on" : ""}`}
          onClick={toggleFavorite}
          aria-pressed={!!action.isFavorite}
          aria-label="Favorite"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.76L5.82 21z" />
          </svg>
          <span className="fav-label">Favorite</span>
        </button>

        <button type="button" className="trash-btn" onClick={handleDelete} aria-label="Delete">
          ❌
        </button>
      </div>

      <div className="label">
        <input value={action.label} onChange={(e) => setLabel(e.target.value)} />
      </div>

      <div className="price-row">
        <div className="price-values">
          <EditablePill type="focus" value={focus} onChange={setFocusPrice} />
          <EditablePill type="recovery" value={recovery} onChange={setRecoveryPrice} />
        </div>
      </div>
    </div>
  );
}
