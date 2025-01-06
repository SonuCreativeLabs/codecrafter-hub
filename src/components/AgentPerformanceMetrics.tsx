import { Card } from "@/components/ui/card";
import { TrendingUp, Award, Target, Users, Star, Trophy, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard = ({ title, value, icon, description, trend }: MetricCardProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/5 rounded-xl">{icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
                {trend && (
                  <div className={`flex items-center mt-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.isPositive ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span>{Math.abs(trend.value)}% from last month</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function AgentPerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Success Rate"
        value="85%"
        icon={<Star className="h-6 w-6 text-primary" />}
        description="Percentage of successful redemptions"
        trend={{ value: 5.2, isPositive: true }}
      />
      <MetricCard
        title="Performance Score"
        value="92"
        icon={<Trophy className="h-6 w-6 text-primary" />}
        description="Overall performance rating"
        trend={{ value: 3.8, isPositive: true }}
      />
      <MetricCard
        title="Monthly Target"
        value="78%"
        icon={<Target className="h-6 w-6 text-primary" />}
        description="Progress towards monthly goal"
        trend={{ value: 2.1, isPositive: false }}
      />
      <MetricCard
        title="Active Referrals"
        value="23"
        icon={<Users className="h-6 w-6 text-primary" />}
        description="Number of active referrals this month"
        trend={{ value: 12.5, isPositive: true }}
      />
    </div>
  );
}