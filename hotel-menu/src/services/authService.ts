import { apiClient } from "./apiClient";

export const loginAdmin = async (email: string, password: string) => {
  const data = await apiClient("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("token", data.token);

  return data;
};

export const logoutAdmin = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};