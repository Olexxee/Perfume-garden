import { useState, useEffect } from "react";
import type { MenuItemType, MenuCategory } from "../types/menu";

interface EditItemModalProps {
    item: MenuItemType;
    onSave: (id: string, updates: { name: string; price: number; category: MenuCategory }) => Promise<void>;
    onClose: () => void;
}

export default function EditItemModal({ item, onSave, onClose }: EditItemModalProps) {
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState<number | "">(item.price);
    const [category, setCategory] = useState<MenuCategory>(item.category);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleSave = async () => {
        if (!name.trim() || !price || Number(price) <= 0) {
            setError("Please fill in all fields correctly.");
            return;
        }
        setIsSaving(true);
        setError("");
        try {
            await onSave(item.id, { name: name.trim(), price: Number(price), category });
            onClose();
        } catch {
            setError("Failed to save changes. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const inputStyle = {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "white",
        borderRadius: "12px",
        padding: "10px 14px",
        fontSize: "0.875rem",
        outline: "none",
        width: "100%",
        transition: "border-color 0.2s",
    };

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="w-full max-w-md rounded-2xl p-6"
                style={{
                    background: "linear-gradient(145deg, #1a1a24, #161620)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">Editing</p>
                        <h2
                            className="text-lg font-semibold text-white"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {item.name}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            color: "#6b7280",
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            onFocus={e => (e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        />
                    </div>

                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Price</label>
                        <div
                            className="flex items-center gap-1 rounded-xl px-4"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                            }}
                        >
                            <span className="text-gray-500 text-sm">₦</span>
                            <input
                                type="number"
                                value={price}
                                min={0}
                                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                                className="bg-transparent outline-none text-sm py-2.5 w-full"
                                style={{ color: "white" }}
                                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as MenuCategory)}
                            style={{ ...inputStyle, cursor: "pointer" }}
                        >
                            <option value="food">🍽 Food</option>
                            <option value="drink">🥂 Drink</option>
                            <option value="room">🛏 Room</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <p className="text-red-400 text-xs mt-3">{error}</p>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl text-sm transition-all duration-200"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#9ca3af",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50"
                        style={{
                            background: "linear-gradient(135deg, #f59e0b, #d97706)",
                            color: "#000",
                        }}
                    >
                        {isSaving ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}