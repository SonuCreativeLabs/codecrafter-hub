import { Tag, Users, TrendingUp, LayoutDashboard, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function AdminNav({ currentView, setCurrentView }: AdminNavProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

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
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div className="flex h-full flex-col border-r bg-card">
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
                    onClick={() => {
                      setCurrentView(item.value);
                      if (isMobile) setIsOpen(false);
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}