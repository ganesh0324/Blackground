"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { CreatePostDialog } from "./feed/create-post";
import { cn } from "@/lib/utils";
import Icon, { IconProps } from "./icons";

const MenuItem = ({
  title,
  icon,
  href,
}: {
  title: string;
  icon: IconProps["name"];
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="py-6">
        <Link href={href} className="flex items-center gap-3">
          <Icon name={icon} size={22} className={cn("text-foreground")} />
          <span
            className={cn(
              "text-[1.1rem]/5 font-medium tracking-wide",
              isActive ? "font-semibold text-primary" : "text-foreground"
            )}
          >
            {title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const routesWithoutSidebar = ["/login", "/signup"];
  const showSidebar = !routesWithoutSidebar.includes(pathname);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen text-foreground">
        {showSidebar && (
          <Sidebar className="border-r border-border pl-36 pr-8">
            <SidebarHeader className="py-8">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">BlackGround</h1>
              </div>
            </SidebarHeader>
            <SidebarContent className="mb-8">
              <SidebarMenu className="flex justify-between flex-col flex-1">
                <div>
                  <MenuItem title="Home" icon="home" href="/" />
                  <MenuItem title="Profile" icon="profile" href="/profile" />
                  <MenuItem
                    title="Communities"
                    icon="communities"
                    href="/communities"
                  />
                  <MenuItem title="Messages" icon="message" href="/messages" />
                  <MenuItem
                    title="Notifications"
                    icon="notification"
                    href="/notifications"
                  />
                  <MenuItem title="Settings" icon="settings" href="/settings" />
                </div>
              </SidebarMenu>

              <CreatePostDialog>
                 <Button className="rounded-full h-12 px-6  bg-blue-700 text-white ">
                 <span className="font-semibold text-md">Create Post</span>
                 </Button>
                 </CreatePostDialog>


            </SidebarContent>
            <SidebarFooter className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">Ganesh Parajuli</p>
                  <p className="truncate text-xs text-muted-foreground">
                    @blaugranesh
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
        )}
      </div>
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}
