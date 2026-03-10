const API_BASE = import.meta.env.VITE_API_URL;

export const apiClient = async (
    endpoint: string,
    options: RequestInit = {}
) => {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
    }

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "API request failed");
    }

    return res.json();
};

export default apiClient;