import type { JSX } from "react";
import type { MenuItemType } from "../types/menu";

interface MenuItemProps {
  item: MenuItemType;
  index: number;
}

export default function MenuItem({ item, index }: MenuItemProps): JSX.Element {
  return (
    <div
      className="group flex justify-between items-center py-4 px-2 transition-all duration-200"
      style={{
        borderBottom: "1px solid rgba(180,140,80,0.15)",
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Left: dot + name */}
      <div className="flex items-center gap-3">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
          style={{
            background: "rgba(180,140,80,0.4)",
          }}
        />
        <span
          className="text-base transition-colors duration-200"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            color: "#3a2e1e",
            letterSpacing: "0.01em",
          }}
        >
          {item.name}
        </span>
      </div>

      {/* Right: dashed line + price */}
      <div className="flex items-center gap-3 ml-4">
        <span
          className="flex-1 hidden sm:block"
          style={{
            borderBottom: "1px dashed rgba(180,140,80,0.25)",
            minWidth: "40px",
            width: "80px",
          }}
        />
        <span
          className="font-semibold whitespace-nowrap"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            color: "#8a6020",
            letterSpacing: "0.03em",
          }}
        >
          ₦{item.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}