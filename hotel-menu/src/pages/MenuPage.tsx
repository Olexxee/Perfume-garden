import { useState, type JSX } from "react";
import Tabs from "../components/Tabs";
import MenuList from "../components/MenuList";
import type { MenuCategory } from "../types/menu";

export default function MenuPage(): JSX.Element {
    const [activeTab, setActiveTab] = useState<MenuCategory>("food");

    return (
        <div
            className="min-h-screen"
            style={{
                background: "linear-gradient(160deg, #fdf8f0 0%, #f5ead8 50%, #ede0c8 100%)",
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
                rel="stylesheet"
            />

            {/* Decorative top bar */}
            <div
                className="w-full h-1"
                style={{ background: "linear-gradient(90deg, #c9a84c, #a8732e, #c9a84c)" }}
            />

            <div className="max-w-2xl mx-auto px-6 py-16">

                {/* Header */}
                <header className="text-center mb-14">
                    {/* Ornament */}
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="h-px w-16" style={{ background: "rgba(180,140,80,0.35)" }} />
                        <span style={{ color: "rgba(180,140,80,0.5)", fontSize: "1.1rem" }}>✦</span>
                        <div className="h-px w-16" style={{ background: "rgba(180,140,80,0.35)" }} />
                    </div>

                    <p
                        className="text-xs uppercase tracking-widest mb-3"
                        style={{ color: "rgba(138,96,32,0.55)" }}
                    >
                        Welcome to
                    </p>

                    <h1
                        className="leading-tight mb-2"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(2rem, 5vw, 3rem)",
                            fontWeight: 600,
                            color: "#2a1f0e",
                            letterSpacing: "0.02em",
                        }}
                    >
                        Perfume Garden
                    </h1>

                    <p
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.1rem",
                            fontStyle: "italic",
                            color: "rgba(138,96,32,0.65)",
                            letterSpacing: "0.05em",
                        }}
                    >
                        Hotel & Lounge
                    </p>

                    {/* Bottom ornament */}
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <div className="h-px w-8" style={{ background: "rgba(180,140,80,0.25)" }} />
                        <div className="h-px w-16" style={{ background: "rgba(180,140,80,0.35)" }} />
                        <div className="h-px w-8" style={{ background: "rgba(180,140,80,0.25)" }} />
                    </div>
                </header>

                {/* Tabs */}
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Menu List */}
                <MenuList activeTab={activeTab} />

            </div>

            {/* Footer */}
            <footer
                className="text-center py-8 mt-4"
                style={{ borderTop: "1px solid rgba(180,140,80,0.12)" }}
            >
                <p
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "rgba(138,96,32,0.35)" }}
                >
                    Perfume Garden Hotel & Lounge · Crafted with care
                </p>
            </footer>
        </div>
    );
}