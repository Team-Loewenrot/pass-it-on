"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

const mockFriends = [
    { id: "1", name: "Alice", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: "2", name: "Bob", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: "3", name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
];

const mockStats = [
    { label: "Challenges", value: 7 },
    { label: "Friends", value: 3 },
    { label: "Badges", value: 4 },
];

export default function Profile() {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            if (!firebaseUser) {
                router.replace("/landing");
            }
        });
        return () => unsub();
    }, [router]);

    if (user === undefined) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
    if (!user) {
        return null;
    }

    return (
        <main className="flex-1 w-full max-w-md mx-auto px-4 py-8">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 text-center">
                <div className="relative mb-4">
                    <img
                        src={user.photoURL ?? "https://randomuser.me/api/portraits/lego/1.jpg"}
                        alt="avatar"
                        className="w-24 h-24 rounded-full mx-auto border-4 border-green-400 shadow"
                    />
                    <span className="absolute bottom-2 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></span>
                </div>
                <h2 className="text-2xl font-bold mb-1">{user.displayName || user.email}</h2>
                <p className="text-gray-500 mb-4">{user.email}</p>
                <div className="flex justify-center gap-6 mb-6">
                    {mockStats.map(stat => (
                        <div key={stat.label} className="text-center">
                            <div className="text-xl font-bold text-green-600 dark:text-green-400">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Friends</div>
                    <div className="flex justify-center gap-4">
                        {mockFriends.map(friend => (
                            <div key={friend.id} className="flex flex-col items-center">
                                <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full border-2 border-green-400" />
                                <span className="text-xs mt-1">{friend.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}