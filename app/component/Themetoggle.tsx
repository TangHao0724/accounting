"use client";

import { useEffect } from "react";

export default function ThemeToggle() {
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    function toggleDarkMode() {
        const nextTheme = !document.documentElement.classList.contains("dark");

        if (nextTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    return (
        <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg bg-zinc-300 px-4 py-2 dark:bg-zinc-700 transition-colors" 
        >
            <span className="dark:hidden">🌙</span>
            <span className="hidden dark:inline">☀️</span>
        </button>
    );
}