"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

const mockFriends = [
    { id: "1", name: "Alice", avatar: "https://randomuser.me/api/portraits/women/68.jpg", online: true },
    { id: "2", name: "Bob", avatar: "https://randomuser.me/api/portraits/men/32.jpg", online: false },
    { id: "3", name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/45.jpg", online: true },
];
const mockFeed = [
    { id: "f1", user: "Alice", action: "joined", challenge: "Hidden Spot Photo", time: "2m ago" },
    { id: "f2", user: "Bob", action: "completed", challenge: "Global Dish Challenge", time: "10m ago" },
    { id: "f3", user: "Charlie", action: "passed on", challenge: "Sunrise Yoga", time: "1h ago" },
];

export default function FriendsPage() {
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
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Friends</h2>
                <div className="flex gap-6 mb-4">
                    {mockFriends.map(friend => (
                        <div key={friend.id} className="flex flex-col items-center">
                            <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full border-2 border-green-400" />
                            <span className="text-xs mt-1">{friend.name}</span>
                            <span className={`w-2 h-2 rounded-full mt-1 ${friend.online ? "bg-green-500" : "bg-gray-400"}`}></span>
                        </div>
                    ))}
                </div>
                <button className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
                    Add Friend
                </button>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Activity Feed</h2>
                <div className="flex flex-col gap-3">
                    {mockFeed.map(feed => (
                        <div key={feed.id} className="flex items-center gap-2 text-sm">
                            <span className="font-semibold text-green-700 dark:text-green-300">{feed.user}</span>
                            <span className="text-gray-600 dark:text-gray-300">{feed.action}</span>
                            <span className="font-semibold">{feed.challenge}</span>
                            <span className="ml-auto text-xs text-gray-400">{feed.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
