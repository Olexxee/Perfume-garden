import MenuItem from "./MenuItem";
import type { MenuItemType, MenuCategory } from "../types/menu";
import type { JSX } from "react";

interface MenuListProps {
  activeTab: MenuCategory;
}

const dummyMenu: MenuItemType[] = [
  { id: 1, name: "Fried Rice", price: 4500, category: "food" },
  { id: 2, name: "Pepper Soup", price: 3000, category: "food" },

  { id: 3, name: "Heineken", price: 1500, category: "drink" },
  { id: 4, name: "Guinness", price: 1200, category: "drink" },

  { id: 5, name: "Standard Room", price: 25000, category: "room" },
  { id: 6, name: "Deluxe Room", price: 40000, category: "room" },
];

export default function MenuList({
  activeTab,
}: MenuListProps): JSX.Element {
  const filtered = dummyMenu.filter(
    (item) => item.category === activeTab
  );

  return (
    <div>
      {filtered.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}