import apiClient from "./apiClient";

interface AdminAuthResponse {
  token: string;
}

export const loginAdmin = async (
  email: string,
  password: string
): Promise<AdminAuthResponse> => {
  const data = await apiClient("/admin/login", {
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