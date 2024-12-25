import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AgentReferrals } from "@/components/AgentReferrals";
import { AgentPerformanceMetrics } from "@/components/AgentPerformanceMetrics";
import { NotificationBell } from "@/components/NotificationBell";
import { AgentLeaderboard } from "@/components/AgentLeaderboard";
import { AgentFeedback } from "@/components/AgentFeedback";
import { AgentSupport } from "@/components/AgentSupport";
import { AgentFAQ } from "@/components/AgentFAQ";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import { MessageSquare, HelpCircle, LifeBuoy, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

  const renderSupportSection = () => {
    switch (activeSection) {
      case 'support':
        return <AgentSupport agentId="12345" />;
      case 'feedback':
        return <AgentFeedback agentId="12345" />;
      case 'faq':
        return <AgentFAQ />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold gradient-text">Agent Dashboard</h1>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              #12345
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell userId="12345" />
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1 transition-colors"
            >
              <UserAvatar
                fallback="JD"
                size="sm"
              />
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 grid-cols-1">
          <AgentPerformanceMetrics />
          <AgentReferrals agentId="12345" />
          <AgentLeaderboard />
        </div>

        {/* Support, Feedback, and FAQ Section */}
        <Card className="p-6 space-y-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={activeSection === 'support' ? 'default' : 'outline'}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => handleSectionClick('support')}
            >
              <LifeBuoy className="h-4 w-4" />
              Support Center
            </Button>
            <Button
              variant={activeSection === 'feedback' ? 'default' : 'outline'}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => handleSectionClick('feedback')}
            >
              <MessageSquare className="h-4 w-4" />
              Submit Feedback
            </Button>
            <Button
              variant={activeSection === 'faq' ? 'default' : 'outline'}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => handleSectionClick('faq')}
            >
              <HelpCircle className="h-4 w-4" />
              FAQs
            </Button>
          </div>

          <div className="mt-6 animate-fadeIn">
            {renderSupportSection()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;