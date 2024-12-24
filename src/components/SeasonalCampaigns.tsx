import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Trophy,
  Tag,
  Users,
  TrendingUp,
  Gift,
  Plus,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  target: number;
  achieved: number;
  status: "upcoming" | "active" | "completed";
  topAgents: Array<{
    id: string;
    name: string;
    sales: number;
  }>;
}

export function SeasonalCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Christmas Special 2024",
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-25"),
      target: 10000,
      achieved: 7500,
      status: "active",
      topAgents: [
        { id: "a1", name: "John Doe", sales: 2500 },
        { id: "a2", name: "Jane Smith", sales: 2000 },
        { id: "a3", name: "Mike Johnson", sales: 1500 }
      ]
    }
  ]);

  const { toast } = useToast();

  const createCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "New seasonal campaign has been created successfully."
    });
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "upcoming":
        return "text-blue-500 bg-blue-100";
      case "active":
        return "text-green-500 bg-green-100";
      case "completed":
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Seasonal Campaigns</h2>
          <Button onClick={createCampaign} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">Active Campaigns</h3>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-semibold">Total Revenue</h3>
                <p className="text-2xl font-bold">$25,430</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="font-semibold">Participating Agents</h3>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{campaign.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(campaign.status)}`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round((campaign.achieved / campaign.target) * 100)}%</span>
                  </div>
                  <Progress value={(campaign.achieved / campaign.target) * 100} />
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    Top Performing Agents
                  </h4>
                  <div className="space-y-3">
                    {campaign.topAgents.map((agent, index) => (
                      <div key={agent.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            index === 0 ? "bg-yellow-100 text-yellow-600" :
                            index === 1 ? "bg-gray-100 text-gray-600" :
                            "bg-orange-100 text-orange-600"
                          }`}>
                            {index + 1}
                          </span>
                          <span>{agent.name}</span>
                        </div>
                        <span className="font-semibold">${agent.sales.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    View Rewards
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Manage Codes
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
