import { useMemo, useState } from "react";
import { EMPTY_CURRENCY, FOCUS_ICON, RECOVERY_ICON } from "../constants";
import EditPlayerDialog from "./Dialogs/EditPlayerDialog";
import { useCurrentDay } from "../CurrentDayContext";
import { EXAMPLE_PLAYER } from "../exampleData";
import EditIcon from "./Icons/EditIcon";

function format(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n}`;
}

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const {
    currentDay,
    updatePlayer,
  } = useCurrentDay();

  const player = useMemo(() => {
    if (!currentDay) {
      return EXAMPLE_PLAYER();
    }
    return currentDay.adventurer;
  }, [currentDay]);
  const start = player?.startOfDayCoin ?? EMPTY_CURRENCY();
  const gain = player?.currentDayGain ?? EMPTY_CURRENCY();
  const loss = player?.currentDayLoss ?? EMPTY_CURRENCY();

  const net = {
    focus: start.focus + gain.focus + loss.focus,
    recovery: start.recovery + gain.recovery + loss.recovery,
  };

  return (
    <div className={`footer ${open ? "footer-open" : ""}`}>
      <div className="footer-row">
        <div className="player-name">
          {player.name}
          <button
            className="edit-button"
            aria-label="Edit player"
            onClick={() => {
              setEditing(true);
            }}
          >
            <EditIcon />
          </button>
        </div>
        <div className="player-net">
          <span className="net-focus big">{FOCUS_ICON}{format(net.focus)}</span>
          <span className="net-recovery big">{RECOVERY_ICON}{format(net.recovery)}</span>
        </div>
        <button
          className={`chev ${open ? "open" : ""}`}
          aria-expanded={open}
          aria-label={open ? "Collapse details" : "Expand details"}
          onClick={() => setOpen((s) => !s)}
        >
          ▼
        </button>
      </div>

      <EditPlayerDialog
        open={editing}
        onClose={() => setEditing(false)}
        player={player}
        onSave={(next) => {
          updatePlayer(next);
          setEditing(false);
        }}
        saveLabel="Save"
        cancelLabel="Cancel"
      />

      <div className="footer-details" aria-hidden={!open}>
        <div className="detail-col">
          <div className="detail-title">Start of day</div>
          <div>{FOCUS_ICON}{format(start.focus)}</div>
          <div>{RECOVERY_ICON}{format(start.recovery)}</div>
        </div>

        <div className="detail-col">
          <div className="detail-title">Gained</div>
          <div className="gain">{FOCUS_ICON} {format(gain.focus)}</div>
          <div className="gain">{RECOVERY_ICON} {format(gain.recovery)}</div>
        </div>

        <div className="detail-col">
          <div className="detail-title">Lost</div>
          <div className="loss">{FOCUS_ICON} {format(loss.focus)}</div>
          <div className="loss">{RECOVERY_ICON} {format(loss.recovery)}</div>
        </div>

        <div className="detail-col detail-net">
          <div className="detail-title">Net</div>
          <div className="net-focus big">{FOCUS_ICON}{format(net.focus)}</div>
          <div className="net-recovery big">{RECOVERY_ICON}{format(net.recovery)}</div>
        </div>
      </div>
    </div>
  )
}
