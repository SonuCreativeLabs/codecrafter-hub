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
import { PlusCircle, Users, Ticket, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const [agents] = useState([
    { id: 1, name: "John Doe", codes: 12, redemptions: 45, performance: "High" },
    { id: 2, name: "Jane Smith", codes: 8, redemptions: 32, performance: "Medium" },
  ]);

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <Users className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <h3 className="text-2xl font-bold">{agents.length}</h3>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <Ticket className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Active Promo Codes</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Total Redemptions</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
            </div>
          </Card>
        </div>

        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Agent Performance</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Assigned Codes</TableHead>
                <TableHead>Redemptions</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.codes}</TableCell>
                  <TableCell>{agent.redemptions}</TableCell>
                  <TableCell>{agent.performance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;