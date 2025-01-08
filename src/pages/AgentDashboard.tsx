import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AgentReferrals } from "@/components/AgentReferrals";
import { AgentPerformanceMetrics } from "@/components/AgentPerformanceMetrics";
import { NotificationBell } from "@/components/NotificationBell";
import { AgentLeaderboard } from "@/components/AgentLeaderboard";
import { AgentCoupons } from "@/components/AgentCoupons";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import {
  ChevronRight,
  User,
  LifeBuoy,
  MessageSquare,
  HelpCircle,
  Wallet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AgentProfile } from "@/components/AgentProfile";
import { AgentSupport } from "@/components/AgentSupport";
import { AgentFeedback } from "@/components/AgentFeedback";
import { AgentFAQ } from "@/components/AgentFAQ";
import { AgentBilling } from "@/components/AgentBilling";

const AgentDashboard = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSectionClick = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
      toast({
        description: `Showing ${section} section`,
        className: "bg-gray-50 border-gray-200"
      });
    }
  };

  const renderAccountSection = () => {
    switch (activeSection) {
      case 'profile':
        return <AgentProfile agentId="12345" />;
      case 'support':
        return <AgentSupport agentId="12345" />;
      case 'feedback':
        return <AgentFeedback agentId="12345" />;
      case 'faq':
        return <AgentFAQ />;
      case 'billing':
        return <AgentBilling />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold gradient-text">Agent Dashboard</h1>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              #12345
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell userId="12345" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                  <UserAvatar
                    fallback="JD"
                    size="sm"
                    className="hover:scale-105 transition-transform"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                forceMount
                sideOffset={5}
                className="w-56 mt-2 p-2 shadow-lg shadow-primary/10 border border-primary/20 bg-white/95 backdrop-blur-sm"
              >
                <DropdownMenuItem onClick={() => handleSectionClick('profile')} className="hover:bg-primary/5">
                  <User className="mr-2 h-4 w-4 text-primary" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSectionClick('support')} className="hover:bg-primary/5">
                  <LifeBuoy className="mr-2 h-4 w-4 text-primary" />
                  <span>Support Center</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSectionClick('feedback')} className="hover:bg-primary/5">
                  <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                  <span>Submit Feedback</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSectionClick('faq')} className="hover:bg-primary/5">
                  <HelpCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>FAQs</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSectionClick('billing')} className="hover:bg-primary/5">
                  <Wallet className="mr-2 h-4 w-4 text-primary" />
                  <span>Billing Details</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {activeSection && (
          <Card className="w-full animate-in slide-in bg-white/80 backdrop-blur-sm shadow-lg">
            {renderAccountSection()}
          </Card>
        )}

        {/* Performance Metrics */}
        <AgentPerformanceMetrics />

        {/* Main Content */}
        <div className="grid gap-6 grid-cols-1">
          <AgentCoupons />
          <AgentReferrals agentId="12345" />
          <AgentLeaderboard />
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
