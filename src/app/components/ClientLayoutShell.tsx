// components/ClientLayoutShell.tsx
"use client";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// List of routes where the navbar should NOT be shown
const HIDE_NAVBAR_ROUTES = [
    "/landing",
    "/privacy",
    "/terms"
];

export default function ClientLayoutShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const showNavbar = !HIDE_NAVBAR_ROUTES.some(route =>
        pathname === route || pathname.startsWith(route + "/")
    );

    return (
        <div className="min-h-screen flex flex-col pb-14 md:pb-0">
            {showNavbar && <Navbar />}
            <div className="flex-1">{children}</div>
        </div>
    );
}