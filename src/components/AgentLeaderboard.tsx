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
import { Trophy, Medal, Star, TrendingUp, Crown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Agent {
  id: string;
  name: string;
  avatar: string;
  redemptions: number;
  revenue: number;
  status: string;
  trend: 'up' | 'stable' | 'down';
  performance: number;
}

const sampleLeaderboardData: Agent[] = [
  {
    id: "1",
    name: "Rahul Kumar",
    avatar: "/avatars/rahul.jpg",
    redemptions: 156,
    revenue: 78000,
    status: "Elite",
    trend: "up",
    performance: 98,
  },
  {
    id: "2",
    name: "Priya Singh",
    avatar: "/avatars/priya.jpg",
    redemptions: 142,
    revenue: 71000,
    status: "Elite",
    trend: "up",
    performance: 95,
  },
  {
    id: "3",
    name: "Amit Patel",
    avatar: "/avatars/amit.jpg",
    redemptions: 128,
    revenue: 64000,
    status: "Pro",
    trend: "stable",
    performance: 92,
  },
  {
    id: "4",
    name: "Deepa Sharma",
    avatar: "/avatars/deepa.jpg",
    redemptions: 115,
    revenue: 57500,
    status: "Pro",
    trend: "up",
    performance: 88,
  },
  {
    id: "5",
    name: "Vikram Malhotra",
    avatar: "/avatars/vikram.jpg",
    redemptions: 98,
    revenue: 49000,
    status: "Rising",
    trend: "up",
    performance: 85,
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="font-bold text-gray-600">#{rank}</span>;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Elite":
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
    case "Pro":
      return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
    case "Rising":
      return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function AgentLeaderboard() {
  const { user } = useAuth();

  const getLoggedInAgentRank = () => {
    if (!user?.uid) return '-';
    return sampleLeaderboardData.findIndex(agent => agent.id === user.uid) + 1 || '-';
  };

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Top Performing Agents
            </CardTitle>
          </div>
          {user && (
            <Badge 
              variant="outline"
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-4 py-1"
            >
              Your Rank: #{getLoggedInAgentRank()}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50/50">
                <TableHead className="w-[60px] text-center">Rank</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Redemptions</TableHead>
                <TableHead className="text-right hidden md:table-cell">Revenue</TableHead>
                <TableHead className="text-center">Performance</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleLeaderboardData.map((agent, index) => (
                <TableRow 
                  key={agent.id}
                  className={`
                    hover:bg-gray-50/50 transition-colors
                    ${agent.id === user?.uid ? 'bg-blue-50/50' : ''}
                  `}
                >
                  <TableCell className="text-center font-medium">
                    <div className="flex items-center justify-center">
                      {getRankIcon(index + 1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={agent.avatar} alt={agent.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {agent.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{agent.name}</p>
                        <p className="text-sm text-gray-500">
                          {agent.trend === "up" ? "↗" : "→"} Trending {agent.trend}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {agent.redemptions}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell font-medium">
                    ₹{agent.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-semibold">{agent.performance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getStatusColor(agent.status)}`}>
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