"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUser, FiUsers } from "react-icons/fi";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/friends", label: "Friends", icon: <FiUsers /> },
        { href: "/", label: "Home", icon: <FiHome /> },
        { href: "/profile", label: "Profile", icon: <FiUser /> },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:static bg-white dark:bg-gray-900 border-t md:border-t-0 md:border-b border-gray-200 dark:border-gray-800 z-40">
            <div className="w-full flex justify-center">
                <div className="max-w-3xl flex w-full justify-center gap-8 py-2 px-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition
              ${pathname === item.href
                                    ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 font-bold"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}