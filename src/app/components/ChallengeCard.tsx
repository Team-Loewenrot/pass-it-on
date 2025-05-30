import { FiUsers, FiArrowRight } from "react-icons/fi";

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
}

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <div
      className="border rounded-2xl p-5 shadow bg-[var(--card-bg)] border-[var(--card-border)] 
        transition-transform hover:scale-[1.02] hover:shadow-lg flex flex-col h-full"
    >
      <h3 className="font-bold text-xl flex items-center gap-2 mb-2">
        {challenge.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 flex-1">{challenge.description}</p>
      <div className="mt-6 flex justify-between items-center">
        <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <FiUsers /> {challenge.participants}
        </span>
        <button
          className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold hover:underline"
          tabIndex={0}
        >
          Join <FiArrowRight />
        </button>
      </div>
    </div>
  );
}