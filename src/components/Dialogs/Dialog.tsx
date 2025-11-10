import React, { useEffect } from "react";

type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  children?: React.ReactNode;
};

export default function Dialog({ title, open, onClose, onSave, saveLabel, cancelLabel, children }: Props) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const onBackdropClick = (e: React.MouseEvent) => {
    // only close when clicking the backdrop itself
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-backdrop" onClick={onBackdropClick}>
      <div className="dialog" role="dialog" aria-modal="true" aria-label={title || "Dialog"}>
        <button className="dialog-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        {title && <h3 className="dialog-title">{title}</h3>}
        <div className="dialog-body">{children}</div>
        <div className="dialog-actions">
          {saveLabel && onSave && (
            <button className="save-btn" onClick={onSave}>{saveLabel}</button>
          )}
          {cancelLabel && (
            <button className="cancel-btn" onClick={onClose}>{cancelLabel}</button>
          )}
        </div>
      </div>
    </div>
  );
}
