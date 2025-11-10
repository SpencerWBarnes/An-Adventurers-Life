import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";
import { Player } from "../../types";
import { FOCUS_ICON, RECOVERY_ICON } from "../../constants";

type Props = {
  open: boolean;
  onClose: () => void;
  player: Player;
  onSave: (next: Player) => void;
  saveLabel?: string;
  cancelLabel?: string;
};

export default function EditPlayerDialog({ open, onClose, player, onSave, saveLabel = "Save", cancelLabel = "Cancel" }: Props) {
  const [draft, setDraft] = useState({ name: player.name, focus: player.startOfDayCoin.focus, recovery: player.startOfDayCoin.recovery });

  useEffect(() => {
    if (open) {
      setDraft({ name: player.name, focus: player.startOfDayCoin.focus, recovery: player.startOfDayCoin.recovery });
    }
  }, [open, player]);

  const doSave = () => {
    const next: Player = {
      ...player,
      name: draft.name,
      startOfDayCoin: { focus: Number(draft.focus), recovery: Number(draft.recovery) }
    };
    onSave(next);
  };

  return (
    <Dialog open={open} onClose={onClose} onSave={doSave} title="Update Adventurer" saveLabel={saveLabel} cancelLabel={cancelLabel}>
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
  );
}
