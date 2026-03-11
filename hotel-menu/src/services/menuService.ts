// src/services/menuService.ts
import apiClient from "./apiClient";
import type { MenuItemType } from "../types/menu";

// MongoDB returns _id — normalize it to id for the frontend
const normalize = (item: any): MenuItemType => ({
  ...item,
  id: item._id ?? item.id,
});

/* ---------- FETCH MENU (PUBLIC) ---------- */
export const fetchMenu = async (): Promise<MenuItemType[]> => {
  const data = await apiClient("/menu");
  return data.map(normalize);
};

/* ---------- CREATE MENU ITEM (ADMIN) ---------- */
export const createMenuItem = async (
  data: Omit<MenuItemType, "id">
): Promise<MenuItemType> => {
  const item = await apiClient("/menu", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return normalize(item);
};

/* ---------- UPDATE MENU ITEM (ADMIN) ---------- */
export const updateMenuItem = async (
  id: string,
  data: Partial<MenuItemType>
): Promise<MenuItemType> => {
  const item = await apiClient(`/menu/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return normalize(item);
};

/* ---------- DELETE MENU ITEM (ADMIN) ---------- */
export const deleteMenuItem = async (id: string): Promise<void> => {
  await apiClient(`/menu/${id}`, { method: "DELETE" });
};