"use client";

import { useState } from "react";
import AuthButton from "../components/AuthButton";
import Link from "next/link";

export default function Landing() {
    const [showLearnMore, setShowLearnMore] = useState(false);

    return (
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 w-full text-center">
                <span className="text-5xl mb-4 block">⛵</span>
                <h1 className="text-4xl font-extrabold tracking-tight text-green-600 dark:text-green-400 mb-2">
                    ChallengeChain: Pass It On!
                </h1>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    A digital relay race for fun and meaningful activities
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Create, join, and pass on viral challenges! Upload your proof, track the global chain, and inspire others to join the fun. How far will your challenge go?
                </p>
                <ul className="mb-8 text-left text-base text-gray-600 dark:text-gray-400 mx-auto max-w-md space-y-2">
                    <li>🚀 <b>Create & Join Challenges:</b> Start or participate in creative challenges and pass them on</li>
                    <li>📸 <b>Video & Photo Proof:</b> Upload proof of your participation</li>
                    <li>🌐 <b>Chain Effect:</b> Watch challenges spread globally on an interactive map</li>
                    <li>🏅 <b>Reward System:</b> Earn badges, streaks, and milestones</li>
                    <li>🏆 <b>Leaderboard:</b> See the most viral challenges and top participants</li>
                    <li>🔗 <b>Social Sharing:</b> Share to Instagram, TikTok, and X in one click</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <AuthButton />
                    <button
                        onClick={() => setShowLearnMore(true)}
                        className="px-4 py-2 rounded-lg border border-green-500 text-green-600 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-green-900 transition"
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* Learn More Modal */}
            {showLearnMore && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div
                        className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl p-8 bg-[var(--card-bg)] border border-[var(--card-border)] animate-fade-in"
                    >
                        <button
                            onClick={() => setShowLearnMore(false)}
                            className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">How it works</h2>
                        <ul className="mb-6 text-left text-base text-gray-700 dark:text-gray-300 space-y-2">
                            <li>1. <b>Sign up</b> and join or create a challenge</li>
                            <li>2. <b>Complete the activity</b> and upload your proof</li>
                            <li>3. <b>Pass the challenge on</b> to friends or strangers</li>
                            <li>4. <b>Track the chain</b>, earn rewards, and climb the leaderboard</li>
                        </ul>
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            Ready to start? Sign in and join the movement!
                        </p>
                    </div>
                </div>
            )}
            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(24px);}
                    to { opacity: 1; transform: none;}
                }
                .animate-fade-in {
                    animation: fade-in 0.25s cubic-bezier(.4,0,.2,1);
                }
            `}</style>
        </main>
    );
}