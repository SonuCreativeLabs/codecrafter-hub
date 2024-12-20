import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface Redemption {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  date: string;
}

export const RedemptionLogger = () => {
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [formData, setFormData] = useState({
    code: "",
    customerName: "",
    customerPhone: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRedemption: Redemption = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
    };
    setRedemptions([newRedemption, ...redemptions]);
    setFormData({
      code: "",
      customerName: "",
      customerPhone: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleDelete = (id: string) => {
    setRedemptions(redemptions.filter((r) => r.id !== id));
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Log Redemption</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Promo Code"
            value={formData.code}
            onChange={(e) =>
              setFormData({ ...formData, code: e.target.value })
            }
            required
          />
          <Input
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            required
          />
          <Input
            placeholder="Customer Phone"
            value={formData.customerPhone}
            onChange={(e) =>
              setFormData({ ...formData, customerPhone: e.target.value })
            }
            required
          />
          <Input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            required
          />
        </div>
        <Button type="submit" className="w-full md:w-auto">
          Log Redemption
        </Button>
      </form>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {redemptions.map((redemption) => (
              <TableRow key={redemption.id}>
                <TableCell>{redemption.code}</TableCell>
                <TableCell>{redemption.customerName}</TableCell>
                <TableCell>{redemption.customerPhone}</TableCell>
                <TableCell>{redemption.date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Edit functionality would go here
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(redemption.id)}
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
  );
};