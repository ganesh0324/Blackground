"use client";

import Link from "next/link";
<<<<<<< HEAD
=======
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
>>>>>>> be2e234 (OAuth Verification Completed)
import { Logo } from "@/components/icons";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 2000); // Simulating API call
  };
=======
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      handle: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      // if (response.error) {
      //   throw new Error(response.error);
      // }
      form.reset();
      console.log(data);
      if (data) router.replace(data);
      // router.push(url);
    } catch (err) {
      console.error("Form Submission Error:", err);
    }
  }
>>>>>>> be2e234 (OAuth Verification Completed)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
<<<<<<< HEAD
        <Logo className="w-24 h-24 mx-auto animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tight mt-6">BlackGround</h1>
          <p className="mt-2 text-sm text-gray-500">A Decentralized Social Media Platform</p>
=======
          <Logo className="w-16 h-16 mx-auto" />
          <h1 className="text-4xl font-bold tracking-tight">Blackground</h1>
          <p className="mt-2 text-sm text-gray-400">
            Decentralized social media for everyone
          </p>
        </div>
        <div className="mt-8 space-y-6 rounded-lg border border-gray-800 bg-gray-900 p-8">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="you.bsky.social" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your bluesky handle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                Sign in
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="font-medium text-white hover:text-gray-300"
            >
              Sign up
            </Link>
          </div>
>>>>>>> be2e234 (OAuth Verification Completed)
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
