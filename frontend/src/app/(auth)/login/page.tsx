"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 2000); // Simulating API call
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
        <Logo className="w-24 h-24 mx-auto animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tight mt-6">BlackGround</h1>
          <p className="mt-2 text-sm text-gray-500">A Decentralized Social Media Platform</p>
        </div>
        <form
          onSubmit={handleLogin}
          className="mt-8 flex w-full max-w-md flex-col items-center space-y-4"
        >
          <input
            type="text"
            placeholder="Enter your handle (e.g., blaugranesh.bsky.social)"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-lg px-4 py-2 text-white transition-all ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-350">
          Don&apos;t have an account?{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
