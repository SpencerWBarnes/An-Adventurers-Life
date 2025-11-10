import React from "react";
import { FOCUS_ICON, RECOVERY_ICON } from "../constants";

export type PillType = "focus" | "recovery";

type Props = {
  type: PillType;
  value: number;
};

export default function Pill({ type, value }: Props) {
  // hide when zero
  if (!value) {
    return null;
  }

  const negative = value < 0;
  const cls = `price-pill ${type} ${negative ? "negative" : ""}`.trim();

  const icon = type === "focus" ? FOCUS_ICON : RECOVERY_ICON;

  return (
    <span className={cls} aria-hidden={false}>
      <span className="pill-icon" aria-hidden>
        {icon}
      </span>
      <span className="pill-value">{value}</span>
    </span>
  );
}
