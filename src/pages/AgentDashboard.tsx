import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AgentReferrals } from "@/components/AgentReferrals";
import { AgentTraining } from "@/components/AgentTraining";
import { AgentPerformanceMetrics } from "@/components/AgentPerformanceMetrics";
import { NotificationBell } from "@/components/NotificationBell";
import { AgentLeaderboard } from "@/components/AgentLeaderboard";
import { AgentFeedback } from "@/components/AgentFeedback";
import { AgentSupport } from "@/components/AgentSupport";
import { AgentFAQ } from "@/components/AgentFAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareHelp, MessageSquare, HelpCircle } from "lucide-react";

const AgentDashboard = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 animate-in">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">Agent Dashboard</h1>
          <div className="flex items-center gap-4">
            <NotificationBell userId="12345" />
            <Badge variant="outline" className="text-accent animate-pulse">
              Agent ID: #12345
            </Badge>
          </div>
        </div>

        <AgentPerformanceMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AgentReferrals agentId="12345" />
          <AgentTraining agentId="12345" />
        </div>

        <AgentLeaderboard />

        {/* Support, Feedback, and FAQ Section */}
        <Card className="p-6 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={activeSection === 'support' ? 'default' : 'outline'}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => setActiveSection(activeSection === 'support' ? null : 'support')}
            >
              <MessageSquareHelp className="h-4 w-4" />
              Support Center
            </Button>
            <Button
              variant={activeSection === 'feedback' ? 'default' : 'outline'}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => setActiveSection(activeSection === 'feedback' ? null : 'feedback')}
            >
              <MessageSquare className="h-4 w-4" />
              Submit Feedback
            </Button>
            <Button
              variant={activeSection === 'faq' ? 'default' : 'outline'}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => setActiveSection(activeSection === 'faq' ? null : 'faq')}
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