import { cn } from "@/lib/utils";
import { FeedTab } from "@/types";
import { Button } from "../ui/button";

interface FeedTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: FeedTab[];
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
}

export function FeedTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
  ...props
}: FeedTabsProps) {
  return (
    <div
      className={cn(
        "flex w-full justify-evenly border-b border-border",
        className
      )}
      {...props}
    >
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={"ghost"}
          onClick={() => onTabChange(tab)}
          className={cn(
            "h-12 px-4 py-2 text-md font-medium transition-colors focus:outline-none rounded-none",
            tab === activeTab
              ? "border-b-2 border-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
