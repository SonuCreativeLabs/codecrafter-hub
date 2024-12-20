import { Tag, Users, TrendingUp, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function AdminNav({ currentView, setCurrentView }: AdminNavProps) {
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      value: "dashboard",
    },
    {
      title: "Promo Codes",
      icon: Tag,
      value: "promo-codes",
    },
    {
      title: "Agents",
      icon: Users,
      value: "agents",
    },
    {
      title: "Reports",
      icon: TrendingUp,
      value: "reports",
    },
  ];

  return (
    <div className="pb-12 min-h-screen w-64 border-r bg-card">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant={currentView === item.value ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  currentView === item.value && "bg-accent"
                )}
                onClick={() => setCurrentView(item.value)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}