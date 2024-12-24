import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleDailyData = [
  { date: "Mon", redemptions: 45, revenue: 22500 },
  { date: "Tue", redemptions: 52, revenue: 26000 },
  { date: "Wed", redemptions: 48, revenue: 24000 },
  { date: "Thu", redemptions: 61, revenue: 30500 },
  { date: "Fri", redemptions: 58, revenue: 29000 },
  { date: "Sat", redemptions: 64, revenue: 32000 },
  { date: "Sun", redemptions: 52, revenue: 26000 },
];

const sampleWeeklyData = [
  { date: "Week 1", redemptions: 320, revenue: 160000 },
  { date: "Week 2", redemptions: 385, revenue: 192500 },
  { date: "Week 3", redemptions: 402, revenue: 201000 },
  { date: "Week 4", redemptions: 428, revenue: 214000 },
];

const sampleMonthlyData = [
  { date: "Jan", redemptions: 1250, revenue: 625000 },
  { date: "Feb", redemptions: 1420, revenue: 710000 },
  { date: "Mar", redemptions: 1680, revenue: 840000 },
  { date: "Apr", redemptions: 1520, revenue: 760000 },
  { date: "May", redemptions: 1750, revenue: 875000 },
  { date: "Jun", redemptions: 1820, revenue: 910000 },
];

export function RedemptionTrends() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Redemption Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleDailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="redemptions"
                    stroke="#8884d8"
                    name="Redemptions"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="redemptions"
                    stroke="#8884d8"
                    name="Redemptions"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="redemptions"
                    stroke="#8884d8"
                    name="Redemptions"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}