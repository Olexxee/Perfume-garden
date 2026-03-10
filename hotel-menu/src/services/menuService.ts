import apiClient from "./apiClient";
import type { MenuItemType } from "../types/menu";

/* ---------- FETCH MENU (PUBLIC) ---------- */
export const fetchMenu = async (): Promise<MenuItemType[]> => {
  return apiClient("/api/menu");
};

/* ---------- CREATE ITEM (ADMIN) ---------- */
export const createMenuItem = async (
  data: Omit<MenuItemType, "id">
): Promise<MenuItemType> => {
  return apiClient("/api/menu", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* ---------- UPDATE ITEM (ADMIN) ---------- */
export const updateMenuItem = async (
  id: string,
  data: Partial<MenuItemType>
): Promise<MenuItemType> => {
  return apiClient(`/api/menu/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

/* ---------- DELETE ITEM (ADMIN) ---------- */
export const deleteMenuItem = async (id: string): Promise<void> => {
  await apiClient(`/api/menu/${id}`, {
    method: "DELETE",
  });
};