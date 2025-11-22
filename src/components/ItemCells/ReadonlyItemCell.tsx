import { Action } from "../../types";
import Pill from "../Pill";
import NumberIncrementor from "../NumberIncrementor";

type Props = {
  action: Action;
  onChange: (next: Action) => void;
};

export default function ReadonlyItemCell({ action, onChange }: Props) {
  const { focus, recovery } = action.price;

  const count = action.count ?? 0;

  const setCount = (n: number) => {
    const next = Math.max(0, Math.floor(n || 0));
    onChange({ ...action, count: next });
  };

  return (
    <div className={`item-cell ${action.isFavorite ? "favorite" : "standard"}`}>
      <div className="controls">
        <NumberIncrementor
          value={count}
          onChange={setCount}
          min={0}
          step={1}
          ariaLabel={`count-${action.id}`}
        />
      </div>

      <div className="label">{action.label}</div>

      <div className="price-row" aria-hidden={focus === 0 && recovery === 0}>
        <div className="price-values">
          <Pill type="focus" value={focus} />
          <Pill type="recovery" value={recovery} />
        </div>
      </div>
    </div>
  );
}
