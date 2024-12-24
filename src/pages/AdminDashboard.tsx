import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Users, Tag, TrendingUp } from "lucide-react";
import { AdminNav } from "@/components/AdminNav";
import { PromoCodeGenerator } from "@/components/PromoCodeGenerator";
import { AgentManagement } from "@/components/AgentManagement";
import { AdminReports } from "@/components/AdminReports";
import { AgentLeaderboard } from "@/components/AgentLeaderboard";
import { NotificationBell } from "@/components/NotificationBell";
import { ArchivedData } from "@/components/ArchivedData";
import { RedemptionTrends } from "@/components/RedemptionTrends";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [agents] = useState([
    { id: 1, name: "John Doe", codes: 12, redemptions: 45, performance: "High" },
    { id: 2, name: "Jane Smith", codes: 8, redemptions: 32, performance: "Medium" },
    { id: 3, name: "Mike Johnson", codes: 15, redemptions: 38, performance: "High" },
    { id: 4, name: "Sarah Williams", codes: 10, redemptions: 28, performance: "Medium" },
  ]);

  const renderContent = () => {
    switch (currentView) {
      case "promo-codes":
        return <PromoCodeGenerator />;
      case "agents":
        return <AgentManagement />;
      case "reports":
        return <AdminReports />;
      case "leaderboard":
        return <AgentLeaderboard />;
      case "redemption-trends":
        return <RedemptionTrends />;
      case "archived-data":
        return <ArchivedData />;
      default:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
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

              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
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

              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-10 w-10 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Redemptions</p>
                    <h3 className="text-2xl font-bold">77</h3>
                  </div>
                </div>
              </Card>
            </div>
            <AgentLeaderboard />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <AdminNav currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm animate-slideIn">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <div className="flex items-center gap-4">
                <NotificationBell userId="admin" />
                {currentView === "agents" && (
                  <Button className="animate-buttonPress hover:scale-105 transition-transform">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Agent
                  </Button>
                )}
              </div>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;