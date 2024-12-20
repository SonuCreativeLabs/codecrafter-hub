import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function AgentManagement() {
  const [agents, setAgents] = useState([
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

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Agent</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Agent Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" placeholder="+1234567890" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </div>
        <Button className="mt-4">Add Agent</Button>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Agents List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Assigned Codes</TableHead>
              <TableHead>Total Redemptions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.mobile}</TableCell>
                <TableCell>{agent.assignedCodes}</TableCell>
                <TableCell>{agent.redemptions}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}