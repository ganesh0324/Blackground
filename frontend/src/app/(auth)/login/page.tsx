"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/icons";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading] = useState(false);

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

      form.reset();
      console.log(data);
      if (data) router.replace(data);
    } catch (err) {
      console.error("Form Submission Error:", err);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <Logo className="w-24 h-24 mx-auto animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tight mt-6">
            BlackGround
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            A Decentralized Social Media Platform
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your handle (e.g., example.bsky.social)"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full mt-4 rounded-lg px-4 py-2 text-white transition-all ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
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
