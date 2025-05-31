"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    TwitterAuthProvider, // <-- add this
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

function useDarkMode() {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return isDark;
}

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const isDark = useDarkMode();
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u && showForm) {
                setShowForm(false);
                router.push("/");
            }
        });
        return () => unsub();
        // eslint-disable-next-line
    }, [router, showForm]);

    const handleGoogle = async () => {
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // Success handled by onAuthStateChanged
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleGithub = async () => {
        setError(null);
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            // Success handled by onAuthStateChanged
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleTwitter = async () => {
        setError(null);
        try {
            const provider = new TwitterAuthProvider();
            await signInWithPopup(auth, provider);
            // Success handled by onAuthStateChanged
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            // Success handled by onAuthStateChanged
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleSignOut = async () => {
        await signOut(auth);
        router.push("/landing");
    };

    if (user) {
        return (
            <div className="flex items-center gap-2">
                {user.photoURL && (
                    <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
                )}
                <span className="text-sm">{user.displayName || user.email}</span>
                <button
                    onClick={handleSignOut}
                    className={`ml-2 px-2 py-1 rounded text-xs ${isDark
                        ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Sign out
                </button>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setShowForm(true)}
                className={`px-4 py-2 rounded ${isDark
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition`}
            >
                Sign in
            </button>
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div
                        className={`relative w-full max-w-xs mx-auto rounded-2xl shadow-2xl p-8 ${isDark
                            ? "bg-gray-900 text-gray-100 border border-gray-700"
                            : "bg-white text-gray-900 border border-gray-200"
                            } animate-fade-in`}
                    >
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-extrabold mb-6 text-center tracking-tight">
                            {isRegister ? "Create Account" : "Sign In"}
                        </h2>
                        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={`w-full px-4 py-3 rounded-lg shadow-sm border transition focus:outline-none focus:ring-2 focus:ring-green-400
                    ${isDark
                                            ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                                            : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                                        }`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={`w-full px-4 py-3 rounded-lg shadow-sm border transition focus:outline-none focus:ring-2 focus:ring-green-400
                    ${isDark
                                            ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                                            : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                                        }`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-lg font-semibold text-lg transition
                  ${isDark
                                        ? "bg-green-700 text-white hover:bg-green-600"
                                        : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                            >
                                {isRegister ? "Register" : "Login"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsRegister((v) => !v)}
                                className="text-xs underline mt-1 text-center"
                            >
                                {isRegister ? "Already have an account? Login" : "No account? Register"}
                            </button>
                        </form>
                        <div className="my-4 text-center text-xs text-gray-400">or</div>
                        <button
                            onClick={handleGoogle}
                            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-base transition mb-2
                ${isDark
                                    ? "bg-red-700 text-white hover:bg-red-600"
                                    : "bg-red-500 text-white hover:bg-red-600"
                                }`}
                        >
                            <svg height="20" viewBox="0 0 20 20" width="20" aria-hidden="true">
                                <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"></path>
                                <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"></path>
                                <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"></path>
                                <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"></path>
                            </svg>
                            Sign in with Google
                        </button>
                        <button
                            onClick={handleGithub}
                            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-base transition mb-2
                ${isDark
                                    ? "bg-gray-800 text-white hover:bg-gray-700"
                                    : "bg-gray-900 text-white hover:bg-gray-800"
                                }`}
                        >
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                            </svg>
                            Sign in with GitHub
                        </button>
                        <button
                            onClick={handleTwitter}
                            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-base transition
                ${isDark
                                    ? "bg-[#1da1f2] text-white hover:bg-[#0d8ddb]"
                                    : "bg-[#1da1f2] text-white hover:bg-[#0d8ddb]"
                                }`}
                        >
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M22.46 5.924c-.793.352-1.645.59-2.538.698a4.48 4.48 0 0 0 1.963-2.476 8.94 8.94 0 0 1-2.828 1.082 4.47 4.47 0 0 0-7.617 4.075A12.7 12.7 0 0 1 3.112 4.89a4.47 4.47 0 0 0 1.384 5.963 4.43 4.43 0 0 1-2.025-.56v.057a4.47 4.47 0 0 0 3.584 4.382 4.48 4.48 0 0 1-2.02.077 4.47 4.47 0 0 0 4.175 3.104A8.97 8.97 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.697z" />
                            </svg>
                            Sign in with Twitter
                        </button>
                        {error && <div className="text-red-500 text-xs mt-4 text-center">{error}</div>}
                    </div>
                </div>
            )}
        </>
    );
}