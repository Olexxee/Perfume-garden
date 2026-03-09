import { useEffect, useState } from "react";
import type { MenuItemType, MenuCategory } from "../types/menu";
import {
    fetchMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} from "../services/menuService";
import AdminLogin from "./AdminLogin";

export default function AdminPage() {
    const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState<MenuCategory>("food");
    const [isAdmin, setIsAdmin] = useState(false);

    // Check token on mount
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAdmin(true);
            loadMenu();
        }
    }, []);

    // Load menu items
    const loadMenu = async () => {
        try {
            const data: MenuItemType[] = await fetchMenu();
            setMenuItems(data);
        } catch (err) {
            console.error("Failed to load menu", err);
        }
    };

    // Add menu item
    const handleAdd = async () => {
        if (!name || price <= 0) return;

        try {
            const newItem = await createMenuItem({ name, price, category });

            setMenuItems((prev) => [...prev, newItem]);
            setName("");
            setPrice(0);
        } catch (err) {
            console.error("Failed to create item", err);
        }
    };

    // Update item price
    const handlePriceChange = async (id: string, newPrice: number) => {
        if (newPrice <= 0) return;

        try {
            const updated = await updateMenuItem(id, { price: newPrice });

            setMenuItems((prev) =>
                prev.map((item) => (item.id === id ? updated : item))
            );
        } catch (err) {
            console.error("Failed to update price", err);
        }
    };

    // Delete menu item
    const handleDelete = async (id: string) => {
        try {
            await deleteMenuItem(id);

            setMenuItems((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Failed to delete item", err);
        }
    };

    // Logout admin
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAdmin(false);
    };

    // Show login screen if not authenticated
    if (!isAdmin) {
        return <AdminLogin onLoginSuccess={() => {
            setIsAdmin(true);
            loadMenu();
        }} />;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>

                <button
                    className="px-4 py-2 bg-red-500 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Add Menu Item */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-800">
                <h2 className="font-semibold mb-3">Add Menu Item</h2>

                <div className="flex flex-col md:flex-row gap-2">

                    <input
                        type="text"
                        placeholder="Name"
                        className="p-2 rounded bg-gray-700 flex-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="p-2 rounded bg-gray-700 w-32"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />

                    <select
                        className="p-2 rounded bg-gray-700"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as MenuCategory)}
                    >
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                        <option value="room">Room</option>
                    </select>

                    <button
                        className="px-4 py-2 bg-yellow-500 text-black rounded"
                        onClick={handleAdd}
                    >
                        Add
                    </button>

                </div>
            </div>

            {/* Menu Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">

                <table className="w-full text-left">

                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {menuItems.map((item) => (
                            <tr key={item.id} className="border-b border-gray-700">

                                <td className="p-2">{item.name}</td>

                                <td className="p-2">
                                    <input
                                        type="number"
                                        className="w-20 p-1 rounded bg-gray-700"
                                        value={item.price}
                                        onChange={(e) =>
                                            handlePriceChange(item.id, Number(e.target.value))
                                        }
                                    />
                                </td>

                                <td className="p-2 capitalize">{item.category}</td>

                                <td className="p-2">
                                    <button
                                        className="px-2 py-1 bg-red-500 rounded"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}