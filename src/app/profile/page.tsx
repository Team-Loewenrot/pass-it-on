"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

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
        <img
          src={user.photoURL ?? ""}
          alt="avatar"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{user.displayName || user.email}</h2>
        <p className="text-gray-500">{user.email}</p>
        <div className="mt-6">
          <span className="text-sm text-gray-400">More profile features coming soon!</span>
        </div>
      </div>
    </main>
  );
}