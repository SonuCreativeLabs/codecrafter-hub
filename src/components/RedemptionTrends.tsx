import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

const sampleDailyData = [
  { date: "Mon", redemptions: 45, revenue: 22500, growth: 5.2 },
  { date: "Tue", redemptions: 52, revenue: 26000, growth: 15.6 },
  { date: "Wed", redemptions: 48, revenue: 24000, growth: -7.7 },
  { date: "Thu", redemptions: 61, revenue: 30500, growth: 27.1 },
  { date: "Fri", redemptions: 58, revenue: 29000, growth: -4.9 },
  { date: "Sat", redemptions: 64, revenue: 32000, growth: 10.3 },
  { date: "Sun", redemptions: 52, revenue: 26000, growth: -18.8 },
];

const sampleWeeklyData = [
  { date: "Week 1", redemptions: 320, revenue: 160000, growth: 0 },
  { date: "Week 2", redemptions: 385, revenue: 192500, growth: 20.3 },
  { date: "Week 3", redemptions: 402, revenue: 201000, growth: 4.4 },
  { date: "Week 4", redemptions: 428, revenue: 214000, growth: 6.5 },
];

const sampleMonthlyData = [
  { date: "Jan", redemptions: 1250, revenue: 625000, growth: 0 },
  { date: "Feb", redemptions: 1420, revenue: 710000, growth: 13.6 },
  { date: "Mar", redemptions: 1680, revenue: 840000, growth: 18.3 },
  { date: "Apr", redemptions: 1520, revenue: 760000, growth: -9.5 },
  { date: "May", redemptions: 1750, revenue: 875000, growth: 15.1 },
  { date: "Jun", redemptions: 1820, revenue: 910000, growth: 4.0 },
];

export function RedemptionTrends() {
  const formatCurrency = (value: number) => `₹${value.toLocaleString()}`;
  
  const renderStats = (data: typeof sampleDailyData) => {
    const latest = data[data.length - 1];
    const growth = latest.growth;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{latest.redemptions}</div>
            <p className="text-muted-foreground">Total Redemptions</p>
            <div className={`flex items-center mt-2 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span className="text-sm">{Math.abs(growth)}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{formatCurrency(latest.revenue)}</div>
            <p className="text-muted-foreground">Total Revenue</p>
            <div className={`flex items-center mt-2 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span className="text-sm">{Math.abs(growth)}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{formatCurrency(Math.round(latest.revenue / latest.redemptions))}</div>
            <p className="text-muted-foreground">Average Value</p>
            <div className="text-sm text-muted-foreground mt-2">
              Per redemption
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Redemption Trends</CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            {renderStats(sampleDailyData)}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleDailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === "revenue" ? formatCurrency(value) : value,
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="redemptions"
                    stroke="#8884d8"
                    name="Redemptions"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            {renderStats(sampleWeeklyData)}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === "revenue" ? formatCurrency(value) : value,
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="redemptions"
                    stroke="#8884d8"
                    name="Redemptions"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            {renderStats(sampleMonthlyData)}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === "revenue" ? formatCurrency(value) : value,
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="redemptions"
                    stroke="#8884d8"
                    name="Redemptions"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Revenue"
                    strokeWidth={2}
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