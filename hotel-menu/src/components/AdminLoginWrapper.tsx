import { useState } from "react";
import { loginAdmin } from "../services/authService";

interface AdminLoginProps {
    onLoginSuccess: () => void;
    error?: string;
}

export default function AdminLoginWrapper({ onLoginSuccess, error: externalError }: AdminLoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await loginAdmin(email, password);
            onLoginSuccess();
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full py-2 bg-yellow-500 text-black rounded font-semibold"
                    onClick={handleLogin}
                >
                    Login
                </button>

                {(error || externalError) && (
                    <p className="text-red-500 text-sm mt-2">{error || externalError}</p>
                )}
            </div>
        </div>
    );
}