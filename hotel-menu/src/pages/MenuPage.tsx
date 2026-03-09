import { useState, type JSX } from "react";
import Tabs from "../components/Tabs";
import MenuList from "../components/MenuList";
import type { MenuCategory } from "../types/menu";

export default function MenuPage(): JSX.Element {
    const [activeTab, setActiveTab] = useState<MenuCategory>("food");

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Perfume Garden Hotel & Lounge
            </h1>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <MenuList activeTab={activeTab} />
        </div>
    );
}