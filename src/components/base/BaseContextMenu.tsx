import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ContextMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

interface BaseContextMenuProps {
  open: boolean;
  position: { x: number; y: number } | null;
  onClose: () => void;
  items: ContextMenuItem[];
}

export const BaseContextMenu: React.FC<BaseContextMenuProps> = ({
  open,
  position,
  onClose,
  items,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open || !position) return null;

  return ReactDOM.createPortal(
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        background: "white",
        border: "1px solid #ccc",
        borderRadius: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 2000,
        minWidth: 160,
        padding: 4,
      }}
    >
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={() => {
            if (!item.disabled) {
              item.onClick();
              onClose();
            }
          }}
          disabled={item.disabled}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            textAlign: "left",
            background: "none",
            border: "none",
            padding: "8px 12px",
            cursor: item.disabled ? "default" : "pointer",
            fontSize: 14,
            color: item.disabled
              ? "#9ca3af" // gray-400 for disabled
              : item.danger
                ? "#dc2626" // red-600 for danger
                : "#222",
            fontWeight: item.danger ? 600 : 400,
            gap: 8,
            opacity: item.disabled ? 0.5 : 1,
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {item.icon && (
            <span
              style={{
                display: "inline-flex",
                color: item.disabled
                  ? "#9ca3af"
                  : item.danger
                    ? "#dc2626"
                    : undefined,
              }}
            >
              {item.icon}
            </span>
          )}
          {item.label}
        </button>
      ))}
    </div>,
    document.body,
  );
};
