import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const performanceData = [
  { name: "John Doe", redemptions: 45, target: 50 },
  { name: "Jane Smith", redemptions: 32, target: 40 },
  { name: "Mike Johnson", redemptions: 28, target: 35 },
  { name: "Sarah Williams", redemptions: 37, target: 45 },
  { name: "David Brown", redemptions: 41, target: 45 },
  { name: "Emily Davis", redemptions: 29, target: 35 },
];

const statusData = [
  { name: "Unassigned", value: 50, color: "#0088FE" },
  { name: "Assigned", value: 100, color: "#00C49F" },
  { name: "Redeemed", value: 77, color: "#FFBB28" },
  { name: "Expired", value: 23, color: "#FF8042" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function AdminReports() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2">Total Promo Codes</h3>
          <p className="text-3xl font-bold text-blue-600">227</p>
          <p className="text-sm text-muted-foreground mt-2">↑ 12% from last month</p>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2">Assigned Codes</h3>
          <p className="text-3xl font-bold text-green-600">100</p>
          <p className="text-sm text-muted-foreground mt-2">↑ 8% from last month</p>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2">Total Redemptions</h3>
          <p className="text-3xl font-bold text-purple-600">77</p>
          <p className="text-sm text-muted-foreground mt-2">↑ 15% from last month</p>
        </Card>
      </div>

      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold mb-4">Agent Performance</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="redemptions" fill="#0088FE" name="Current Redemptions" />
              <Bar dataKey="target" fill="#00C49F" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold mb-4">Promo Codes Status</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) =>
                  `${name} (${value}): ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1500}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}