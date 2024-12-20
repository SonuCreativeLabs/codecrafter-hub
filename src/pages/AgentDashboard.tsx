import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ticket, TrendingUp, Award } from "lucide-react";

const AgentDashboard = () => {
  const promoCodes = [
    { code: "SUMMER23", status: "Active", redemptions: 12 },
    { code: "FALL23", status: "Expired", redemptions: 8 },
  ];

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Agent Dashboard</h1>
          <Badge variant="outline" className="text-accent">
            Agent ID: #12345
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <Ticket className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Active Codes</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Total Redemptions</p>
                <h3 className="text-2xl font-bold">20</h3>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <Award className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Performance Score</p>
                <h3 className="text-2xl font-bold">92%</h3>
              </div>
            </div>
          </Card>
        </div>

        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Your Promo Codes</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Redemptions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoCodes.map((code) => (
                <TableRow key={code.code}>
                  <TableCell className="font-medium">{code.code}</TableCell>
                  <TableCell>
                    <Badge
                      variant={code.status === "Active" ? "default" : "secondary"}
                    >
                      {code.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{code.redemptions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;