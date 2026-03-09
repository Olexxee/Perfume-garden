import type { MenuCategory } from "../types/menu";
import { type JSX } from "react";

interface TabsProps {
  activeTab: MenuCategory;
  setActiveTab: (tab: MenuCategory) => void;
}

export default function Tabs({
  activeTab,
  setActiveTab,
}: TabsProps): JSX.Element {
  const tabs: MenuCategory[] = ["food", "drink", "room"];

  return (
    <div className="flex justify-center gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg capitalize ${activeTab === tab ? "bg-yellow-500 text-black" : "bg-gray-700"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}