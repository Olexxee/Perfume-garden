import type { JSX } from "react";
import type { MenuItemType } from "../types/menu";

interface MenuItemProps {
  item: MenuItemType;
}

export default function MenuItem({
  item,
}: MenuItemProps): JSX.Element {
  return (
    <div className="flex justify-between border-b border-gray-700 py-3 text-lg">
      <span>{item.name}</span>

      <span className="font-semibold">
        ₦{item.price.toLocaleString()}
      </span>
    </div>
  );
}