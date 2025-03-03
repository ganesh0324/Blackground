import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
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
}: PostProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar>
          <AvatarImage src={avatarSrc} alt={username} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">@{handle}</p>
            <p className="text-xs text-muted-foreground">· {timeAgo}</p>
          </div>
          <p className="mt-2">{content}</p>
        </div>
      </CardHeader>
      {imageSrc && (
        <CardContent className="p-0">
          <Image
            src={imageSrc || "/placeholder.jpg"}
            height={400}
            width={400}
            alt="Post image"
            className="w-full"
          />
        </CardContent>
      )}
      <CardFooter className="flex gap-4 p-4">
        <Button variant="ghost" size="sm" className="flex gap-2">
          <Icon name="heart" className="h-4 w-4" />
          <span>{likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-2">
          <Icon name="share" className="h-4 w-4" />
          <span>{shares}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
