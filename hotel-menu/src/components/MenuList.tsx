import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import type { MenuItemType, MenuCategory } from "../types/menu";
import type { JSX } from "react";
import apiClient from "../services/apiClient";

interface MenuListProps {
  activeTab: MenuCategory;
}

const SECTION_DESCRIPTIONS: Record<MenuCategory, string> = {
  food: "Freshly prepared with the finest ingredients",
  drink: "Curated selection of beverages & cocktails",
  room: "Comfortable stays tailored to every occasion",
};

export default function MenuList({ activeTab }: MenuListProps): JSX.Element {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMenu = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data: MenuItemType[] = await apiClient("/api/menu");
        setMenuItems(data);
      } catch (err) {
        console.error("Failed to fetch menu", err);
        setError("Unable to load menu. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, []); // fetches once — all categories loaded, filtered client-side

  const filtered = menuItems.filter((item) => item.category === activeTab);

  return (
    <div>
      {/* Section header */}
      <div className="mb-6 text-center">
        <p
          className="text-sm uppercase tracking-widest"
          style={{ color: "rgba(138,96,32,0.6)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {SECTION_DESCRIPTIONS[activeTab]}
        </p>
      </div>

      <div
        className="rounded-2xl px-6 py-2"
        style={{
          background: "rgba(255,248,235,0.7)",
          border: "1px solid rgba(180,140,80,0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        {isLoading ? (
          <p
            className="py-10 text-center text-sm"
            style={{ color: "rgba(138,96,32,0.4)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Loading menu…
          </p>
        ) : error ? (
          <p
            className="py-10 text-center text-sm"
            style={{ color: "#e57373", fontFamily: "'DM Sans', sans-serif" }}
          >
            {error}
          </p>
        ) : filtered.length === 0 ? (
          <p
            className="py-10 text-center text-sm"
            style={{ color: "rgba(138,96,32,0.4)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Nothing here yet.
          </p>
        ) : (
          filtered.map((item, idx) => (
            <MenuItem key={item.id} item={item} index={idx} />
          ))
        )}
      </div>

      <p
        className="text-center mt-6 text-xs"
        style={{
          color: "rgba(138,96,32,0.4)",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
        }}
      >
        All prices in Nigerian Naira (₦) · Subject to change
      </p>
    </div>
  );
}