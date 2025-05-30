import AuthButton from "../components/AuthButton";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 w-full text-center">
        <span className="text-5xl mb-4 block">⛵</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-green-600 dark:text-green-400 mb-4">
          Welcome to PassItOn
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          PassItOn is a global challenge platform. Discover, join, and create fun challenges with people around the world. Share your experiences, connect, and inspire others!
        </p>
        <ul className="mb-8 text-left text-base text-gray-600 dark:text-gray-400 mx-auto max-w-md space-y-2">
          <li>🌍 Explore creative challenges</li>
          <li>📝 Create your own and invite friends</li>
          <li>🏆 Track your progress and achievements</li>
          <li>🔒 Safe, privacy-first, and free</li>
        </ul>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AuthButton />
          <Link
            href="#learn-more"
            className="px-4 py-2 rounded-lg border border-green-500 text-green-600 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-green-900 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
      <section id="learn-more" className="mt-16 w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">How it works</h2>
        <p className="mb-2">1. Sign up with Google or Email</p>
        <p className="mb-2">2. Browse or create challenges</p>
        <p className="mb-2">3. Share your results and inspire others</p>
        <p className="mb-2">4. Earn badges and join the global leaderboard</p>
      </section>
    </main>
  );
}