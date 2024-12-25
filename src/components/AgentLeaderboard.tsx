import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sampleLeaderboardData = [
  {
    id: 1,
    name: "Rahul Kumar",
    avatar: "/avatars/rahul.jpg",
    redemptions: 156,
    revenue: 78000,
    status: "Elite",
    trend: "up",
  },
  {
    id: 2,
    name: "Priya Singh",
    avatar: "/avatars/priya.jpg",
    redemptions: 142,
    revenue: 71000,
    status: "Elite",
    trend: "up",
  },
  {
    id: 3,
    name: "Amit Patel",
    avatar: "/avatars/amit.jpg",
    redemptions: 128,
    revenue: 64000,
    status: "Pro",
    trend: "stable",
  },
  {
    id: 4,
    name: "Deepa Sharma",
    avatar: "/avatars/deepa.jpg",
    redemptions: 115,
    revenue: 57500,
    status: "Pro",
    trend: "up",
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    avatar: "/avatars/vikram.jpg",
    redemptions: 98,
    revenue: 49000,
    status: "Rising",
    trend: "up",
  },
];

export function AgentLeaderboard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Performing Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Redemptions</TableHead>
                <TableHead className="text-right hidden md:table-cell">Revenue</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleLeaderboardData.map((agent, index) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={agent.avatar} />
                        <AvatarFallback>{agent.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">{agent.name}</span>
                      <span className="md:hidden">{agent.name.split(' ')[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{agent.redemptions}</TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    ₹{agent.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        agent.status === "Elite"
                          ? "default"
                          : agent.status === "Pro"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {agent.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}