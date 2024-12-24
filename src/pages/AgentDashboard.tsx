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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AgentDashboard = () => {
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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AgentReferrals agentId="12345" />
              <AgentTraining agentId="12345" />
            </div>
            <AgentLeaderboard />
          </TabsContent>

          <TabsContent value="support">
            <AgentSupport agentId="12345" />
          </TabsContent>

          <TabsContent value="feedback">
            <AgentFeedback agentId="12345" />
          </TabsContent>

          <TabsContent value="faq">
            <AgentFAQ />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDashboard;