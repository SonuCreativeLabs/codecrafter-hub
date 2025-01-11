import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockAgents = [
  {
    id: "1",
    name: "John Doe",
    area: "Mumbai Central",
    totalSales: 15000,
    redemptionRate: 85,
    satisfaction: 4.8,
    activePromos: 12,
    status: "active"
  },
  {
    id: "2",
    name: "Jane Smith",
    area: "Andheri West",
    totalSales: 12000,
    redemptionRate: 75,
    satisfaction: 4.5,
    activePromos: 8,
    status: "active"
  },
  {
    id: "3",
    name: "Mike Johnson",
    area: "Bandra East",
    totalSales: 18000,
    redemptionRate: 90,
    satisfaction: 4.9,
    activePromos: 15,
    status: "active"
  },
  {
    id: "4",
    name: "Sarah Williams",
    area: "Colaba",
    totalSales: 9000,
    redemptionRate: 65,
    satisfaction: 4.2,
    activePromos: 6,
    status: "inactive"
  }
];

export function AgentMonitoring() {
  const [searchQuery, setSearchQuery] = useState("");
  const [performanceFilter, setPerformanceFilter] = useState("all");

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (performanceFilter) {
      case "high":
        return agent.redemptionRate >= 80;
      case "medium":
        return agent.redemptionRate >= 60 && agent.redemptionRate < 80;
      case "low":
        return agent.redemptionRate < 60;
      default:
        return true;
    }
  });

  return (
    <div className="p-6">
      <Card className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Agent Performance Monitor</h2>
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Search agents..."
              className="w-[200px] bg-background border-white/20 transition-all hover:border-accent focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select 
              defaultValue="all" 
              onValueChange={setPerformanceFilter}
              value={performanceFilter}
            >
              <SelectTrigger className="w-[180px] bg-background border-white/20 transition-all hover:border-accent focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Filter by Performance" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-sm border border-white/20 shadow-lg rounded-lg p-1">
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="high">High Performers</SelectItem>
                <SelectItem value="medium">Medium Performers</SelectItem>
                <SelectItem value="low">Low Performers</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">Average Performance</h3>
                <p className="text-2xl font-bold">
                  {(filteredAgents.reduce((sum, agent) => sum + agent.redemptionRate, 0) / filteredAgents.length || 0).toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-semibold">Active Agents</h3>
                <p className="text-2xl font-bold">
                  {filteredAgents.filter(a => a.status === "active").length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="font-semibold">Total Sales</h3>
                <p className="text-2xl font-bold">
                  ₹{filteredAgents.reduce((sum, agent) => sum + agent.totalSales, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Agents Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Redemption Rate</TableHead>
                <TableHead>Satisfaction</TableHead>
                <TableHead>Active Promos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.area}</TableCell>
                  <TableCell>₹{agent.totalSales.toLocaleString()}</TableCell>
                  <TableCell>{agent.redemptionRate}%</TableCell>
                  <TableCell>{agent.satisfaction} ⭐</TableCell>
                  <TableCell>{agent.activePromos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}