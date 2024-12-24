import { Card } from "@/components/ui/card";
import { TrendingUp, Award, Target, Users } from "lucide-react";
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
}

const MetricCard = ({ title, value, icon, description }: MetricCardProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
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
        icon={<TrendingUp className="h-6 w-6 text-primary" />}
        description="Percentage of successful redemptions"
      />
      <MetricCard
        title="Performance Score"
        value="92"
        icon={<Award className="h-6 w-6 text-primary" />}
        description="Overall performance rating"
      />
      <MetricCard
        title="Monthly Target"
        value="78%"
        icon={<Target className="h-6 w-6 text-primary" />}
        description="Progress towards monthly goal"
      />
      <MetricCard
        title="Active Referrals"
        value="23"
        icon={<Users className="h-6 w-6 text-primary" />}
        description="Number of active referrals this month"
      />
    </div>
  );
}