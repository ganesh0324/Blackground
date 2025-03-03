"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Link2 } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreatePostDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share your thoughts with the community
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-start gap-4 py-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-background border-input text-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-muted-foreground border-input"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Image
          </Button>
          <Button
            variant="outline"
            className="text-muted-foreground border-input"
          >
            <Link2 className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
