import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line } from "react-chartjs-2";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot, DocumentData } from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Agent {
  id: string;
  name: string;
  redemptionsCount: number;
  rank?: number;
}

export function AgentLeaderboard() {
  const [timeRange, setTimeRange] = useState("weekly");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const agentsRef = collection(db, "agents");
    const q = query(agentsRef, orderBy("redemptionsCount", "desc"), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const agentsData: Agent[] = [];
      snapshot.forEach((doc) => {
        const index = agentsData.length;
        agentsData.push({
          id: doc.id,
          ...doc.data() as Omit<Agent, 'id'>,
          rank: index + 1
        });
      });
      setAgents(agentsData);

      setChartData({
        labels: agentsData.map(agent => agent.name),
        datasets: [
          {
            label: 'Redemptions',
            data: agentsData.map(agent => agent.redemptionsCount),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      });
    });

    return () => unsubscribe();
  }, [timeRange]);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agent Leaderboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px]">
        {chartData && <Line data={chartData} options={{ maintainAspectRatio: false }} />}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Agent Name</TableHead>
            <TableHead>Redemptions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell>{agent.rank}</TableCell>
              <TableCell>{agent.name}</TableCell>
              <TableCell>{agent.redemptionsCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
