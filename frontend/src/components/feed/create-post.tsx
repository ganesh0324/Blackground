"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, SmileIcon } from "lucide-react";
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
  // Toggle the dialog open state
  const [isOpen, setIsOpen] = useState(false);
  // State for text input and image file
  const [text, setText] = useState("");
  // State for image file input
  const [image, setImage] = useState<File | null>(null);
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImage = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      console.log("Image selected:", file);
    }
  };

  const handlePost = async () => {

    console.log("Button pressed")
    try {
      const formData = new FormData();
      formData.append("text", text);

      if(image) {
        formData.append("image", image);
      }
      
      await fetch("/api/post", {
        method: "POST",
        body: formData,
      })
      console.log("Post created successfully");
      setIsOpen(false);
      setImage(null);
      setText("");
    } catch (err) {
      console.error("Error posting to Bsky:", err);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background border-border text-foreground">
        <div className="flex items-start gap-4 py-4">
          <Avatar>
            <AvatarImage src="/person.jpg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-transparent border-0 text-foreground resize-none p-0 focus:ring-transparent"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            // THIS IS THE IMAGE BUTTON
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={handleImage}
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >

              <SmileIcon className="h-5 w-5" />
            </Button>
          </div>
          <Button
            onClick={handlePost}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Post
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
