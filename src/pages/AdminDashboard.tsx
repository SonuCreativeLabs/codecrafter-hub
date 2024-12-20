import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <Tag className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Promo Codes</p>
                  <h3 className="text-2xl font-bold">156</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <Users className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                  <h3 className="text-2xl font-bold">{agents.length}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <TrendingUp className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Redemptions</p>
                  <h3 className="text-2xl font-bold">77</h3>
                </div>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminNav currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              {currentView === "agents" && (
                <Button>
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