import type React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export function Search({
  placeholder = "Search...",
  className,
  ...props
}: SearchProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className={`pl-12 ${className}`}
        {...props}
      />
    </div>
  );
}
