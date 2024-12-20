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
import { Edit2, Trash2, UserPlus } from "lucide-react";

export function PromoCodeGenerator() {
  const [prefix, setPrefix] = useState("");
  const [count, setCount] = useState("");
  const [promoCodes, setPromoCodes] = useState([
    { id: 1, code: "COOL1", status: "Unassigned", agent: "-" },
    { id: 2, code: "COOL2", status: "Assigned", agent: "John Doe" },
  ]);

  const generateCodes = () => {
    const newCodes = Array.from({ length: parseInt(count) }, (_, i) => ({
      id: promoCodes.length + i + 1,
      code: `${prefix}${i + 1}`,
      status: "Unassigned",
      agent: "-",
    }));
    setPromoCodes([...promoCodes, ...newCodes]);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Generate Promo Codes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <Button className="mt-4" onClick={generateCodes}>
          Generate Codes
        </Button>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Promo Codes List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promoCodes.map((code) => (
              <TableRow key={code.id}>
                <TableCell>{code.code}</TableCell>
                <TableCell>{code.status}</TableCell>
                <TableCell>{code.agent}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <UserPlus className="h-4 w-4" />
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