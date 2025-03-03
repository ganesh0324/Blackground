import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, Compass } from "lucide-react";
import { discoverUsers, trendingTopics } from "@/lib/constants";
import { Search } from "../search";

export default function ExplorePanel() {
  return (
    <div className="hidden relative lg:block h-screen w-96 border-l border-border p-4">
      <div className="sticky top-0">
        <div className="mb-8">
          <div className="relative">
            <Search className="rounded-full h-12" />
          </div>
        </div>
        <div className="space-y-8 mx-2">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 h-6 w-6" />
              <span>Trending</span>
            </h2>
            <ul className="space-y-2">
              {trendingTopics.map((topic) => (
                <li key={topic}>
                  <Link href="#" className="text-sm">
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Compass className="mr-2 h-6 w-6" />
              Discover
            </h2>
            <ul className="space-y-2">
              {discoverUsers.map((user) => (
                <li key={user.handle} className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.handle}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
