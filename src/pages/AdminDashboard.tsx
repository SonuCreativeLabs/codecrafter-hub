import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Users, Tag, TrendingUp, Activity } from "lucide-react";
import { AdminNav } from "@/components/AdminNav";
import { PromoCodeGenerator } from "@/components/PromoCodeGenerator";
import { AgentManagement } from "@/components/AgentManagement";
import { AdminReports } from "@/components/AdminReports";
import { AgentLeaderboard } from "@/components/AgentLeaderboard";
import { NotificationBell } from "@/components/NotificationBell";
import { ArchivedData } from "@/components/ArchivedData";
import { RedemptionTrends } from "@/components/RedemptionTrends";
import { CustomizableDashboard } from "@/components/CustomizableDashboard";
import { AgentFeedbackCollection } from "@/components/AgentFeedbackCollection";
import { BulkDataManagement } from "@/components/BulkDataManagement";
import { GeoLocationTracking } from "@/components/GeoLocationTracking";
import { ActivityLogs } from "@/components/ActivityLogs";
import { CustomerEngagement } from "@/components/CustomerEngagement";
import { SeasonalCampaigns } from "@/components/SeasonalCampaigns";
import { CustomBranding } from "@/components/CustomBranding";
import { AgentMonitoring } from "@/components/AgentMonitoring";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const { toast } = useToast();
  const [agents] = useState([
    { id: 1, name: "John Doe", codes: 12, redemptions: 45, performance: "High" },
    { id: 2, name: "Jane Smith", codes: 8, redemptions: 32, performance: "Medium" },
    { id: 3, name: "Mike Johnson", codes: 15, redemptions: 38, performance: "High" },
    { id: 4, name: "Sarah Williams", codes: 10, redemptions: 28, performance: "Medium" },
  ]);

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "New campaign has been created successfully.",
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case "agent-monitoring":
        return <AgentMonitoring />;
      case "custom-dashboard":
        return <CustomizableDashboard />;
      case "promo-codes":
        return <PromoCodeGenerator />;
      case "agents":
        return <AgentManagement />;
      case "bulk-data":
        return <BulkDataManagement />;
      case "map-view":
        return <GeoLocationTracking />;
      case "feedback":
        return <AgentFeedbackCollection />;
      case "engagement":
        return <CustomerEngagement />;
      case "campaigns":
        return <SeasonalCampaigns />;
      case "branding":
        return <CustomBranding />;
      case "reports":
        return <AdminReports />;
      case "activity-logs":
        return <ActivityLogs />;
      case "archived-data":
        return <ArchivedData />;
      default:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 glass-card cursor-pointer" 
                    onClick={() => setCurrentView("promo-codes")}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Tag className="h-10 w-10 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Promo Codes</p>
                    <h3 className="text-2xl font-bold">156</h3>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 glass-card cursor-pointer" 
                    onClick={() => setCurrentView("agents")}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users className="h-10 w-10 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Agents</p>
                    <h3 className="text-2xl font-bold">{agents.length}</h3>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 glass-card cursor-pointer" 
                    onClick={() => setCurrentView("activity-logs")}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Activity className="h-10 w-10 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recent Activities</p>
                    <h3 className="text-2xl font-bold">24</h3>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                <ActivityLogs />
              </Card>
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">Agent Performance</h3>
                <AgentLeaderboard />
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <NotificationBell userId="admin" userRole="admin" />
            <Button 
              onClick={handleCreateCampaign} 
              className="flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create Campaign</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <AdminNav currentView={currentView} setCurrentView={setCurrentView} />
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
