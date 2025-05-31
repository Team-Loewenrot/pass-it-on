import { useState } from "react";

interface Challenge {
    id: string;
    title: string;
    description: string;
    participants: number;
}

interface ThreadEntry {
    id: string;
    user: string;
    message: string;
    date: string;
}

export default function ChallengeThreadModal({
    challenge,
    open,
    onClose,
}: {
    challenge: Challenge;
    open: boolean;
    onClose: () => void;
}) {
    // Mock thread data
    const [thread, setThread] = useState<ThreadEntry[]>([
        {
            id: "1",
            user: "Alice",
            message: "Just completed this challenge in Berlin! 🚴‍♂️",
            date: "2025-05-30",
        },
        {
            id: "2",
            user: "Bob",
            message: "Passing it on to my friend in Paris!",
            date: "2025-05-31",
        },
    ]);
    const [input, setInput] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-2xl mx-auto rounded-2xl shadow-2xl p-8 bg-[var(--card-bg)] border border-[var(--card-border)] animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">{challenge.title}</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">{challenge.description}</p>
                <div className="mb-6">
                    <div className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Challenge Thread</div>
                    <div className="max-h-40 overflow-y-auto space-y-3 mb-3">
                        {thread.map((entry) => (
                            <div key={entry.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                                <div className="text-sm font-bold text-green-700 dark:text-green-300">{entry.user}</div>
                                <div className="text-sm">{entry.message}</div>
                                <div className="text-xs text-gray-400">{entry.date}</div>
                            </div>
                        ))}
                    </div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            if (input.trim()) {
                                setThread([
                                    ...thread,
                                    {
                                        id: Math.random().toString(),
                                        user: "You",
                                        message: input,
                                        date: new Date().toISOString().slice(0, 10),
                                    },
                                ]);
                                setInput("");
                            }
                        }}
                        className="flex gap-2"
                    >
                        <input
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                            placeholder="Add your message to the thread..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                        >
                            Post
                        </button>
                    </form>
                </div>
                <div>
                    <div className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Challenge Map (Mock)</div>
                    <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600">
                        [Map visualization coming soon]
                    </div>
                </div>
                <div className="mt-8">
                    <div className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Share this challenge</div>
                    <div className="flex gap-4 justify-center mb-2">
                        {/* Twitter/X */}
                        <a
                            href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20challenge%20on%20PassItOn!%20"${encodeURIComponent(
                                challenge.title
                            )}"%20https://pass-it-on-nine.vercel.app/landing`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-[#1da1f2] hover:bg-[#0d8ddb] text-white w-10 h-10 flex items-center justify-center shadow transition"
                            title="Share on X"
                        >
                            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.538.698a4.48 4.48 0 0 0 1.963-2.476 8.94 8.94 0 0 1-2.828 1.082 4.47 4.47 0 0 0-7.617 4.075A12.7 12.7 0 0 1 3.112 4.89a4.47 4.47 0 0 0 1.384 5.963 4.43 4.43 0 0 1-2.025-.56v.057a4.47 4.47 0 0 0 3.584 4.382 4.48 4.48 0 0 1-2.02.077 4.47 4.47 0 0 0 4.175 3.104A8.97 8.97 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.697z" /></svg>
                        </a>
                        {/* Facebook */}
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=https://pass-it-on-nine.vercel.app/landing`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-[#1877f3] hover:bg-[#145db2] text-white w-10 h-10 flex items-center justify-center shadow transition"
                            title="Share on Facebook"
                        >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0" /></svg>
                        </a>
                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/?text=Check%20out%20this%20challenge%20on%20PassItOn!%20"${encodeURIComponent(
                                challenge.title
                            )}"%20https://pass-it-on-nine.vercel.app/landing`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-[#25d366] hover:bg-[#1da851] text-white w-10 h-10 flex items-center justify-center shadow transition"
                            title="Share on WhatsApp"
                        >
                            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.991c-.003 5.451-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05.001C5.495 0 .001 5.493 0 12.245a11.96 11.96 0 0 0 1.671 6.021L.057 23.925a1.004 1.004 0 0 0 1.225 1.225l5.682-1.613a11.933 11.933 0 0 0 5.085 1.176h.005c6.554 0 11.848-5.492 11.849-12.244a11.82 11.82 0 0 0-3.477-8.652" /></svg>
                        </a>
                        {/* Copy Link */}
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`https://pass-it-on-nine.vercel.app/landing`);
                                alert("Link copied!");
                            }}
                            className="rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 w-10 h-10 flex items-center justify-center shadow transition"
                            title="Copy link"
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-7-7" /><path d="M14 11a5 5 0 0 0-7-7l-3 3a5 5 0 0 0 7 7" /></svg>
                        </button>
                    </div>
                    <div className="text-xs text-center text-gray-400 mt-2">
                        🚀 Shared via <span className="font-bold text-green-600 dark:text-green-400">PassItOn</span> — <span className="italic">Join the chain at <span className="underline">PassItOn.app</span></span>
                    </div>
                </div>
            </div>
            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fade-in {
          animation: fade-in 0.25s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
        </div>
    );
}