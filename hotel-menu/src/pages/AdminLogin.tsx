import { useNavigate, Navigate } from "react-router-dom";
import AdminLoginWrapper from "../components/AdminLoginWrapper";

export default function AdminLoginPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Redirect if already logged in
    if (token) return <Navigate to="/admin/dashboard" />;

    const handleLoginSuccess = () => {
        navigate("/admin/dashboard");
    };

    return <AdminLoginWrapper onLoginSuccess={handleLoginSuccess} />;
}