import { FOCUS_ICON, RECOVERY_ICON } from "../constants";
import { PillType } from "./Pill";
import NumberIncrementor from "./NumberIncrementor";

type EditableProps = {
  type: PillType;
  value: number;
  onChange: (next: number) => void;
};

export default function EditablePill({ type, value, onChange }: EditableProps) {
  const negative = value < 0;
  const cls = `price-pill ${type} ${negative ? "negative" : ""}`.trim();

  const icon = type === "focus" ? FOCUS_ICON : RECOVERY_ICON;



  return (
    <span className={cls} aria-hidden={false}>
      <span className="pill-icon" aria-hidden>
        {icon}
      </span>
      <span className="pill-value">
        <NumberIncrementor value={value} onChange={onChange} step={1} ariaLabel={`${type}-value`} />
      </span>
    </span>
  );
}
