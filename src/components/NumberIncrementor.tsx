import React from "react";

type Props = {
  value: number,
  onChange: (next: number) => void,
  min?: number,
  step?: number,
  disabled?: boolean,
  ariaLabel?: string,
}

export default function NumberIncrementor({
  value,
  onChange,
  min = Number.NEGATIVE_INFINITY,
  step = 1,
  disabled = false,
  ariaLabel = "number input",
}: Props) {
  const set = (next: number) => {
    if (isNaN(next)) return;
    const clamped = Math.max(min, next);
    onChange(clamped);
  };

  const dec = () => set(value - step);
  const inc = () => set(value + step);

  return (
    <div className="number-incrementor" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className="ni-button ni-decrement"
        onClick={dec}
        disabled={disabled || value - step < min}
        aria-label="decrement"
      >
        −
      </button>

      <input
        className="ni-input"
        inputMode="numeric"
        value={String(value)}
        onChange={(e) => set(Number(e.target.value))}
        disabled={disabled}
        aria-label="value"
      />

      <button
        type="button"
        className="ni-button ni-increment"
        onClick={inc}
        disabled={disabled}
        aria-label="increment"
      >
        +
      </button>
    </div>
  );
}
