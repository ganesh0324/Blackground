import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageSquare, Repeat2 } from "lucide-react";


import Image from "next/image";
import { PostProps } from "@/types";
import Icon from "../icons";

export function Post({
  id,
  username,
  handle,
  avatarSrc,
  content,
  imageSrc,
  timeAgo,
  likes,
  comments,
  shares,
  retweets,
}: PostProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-start gap-2 p-3">
        <Avatar>
          <AvatarImage src={avatarSrc} alt={username} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1">
            <p className="font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">@{handle}</p>
            <p className="text-xs text-muted-foreground">· {timeAgo}</p>
          </div>
          <p className="mt-0.1">{content}</p>
        </div>
      </CardHeader>
      {imageSrc && (
        <CardContent className="flex justify-between px-12 py-1">
          <Image
            src={imageSrc || "/placeholder.jpg"}
            height={350}
            width={350}
            alt="Post image"
            className="w-full"
          />
        </CardContent>
      )}
      <CardFooter className="flex justify-between px-12 py-1">
        <div className="flex items-center gap-10">
          <Button variant="ghost" size="sm" className="flex items-center justify-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="">
            <Repeat2 className="h-8 w-8" />
            <span>{retweets}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center justify-center gap-2">
            <Heart className="h-4 w-4" />
            <span>{likes}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
