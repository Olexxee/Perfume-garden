import { useEffect, useState } from "react";
import type { MenuItemType } from "../types/menu";

interface DeleteConfirmModalProps {
    item: MenuItemType;
    onConfirm: (id: string) => Promise<void>;
    onClose: () => void;
}

export default function DeleteConfirmModal({ item, onConfirm, onClose }: DeleteConfirmModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm(item.id);
            onClose();
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="w-full max-w-sm rounded-2xl p-6 text-center"
                style={{
                    background: "linear-gradient(145deg, #1a1a24, #161620)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                }}
            >
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                </div>

                <h3
                    className="text-white font-semibold text-lg mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Delete Item?
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                    <span className="text-gray-300">"{item.name}"</span> will be permanently removed from the menu.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl text-sm transition-all"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#9ca3af",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                        style={{
                            background: "rgba(239,68,68,0.15)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            color: "#f87171",
                        }}
                    >
                        {isDeleting ? "Deleting…" : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}