"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <Logo className="w-16 h-16 mx-auto" />
          <h1 className="text-4xl font-bold tracking-tight">Blackground</h1>
          <p className="mt-2 text-sm text-gray-400">
            Decentralized social media for everyone
          </p>
        </div>
        <div className="mt-8 space-y-6 rounded-lg border border-gray-800 bg-gray-900 p-8">
          <form className="space-y-6" action="#" method="POST">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-gray-300"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="font-medium text-white hover:text-gray-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
