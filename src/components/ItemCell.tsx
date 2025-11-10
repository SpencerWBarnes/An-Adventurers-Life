import React from "react";
import { Action } from "../types";
import Pill from "./Pill";

type Props = {
  action: Action
  onChange: (next: Action) => void
}

export default function ItemCell({ action, onChange }: Props) {
  const { focus, recovery } = action.price

  const count = action.count ?? 0

  const changeCount = (delta: number) => {
    const next = Math.max(0, count + delta);
    onChange({ ...action, count: next });
  };

  const setCount = (n: number) => {
    const next = Math.max(0, Math.floor(n || 0));
    onChange({ ...action, count: next });
  };

  return (
    <div className={`item-cell ${action.isHighPriority ? "high-priority" : ""}`}>
      <div className="controls">
        <div className="control-group count-group">
          <button aria-label={`decrease-count-${action.id}`} onClick={() => changeCount(-1)}>-</button>
          <input
            aria-label={`count-${action.id}`}
            type="number"
            value={count}
            min={0}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <button aria-label={`increase-count-${action.id}`} onClick={() => changeCount(1)}>+</button>
        </div>
      </div>

      <div className="label">{action.label}</div>

      <div className="price-row" aria-hidden={focus === 0 && recovery === 0}>
        <div className="price-values">
          <Pill type="focus" value={focus} />
          <Pill type="recovery" value={recovery} />
        </div>
      </div>
    </div>
  )
}