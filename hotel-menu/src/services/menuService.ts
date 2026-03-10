import apiClient from "./apiClient";
import type { MenuItemType } from "../types/menu";

/* ---------- FETCH MENU (PUBLIC) ---------- */

export const fetchMenu = async (): Promise<MenuItemType[]> => {
  return apiClient("/menu/");
};

/* ---------- CREATE ITEM ---------- */

export const createMenuItem = async (
  data: Omit<MenuItemType, "id">
): Promise<MenuItemType> => {
  return apiClient("/menu/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* ---------- UPDATE ITEM ---------- */

export const updateMenuItem = async (
  id: string,
  data: Partial<MenuItemType>
): Promise<MenuItemType> => {
  return apiClient(`/menu/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

/* ---------- DELETE ITEM ---------- */

export const deleteMenuItem = async (id: string): Promise<void> => {
  await apiClient(`/menu/${id}`, {
    method: "DELETE",
  });
};