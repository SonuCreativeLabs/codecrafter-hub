import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function AgentSupport({ agentId }: { agentId: string }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Ticket Created",
      description: "We'll get back to you as soon as possible.",
    });
    setCategory("");
    setDescription("");
  };

  return (
    <Card className="p-6 space-y-6 animate-in slide-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Support Center</h2>
        <p className="text-muted-foreground">
          Need help? Create a support ticket and we'll assist you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical">Technical Issue</SelectItem>
            <SelectItem value="account">Account Related</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[150px]"
        />

        <Button type="submit" className="w-full">
          Submit Ticket
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="font-semibold">Recent Tickets</h3>
        <div className="space-y-4">
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Technical Issue</h4>
                <p className="text-sm text-muted-foreground">
                  Login verification not working
                </p>
              </div>
              <Badge variant="outline" className="bg-yellow-100">
                In Progress
              </Badge>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Opened 1 day ago
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}