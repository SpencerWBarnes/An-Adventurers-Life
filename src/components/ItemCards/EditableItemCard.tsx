import { Action } from "../../types";
import EditablePill from "../EditablePill";
import FavoriteIcon from "../Icons/FavoriteIcon";

type Props = {
  action: Action;
  onChange: (next: Action) => void;
  onDelete: (id: string) => void;
  onReorder: (target: Action, direction: 'earlier' | 'later') => void;
};

export default function EditableItemCard({ action, onChange, onDelete, onReorder }: Props) {
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

  return (
    <div className={`item-card ${action.isFavorite ? "favorite" : "standard"}`}>
      <div className="item-toolbar">
        <button
          type="button"
          className={`fav-btn ${action.isFavorite ? "fav-on" : ""}`}
          onClick={toggleFavorite}
          aria-pressed={!!action.isFavorite}
          aria-label="Favorite"
        >
          <FavoriteIcon />
          <span className="fav-label">Favorite</span>
        </button>

        <button type="button" className="trash-btn" onClick={() => onDelete(action.id)} aria-label="Delete">
          ❌
        </button>
      </div>

      <div className="price-row">
        <EditablePill type="focus" value={focus} onChange={setFocusPrice} />
        <EditablePill type="recovery" value={recovery} onChange={setRecoveryPrice} />
      </div>
      
      <div className="label">
        <input value={action.label} placeholder="🗡️Action name" onChange={(e) => setLabel(e.target.value)} />
      </div>

      <div className="item-toolbar">
        <button
        type="button"
        onClick={() => onReorder(action, "earlier")}
        aria-label="decrement"
      >
        ▲
      </button>
      <button
        type="button"
        onClick={() => onReorder(action, "later")}
        aria-label="increment"
      >
        ▼
      </button>
      </div>
    </div>
  );
}
