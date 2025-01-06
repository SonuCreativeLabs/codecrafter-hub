import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Filter, TrendingUp } from "lucide-react";

interface AgentPerformance {
  id: string;
  name: string;
  totalSales: number;
  redemptionRate: number;
  customerSatisfaction: number;
  activePromos: number;
  lastActivity: Date;
}

export function AgentMonitoring() {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [performanceFilter, setPerformanceFilter] = useState("all");

  const performanceData = [
    {
      id: "1",
      name: "John Doe",
      totalSales: 15000,
      redemptionRate: 85,
      customerSatisfaction: 4.8,
      activePromos: 12,
      lastActivity: new Date()
    },
    // ... Add more sample data
  ];

  const columns = [
    { accessorKey: "name", header: "Agent Name" },
    { accessorKey: "totalSales", header: "Total Sales" },
    { accessorKey: "redemptionRate", header: "Redemption Rate %" },
    { accessorKey: "customerSatisfaction", header: "Customer Satisfaction" },
    { accessorKey: "activePromos", header: "Active Promos" },
    {
      accessorKey: "lastActivity",
      header: "Last Activity",
      cell: ({ row }: any) => new Date(row.getValue("lastActivity")).toLocaleDateString()
    }
  ];

  return (
    <div className="space-y-6 p-6 animate-fadeIn">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Agent Performance Monitor</h2>
          <div className="flex flex-wrap gap-4">
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
            />
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Performance" />
              </SelectTrigger>
              <SelectContent>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">Average Performance</h3>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </Card>
          {/* Add more summary cards */}
        </div>

        <div className="mb-8 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="redemptionRate" stroke="#8884d8" />
              <Line type="monotone" dataKey="customerSatisfaction" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <DataTable
          columns={columns}
          data={performanceData}
        />
      </Card>
    </div>
  );
}