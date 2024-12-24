import { Tag, Users, TrendingUp, LayoutDashboard, Trophy, Archive, LineChart, Menu, X, Activity, Settings2, FileSpreadsheet, MapPin, MessageSquare, Heart, Calendar, Palette, Globe, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface AdminNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function AdminNav({ currentView, setCurrentView }: AdminNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      value: "dashboard",
    },
    {
      title: "Custom Dashboard",
      icon: Settings2,
      value: "custom-dashboard",
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
      title: "Bulk Data",
      icon: FileSpreadsheet,
      value: "bulk-data",
    },
    {
      title: "Map View",
      icon: MapPin,
      value: "map-view",
    },
    {
      title: "Agent Feedback",
      icon: MessageSquare,
      value: "feedback",
    },
    {
      title: "Customer Engagement",
      icon: Heart,
      value: "engagement",
    },
    {
      title: "Seasonal Campaigns",
      icon: Calendar,
      value: "campaigns",
    },
    {
      title: "Branding",
      icon: Palette,
      value: "branding",
    },
    {
      title: "Language",
      icon: Globe,
      value: "language",
    },
    {
      title: "Reports",
      icon: TrendingUp,
      value: "reports",
    },
    {
      title: "Activity Logs",
      icon: Activity,
      value: "activity-logs",
    },
    {
      title: "Settings",
      icon: Settings,
      value: "settings",
    },
    {
      title: "Archived Data",
      icon: Archive,
      value: "archived-data",
    },
  ];

  const handleNavClick = (value: string) => {
    setCurrentView(value);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-background z-50 border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Navigation Menu */}
      <div className={cn(
        "fixed md:static top-0 left-0 h-full bg-card transition-transform duration-300 ease-in-out z-40",
        "md:translate-x-0 md:w-64 w-64",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        "md:block"
      )}>
        <div className="space-y-4 py-4 mt-16 md:mt-0">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight hidden md:block">
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
                  onClick={() => handleNavClick(item.value)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}