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
  { name: "John Doe", redemptions: 45 },
  { name: "Jane Smith", redemptions: 32 },
  { name: "Mike Johnson", redemptions: 28 },
  { name: "Sarah Williams", redemptions: 37 },
];

const statusData = [
  { name: "Unassigned", value: 50 },
  { name: "Assigned", value: 100 },
  { name: "Redeemed", value: 77 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function AdminReports() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Promo Codes</h3>
          <p className="text-3xl font-bold">227</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Assigned Codes</h3>
          <p className="text-3xl font-bold">100</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Redemptions</h3>
          <p className="text-3xl font-bold">77</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Agent Performance</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="redemptions" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Promo Codes Status</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
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