"use client";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

type FormData = {
  title: string;
  description: string;
};

export default function CreateChallenge() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const onSubmit = async (data: FormData) => {
    await addDoc(collection(db, "challenges"), {
      ...data,
      participants: 0,
      createdAt: new Date(),
      createdBy: user?.uid,
    });
    router.push("/");
  };

  if (loading) {
    return <div className="p-4 max-w-md mx-auto">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 max-w-md mx-auto text-center bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow">
        <p className="mb-4 text-lg">You must be signed in to create a challenge.</p>
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">
        Start a New Challenge
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
            Title
          </label>
          <input
            {...register("title", { required: true, minLength: 3 })}
            className={`w-full p-3 border rounded-lg bg-transparent ${
              errors.title
                ? "border-red-500"
                : "border-[var(--card-border)] focus:border-green-500"
            }`}
            placeholder="e.g., 'Sunrise Yoga Challenge'"
            autoFocus
          />
          {errors.title && (
            <span className="text-xs text-red-500">Title is required (min 3 chars).</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
            Description
          </label>
          <textarea
            {...register("description", { required: true, minLength: 10 })}
            className={`w-full p-3 border rounded-lg bg-transparent ${
              errors.description
                ? "border-red-500"
                : "border-[var(--card-border)] focus:border-green-500"
            }`}
            rows={4}
            placeholder="Describe the challenge rules..."
          />
          {errors.description && (
            <span className="text-xs text-red-500">Description is required (min 10 chars).</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-60"
        >
          {isSubmitting ? "Launching..." : "Launch Challenge"}
        </button>
      </form>
    </div>
  );
}