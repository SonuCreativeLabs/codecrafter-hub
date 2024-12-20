import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Users, Tag, TrendingUp } from "lucide-react";
import { AdminNav } from "@/components/AdminNav";
import { PromoCodeGenerator } from "@/components/PromoCodeGenerator";
import { AgentManagement } from "@/components/AgentManagement";
import { AdminReports } from "@/components/AdminReports";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [agents] = useState([
    { id: 1, name: "John Doe", codes: 12, redemptions: 45, performance: "High" },
    { id: 2, name: "Jane Smith", codes: 8, redemptions: 32, performance: "Medium" },
  ]);

  const renderContent = () => {
    switch (currentView) {
      case "promo-codes":
        return <PromoCodeGenerator />;
      case "agents":
        return <AgentManagement />;
      case "reports":
        return <AdminReports />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Tag className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Promo Codes</p>
                  <h3 className="text-xl font-bold">156</h3>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                  <h3 className="text-xl font-bold">{agents.length}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Redemptions</p>
                  <h3 className="text-xl font-bold">77</h3>
                </div>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        <AdminNav currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-4 lg:p-6 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h1 className="text-2xl font-bold">{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1>
              {currentView === "agents" && (
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Agent
                </Button>
              )}
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;