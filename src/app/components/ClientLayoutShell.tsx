// components/ClientLayoutShell.tsx
"use client";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

export default function ClientLayoutShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const showNavbar = !pathname.startsWith("/landing");
    return (
        <div className="min-h-screen flex flex-col pb-14 md:pb-0">
            {showNavbar && <Navbar />}
            <div className="flex-1">{children}</div>
        </div>
    );
}