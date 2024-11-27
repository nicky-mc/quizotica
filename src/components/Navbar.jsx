"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar () {
    const [ theme, setTheme ] = useState( "light" );
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme( newTheme );
        document.documentElement.setAttribute( "data-theme", newTheme );
    };

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
               <Link href="/" className="btn btn-ghost normal-case text-xl">Quizotica</Link>
            </div>
            <div className="flex-none"> 
                <button onClick={ toggleTheme } className="btn btn-ghost">
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
            </div>
        </div>
    );
}