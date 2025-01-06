import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, UserPlus } from "lucide-react";

interface PromoCode {
  id: number;
  code: string;
  status: string;
  agent: string;
}

interface Agent {
  id: string;
  name: string;
}

export function PromoCodeGenerator() {
  const [prefix, setPrefix] = useState("");
  const [count, setCount] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    { id: 1, code: "COOL1", status: "Unassigned", agent: "-" },
    { id: 2, code: "COOL2", status: "Assigned", agent: "John Doe" },
  ]);

  // Mock agents data - in real app, this would come from your backend
  const agents: Agent[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ];

  const { toast } = useToast();

  const generateCodes = () => {
    if (!prefix || !count) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const numCodes = parseInt(count);
    const newCodes = Array.from({ length: numCodes }, (_, i) => ({
      id: promoCodes.length + i + 1,
      code: `${prefix}${i + 1}`,
      status: "Unassigned",
      agent: "-",
    }));

    setPromoCodes([...promoCodes, ...newCodes]);
    toast({
      title: "Success",
      description: `Generated ${numCodes} new promo codes`,
    });
  };

  const assignToAgent = (codeIds: number[], agentName: string) => {
    setPromoCodes(prev =>
      prev.map(code =>
        codeIds.includes(code.id)
          ? { ...code, status: "Assigned", agent: agentName }
          : code
      )
    );
    toast({
      title: "Success",
      description: `Assigned ${codeIds.length} codes to ${agentName}`,
    });
  };

  const handleBulkAssign = () => {
    if (!selectedAgent) {
      toast({
        title: "Error",
        description: "Please select an agent",
        variant: "destructive",
      });
      return;
    }

    const unassignedCodes = promoCodes
      .filter(code => code.status === "Unassigned")
      .map(code => code.id);

    if (unassignedCodes.length === 0) {
      toast({
        title: "Error",
        description: "No unassigned codes available",
        variant: "destructive",
      });
      return;
    }

    const agent = agents.find(a => a.id === selectedAgent);
    if (agent) {
      assignToAgent(unassignedCodes, agent.name);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Generate Promo Codes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prefix">Code Prefix</Label>
            <Input
              id="prefix"
              placeholder="e.g., COOL"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">Number of Codes</Label>
            <Input
              id="count"
              type="number"
              placeholder="e.g., 100"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Assign to Agent (Optional)</Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button onClick={generateCodes}>Generate Codes</Button>
          <Button variant="secondary" onClick={handleBulkAssign}>
            Bulk Assign to Agent
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Promo Codes List</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell>{code.code}</TableCell>
                  <TableCell>{code.status}</TableCell>
                  <TableCell>{code.agent}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}