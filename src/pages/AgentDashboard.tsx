import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Ticket, TrendingUp, Award, Check, X, Filter } from "lucide-react";
import { AgentReferrals } from "@/components/AgentReferrals";
import { AgentTraining } from "@/components/AgentTraining";
import { AgentPerformanceMetrics } from "@/components/AgentPerformanceMetrics";
import { NotificationBell } from "@/components/NotificationBell";

interface PromoCode {
  code: string;
  status: "Active" | "Expired";
  redemptions: number;
  isRedeemed: boolean;
}

const AgentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "redeemed" | "unredeemed">("all");

  // Simulated data - replace with actual data from your backend
  const promoCodes: PromoCode[] = [
    { code: "SUMMER23", status: "Active", redemptions: 12, isRedeemed: true },
    { code: "FALL23", status: "Active", redemptions: 8, isRedeemed: false },
    { code: "WINTER23", status: "Expired", redemptions: 0, isRedeemed: false },
  ];

  const filteredCodes = promoCodes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = 
      statusFilter === "all" ? true :
      statusFilter === "redeemed" ? code.isRedeemed :
      !code.isRedeemed;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Agent Dashboard</h1>
          <div className="flex items-center gap-4">
            <NotificationBell userId="12345" />
            <Badge variant="outline" className="text-accent">
              Agent ID: #12345
            </Badge>
          </div>
        </div>

        <AgentPerformanceMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AgentReferrals agentId="12345" />
          <AgentTraining agentId="12345" />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Promo Codes</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative flex-1 md:flex-initial">
              <Input
                placeholder="Search codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
            <select
              className="form-select w-full md:w-auto px-3 py-2 border rounded-md bg-background"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "redeemed" | "unredeemed")}
            >
              <option value="all">All Status</option>
              <option value="redeemed">Redeemed</option>
              <option value="unredeemed">Unredeemed</option>
            </select>
          </div>

          <Card className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Redemptions</TableHead>
                  <TableHead>Redeemed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCodes.map((code) => (
                  <TableRow key={code.code} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{code.code}</TableCell>
                    <TableCell>
                      <Badge
                        variant={code.status === "Active" ? "default" : "secondary"}
                      >
                        {code.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{code.redemptions}</TableCell>
                    <TableCell>
                      {code.isRedeemed ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
