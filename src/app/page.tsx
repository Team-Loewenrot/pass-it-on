"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import ChallengeCard from "./components/ChallengeCard";
import Link from "next/link";
import AuthButton from "./components/AuthButton";

export default function Home() {
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
    // Will redirect, but fallback
    return null;
  }

  const challenges = [
    {
      id: "1",
      title: "🌍 Hidden Spot Photo",
      description: "Find and photograph your city’s coolest hidden location.",
      participants: 1243,
    },
    {
      id: "2",
      title: "🍜 Global Dish Challenge",
      description: "Cook a random country’s traditional dish.",
      participants: 892,
    },
  ];

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Main Feed & Challenges */}
      <section className="flex-1 flex flex-col gap-8">
        {/* Challenges */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⛵</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-green-600 dark:text-green-400">
              ChallengeChain
            </h1>
          </div>
          <div className="flex gap-3 items-center w-full sm:w-auto justify-end">
            <Link
              href="/create"
              className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 transition"
            >
              + Create Challenge
            </Link>
            <AuthButton />

          </div>
        </header>
        <section>
          <h2 className="sr-only">Active Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
