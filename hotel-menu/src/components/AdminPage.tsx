import { useEffect, useState } from "react";
import type { MenuItemType, MenuCategory } from "../types/menu";
import {
    fetchMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} from "../services/menuService";
import AdminLoginWrapper from "./AdminLoginWrapper";
import EditItemModal from "./Edititemmodal";
import DeleteConfirmModal from "./Deleteconfirmmodal";


const CATEGORY_COLORS: Record<MenuCategory, string> = {
    food: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    drink: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
    room: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
};

const CATEGORY_DOT: Record<MenuCategory, string> = {
    food: "bg-amber-400",
    drink: "bg-sky-400",
    room: "bg-violet-400",
};

export default function AdminPage() {
    const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [category, setCategory] = useState<MenuCategory>("food");

    const [isAdmin, setIsAdmin] = useState(false);
    const [, setIsLoading] = useState(false);

    const [filter, setFilter] = useState<MenuCategory | "all">("all");

    const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
    const [deletingItem, setDeletingItem] = useState<MenuItemType | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAdmin(true);
            loadMenu();
        }
    }, []);

    const loadMenu = async () => {
        setIsLoading(true);

        try {
            const data: MenuItemType[] = await fetchMenu();
            setMenuItems(data);
        } catch (err) {
            console.error("Failed to load menu", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!name.trim() || !price) return;

        try {
            const newItem = await createMenuItem({
                name,
                price: Number(price),
                category,
                _id: ""
            });

            setMenuItems((prev) => [...prev, newItem]);

            setName("");
            setPrice("");
        } catch (err) {
            console.error("Failed to create item", err);
        }
    };

    const handleUpdate = async (
        id: string,
        updates: { name: string; price: number; category: MenuCategory }
    ) => {
        const updated = await updateMenuItem(id, updates);

        setMenuItems((prev) =>
            prev.map((item) => (item.id === id ? updated : item))
        );
    };

    const handleDelete = async (id: string) => {
        await deleteMenuItem(id);
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAdmin(false);
    };

    const filtered =
        filter === "all"
            ? menuItems
            : menuItems.filter((i) => i.category === filter);

    if (!isAdmin) {
        return (
            <AdminLoginWrapper
                onLoginSuccess={() => {
                    setIsAdmin(true);
                    loadMenu();
                }}
            />
        );
    }

    return (
        <div
            className="min-h-screen text-white"
            style={{
                background:
                    "linear-gradient(135deg, #0f0f14 0%, #161620 60%, #1a1528 100%)",
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            {/* Modals */}

            {editingItem && (
                <EditItemModal
                    item={editingItem}
                    onSave={handleUpdate}
                    onClose={() => setEditingItem(null)}
                />
            )}

            {deletingItem && (
                <DeleteConfirmModal
                    item={deletingItem}
                    onConfirm={handleDelete}
                    onClose={() => setDeletingItem(null)}
                />
            )}

            {/* Header */}

            <header className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-black">
                        PG
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">
                            Perfume Garden
                        </p>

                        <p className="text-sm font-medium">Admin Console</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg text-sm text-red-400 border border-red-400/30 bg-red-400/10"
                >
                    Logout
                </button>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                {/* Stats */}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {(["food", "drink", "room"] as MenuCategory[]).map((cat) => {
                        const count = menuItems.filter((i) => i.category === cat).length;

                        return (
                            <div
                                key={cat}
                                className="rounded-xl p-4 border border-white/10 bg-white/5"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className={`w-2 h-2 rounded-full ${CATEGORY_DOT[cat]}`}
                                    />
                                    <span className="text-xs uppercase text-gray-500">
                                        {cat}
                                    </span>
                                </div>

                                <p className="text-2xl font-light">{count}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Add Item */}

                <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-8">
                    <h2 className="text-xs uppercase text-gray-500 mb-4">
                        Add New Item
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-3">

                        <input
                            type="text"
                            placeholder="Item name"
                            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            className="w-32 px-4 py-3 rounded-xl bg-white/10 border border-white/10"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value === "" ? "" : Number(e.target.value))
                            }
                        />

                        <select
                            className="px-4 py-3 rounded-xl bg-black/10 border border-white/10"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value as MenuCategory)
                            }
                        >
                            <option value="food">Food</option>
                            <option value="drink">Drink</option>
                            <option value="room">Room</option>
                        </select>

                        <button
                            onClick={handleAdd}
                            className="px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold"
                        >
                            Add
                        </button>

                    </div>
                </div>

                {/* Filter Tabs */}

                <div className="flex gap-2 mb-5 overflow-x-auto">

                    {(["all", "food", "drink", "room"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-1 rounded-full text-xs uppercase ${filter === tab
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-white/5 text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}

                </div>

                {/* MOBILE CARDS */}

                <div className="md:hidden space-y-3">

                    {filtered.length === 0 && (
                        <div className="text-center text-gray-500 py-10">
                            No items found
                        </div>
                    )}

                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-xl p-4 border border-white/10 bg-white/5"
                        >
                            <div className="flex justify-between mb-2">

                                <h3 className="font-medium">{item.name}</h3>

                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${CATEGORY_COLORS[item.category]}`}
                                >
                                    {item.category}
                                </span>

                            </div>

                            <p className="text-gray-400 text-sm mb-3">
                                ₦{item.price.toLocaleString()}
                            </p>

                            <div className="flex gap-2">

                                <button
                                    onClick={() => setEditingItem(item)}
                                    className="flex-1 py-2 rounded-lg text-xs border border-amber-400/30 text-amber-300 bg-amber-400/10"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => setDeletingItem(item)}
                                    className="flex-1 py-2 rounded-lg text-xs border border-red-400/30 text-red-300 bg-red-400/10"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    ))}

                </div>

                {/* DESKTOP TABLE */}

                <div className="hidden md:block rounded-xl border border-white/10 overflow-hidden">

                    <table className="w-full text-sm">

                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-5 py-4 text-left text-gray-500">Name</th>
                                <th className="px-5 py-4 text-left text-gray-500">Price</th>
                                <th className="px-5 py-4 text-left text-gray-500">Category</th>
                                <th className="px-5 py-4 text-right text-gray-500">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((item) => (
                                <tr key={item.id} className="border-t border-white/10">

                                    <td className="px-5 py-4">{item.name}</td>

                                    <td className="px-5 py-4">
                                        ₦{item.price.toLocaleString()}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${CATEGORY_COLORS[item.category]}`}
                                        >
                                            {item.category}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-right space-x-2">

                                        <button
                                            onClick={() => setEditingItem(item)}
                                            className="px-3 py-1 text-xs rounded border border-amber-400/30 text-amber-300"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => setDeletingItem(item)}
                                            className="px-3 py-1 text-xs rounded border border-red-400/30 text-red-300"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </main>
        </div>
    );
}