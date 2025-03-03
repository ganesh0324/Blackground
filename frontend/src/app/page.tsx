"use client";

import { Button } from "@/components/ui/button";
import { Post } from "@/components/feed/post";
import { FeedTab } from "@/types";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { FeedTabs } from "@/components/feed/feed-tabs";
import { useState } from "react";
import { samplePosts } from "@/lib/constants";
import ExplorePanel from "@/components/feed/explore-panel";
import Image from "next/image";
import { Logo } from "@/components/icons";

const tabs: FeedTab[] = ["Discover", "Following", "Trending", "Hot Topics"];

export default function HomePage() {
  const { open, setOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState<FeedTab>("Discover");

  return (
    <div className="flex flex-1 flex-row">
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-border px-4 lg:h-16 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="mx-auto">
            <Logo className="h-8" />
          </div>
        </header>

        <FeedTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="px-4 lg:px-6"
        />

        <main className="flex flex-1">
          <div className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-2xl space-y-4">
              {samplePosts[activeTab].map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <ExplorePanel />
    </div>
  );
}
