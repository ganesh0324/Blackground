"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Post } from "@/components/feed/post"
import { samplePosts } from "@/lib/constants"
import { Edit, Settings, Users } from "lucide-react"
import { useEffect, useState} from "react"

export default function ProfilePage() {

  const [user, setUser] = useState(null)
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile")
        const data = await res.json()
        console.log("The user's name here is: ", data.name);
      } catch (err) {
        console.error("Failed to fetch profile:", err)
      }
    }

    fetchProfile()
  }, [])

  // Sample user data - in a real app, this would come from an API or state
  const duser = {
    name: "User Name",
    handle: "username",
    bio: "Decentralized social media enthusiast | Web3 Developer | Exploring the future of online communities",
    followers: 1024,
    following: 256,
    posts: 128,
    joinedDate: "January 2023",
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Profile Header */}
      <div className="relative">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-900 w-full"></div>

        {/* Profile Info */}
        <div className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex justify-between items-start relative -mt-16">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt={user.name} />
              <AvatarFallback className="text-4xl">{user.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex gap-2 mt-20">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.handle}</p>
            </div>

            <p className="text-sm">{user.bio}</p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-bold">{user.following}</span>
                <span className="text-muted-foreground">Following</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{user.followers}</span>
                <span className="text-muted-foreground">Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{user.posts}</span>
                <span className="text-muted-foreground">Posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 border-t border-border">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start px-4 sm:px-6 lg:px-8 border-b rounded-none h-14">
            <TabsTrigger
              value="posts"
              className="text-md rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="replies"
              className="text-md rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Replies
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="text-md rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Media
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="text-md rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto space-y-4">
              {Object.values(samplePosts)
                .flat()
                .filter((post) => post.handle === user.handle).length > 0 ? (
                Object.values(samplePosts)
                  .flat()
                  .filter((post) => post.handle === user.handle)
                  .map((post) => <Post key={post.id} {...post} />)
              ) : (
                <p className="text-center text-muted-foreground py-8">No posts yet</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="replies" className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-center text-muted-foreground py-8">No replies yet</p>
            </div>
          </TabsContent>

          <TabsContent value="media" className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-center text-muted-foreground py-8">No media posts yet</p>
            </div>
          </TabsContent>

          <TabsContent value="likes" className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-center text-muted-foreground py-8">No liked posts yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

