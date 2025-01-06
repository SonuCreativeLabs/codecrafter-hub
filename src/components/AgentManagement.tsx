import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  mobile: string;
  assignedCodes: number;
  redemptions: number;
}

export function AgentManagement() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
      name: "John Doe",
      mobile: "+1234567890",
      assignedCodes: 12,
      redemptions: 45,
    },
    {
      id: 2,
      name: "Jane Smith",
      mobile: "+1987654321",
      assignedCodes: 8,
      redemptions: 32,
    },
  ]);

  const [newAgent, setNewAgent] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewAgent((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.mobile || !newAgent.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...agents.map((agent) => agent.id)) + 1;
    const agentToAdd: Agent = {
      id: newId,
      name: newAgent.name,
      mobile: newAgent.mobile,
      assignedCodes: 0,
      redemptions: 0,
    };

    setAgents((prev) => [...prev, agentToAdd]);
    setNewAgent({ name: "", mobile: "", password: "" });
    
    toast({
      title: "Success",
      description: "Agent added successfully",
    });
  };

  const handleDeleteAgent = (id: number) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id));
    toast({
      title: "Success",
      description: "Agent deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Agent</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="Agent Name" 
              value={newAgent.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input 
              id="mobile" 
              placeholder="+1234567890" 
              value={newAgent.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={newAgent.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button className="mt-4" onClick={handleAddAgent}>Add Agent</Button>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Agents List</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Assigned Codes</TableHead>
                <TableHead>Total Redemptions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.mobile}</TableCell>
                  <TableCell>{agent.assignedCodes}</TableCell>
                  <TableCell>{agent.redemptions}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDeleteAgent(agent.id)}
                      >
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