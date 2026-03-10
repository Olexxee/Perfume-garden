import type { MenuCategory } from "../types/menu";
import { type JSX } from "react";

interface TabsProps {
  activeTab: MenuCategory;
  setActiveTab: (tab: MenuCategory) => void;
}

const TAB_LABELS: Record<MenuCategory, { label: string; icon: string }> = {
  food: { label: "Food", icon: "🍽" },
  drink: { label: "Drinks", icon: "🥂" },
  room: { label: "Rooms", icon: "🛏" },
};

export default function Tabs({ activeTab, setActiveTab }: TabsProps): JSX.Element {
  const tabs: MenuCategory[] = ["food", "drink", "room"];

  return (
    <div className="flex justify-center mb-10 px-4">
      {/* 
        - On mobile: stretches full width so each tab gets equal space 
        - On sm+: auto width, tabs size to their content 
      */}
      <div
        className="flex w-full sm:w-auto gap-1 p-1 rounded-2xl"
        style={{
          background: "rgba(180,140,80,0.08)",
          border: "1px solid rgba(180,140,80,0.2)",
        }}
      >
        {tabs.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              // flex-1 on mobile makes all 3 tabs share equal width
              // sm:flex-none lets them size naturally on larger screens
              className="flex-1 sm:flex-none relative rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: active
                  ? "linear-gradient(135deg, #c9a84c, #a8732e)"
                  : "transparent",
                color: active ? "#1a1206" : "#a08050",
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.04em",
                boxShadow: active ? "0 2px 16px rgba(180,130,40,0.25)" : "none",
                // Fluid padding: tighter on mobile, roomier on desktop
                padding: "10px clamp(12px, 4vw, 24px)",
                fontSize: "clamp(0.82rem, 3vw, 1rem)",
              }}
            >
              <span style={{ fontSize: "0.85em", lineHeight: 1 }}>
                {TAB_LABELS[tab].icon}
              </span>
              {TAB_LABELS[tab].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}