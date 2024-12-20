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

  const totalRedemptions = promoCodes.reduce((acc, code) => acc + code.redemptions, 0);
  const activeCodesCount = promoCodes.filter(code => code.status === "Active").length;

  const filteredCodes = promoCodes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = 
      statusFilter === "all" ? true :
      statusFilter === "redeemed" ? code.isRedeemed :
      !code.isRedeemed;
    return matchesSearch && matchesStatus;
  });

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
                <h3 className="text-2xl font-bold">{activeCodesCount}</h3>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Total Redemptions</p>
                <h3 className="text-2xl font-bold">{totalRedemptions}</h3>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center space-x-4">
              <Award className="h-10 w-10 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Performance Score</p>
                <h3 className="text-2xl font-bold">
                  {Math.round((totalRedemptions / activeCodesCount) * 100)}%
                </h3>
              </div>
            </div>
          </Card>
        </div>

        <Card className="glass-card p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-semibold">Your Promo Codes</h2>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
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
            </div>

            <div className="overflow-x-auto">
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;