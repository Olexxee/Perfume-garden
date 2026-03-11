export type MenuCategory = "food" | "drink" | "room";

export interface MenuItemType {
  id: string;
  _id: string;
  name: string;
  price: number;
  category: MenuCategory;
}
