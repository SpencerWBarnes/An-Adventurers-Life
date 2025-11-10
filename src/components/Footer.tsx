import React, { useState } from "react";
import { Player } from "../types";
import { FOCUS_ICON, RECOVERY_ICON } from "../constants";
import Dialog from "./Dialog";

type Props = { player: Player; onUpdatePlayer?: (p: Player) => void }

function format(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n}`;
}

export default function Footer({ player, onUpdatePlayer }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: player.name, focus: player.startOfDayCoin.focus, recovery: player.startOfDayCoin.recovery });

  const start = player.startOfDayCoin;
  const gain = player.currentDayGain;
  const loss = player.currentDayLoss;

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
            className="edit-player"
            aria-label="Edit player"
            onClick={() => {
              setDraft({ name: player.name, focus: player.startOfDayCoin.focus, recovery: player.startOfDayCoin.recovery });
              setEditing(true);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3 21v-3l11-11 3 3L7 21H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M14 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </svg>
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
          ▾
        </button>
      </div>

      <Dialog
        open={editing}
        title="Update Adventurer"
        onClose={() => setEditing(false)}
        onSave={() => {
          const next: Player = {
            ...player,
            name: draft.name,
            startOfDayCoin: { focus: Number(draft.focus), recovery: Number(draft.recovery) },
          };

          if (onUpdatePlayer) {
            onUpdatePlayer(next);
          }

          setEditing(false);
        }}
        saveLabel="Save"
        cancelLabel="Cancel"
      >
        <label>
          Name
          <input value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
        </label>
        <label>
          Balance of {FOCUS_ICON} at start of day
          <input type="number" value={draft.focus} onChange={(e) => setDraft((d) => ({ ...d, focus: Number(e.target.value) }))} />
        </label>
        <label>
          Balance of {RECOVERY_ICON} at start of day
          <input type="number" value={draft.recovery} onChange={(e) => setDraft((d) => ({ ...d, recovery: Number(e.target.value) }))} />
        </label>
      </Dialog>

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
