import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function AgentFeedback({ agentId }: { agentId: string }) {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally submit to backend
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We'll review it shortly.",
    });
    setFeedback("");
  };

  return (
    <Card className="p-6 space-y-6 animate-in slide-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Submit Feedback</h2>
        <p className="text-muted-foreground">
          Your feedback helps us improve our services.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Share your thoughts, suggestions, or concerns..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="min-h-[150px]"
        />
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="font-semibold">Previous Feedback</h3>
        <div className="space-y-4">
          <Card className="p-4 hover:shadow-md transition-shadow">
            <p className="text-sm text-muted-foreground">
              "The new dashboard layout is much more intuitive!"
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-green-600">Addressed</span>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}