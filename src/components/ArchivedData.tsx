import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Archive, Download, Search, Filter } from "lucide-react";

interface ArchivedItem {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  redemptionDate: string;
  amount: number;
  status: "completed" | "cancelled" | "expired";
  agentName: string;
}

const mockArchivedData: ArchivedItem[] = [
  {
    id: "AR001",
    code: "COOL123",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43210",
    redemptionDate: "2023-12-15",
    amount: 5000,
    status: "completed",
    agentName: "Priya Singh"
  },
  {
    id: "AR002",
    code: "COOL124",
    customerName: "Meera Patel",
    customerPhone: "+91 98765 43211",
    redemptionDate: "2023-12-14",
    status: "cancelled",
    amount: 3000,
    agentName: "Amit Patel"
  },
  {
    id: "AR003",
    code: "COOL125",
    customerName: "Suresh Shah",
    customerPhone: "+91 98765 43212",
    redemptionDate: "2023-12-13",
    amount: 7500,
    status: "completed",
    agentName: "Rahul Kumar"
  },
  {
    id: "AR004",
    code: "COOL126",
    customerName: "Anita Desai",
    customerPhone: "+91 98765 43213",
    redemptionDate: "2023-12-12",
    amount: 4500,
    status: "expired",
    agentName: "Deepa Sharma"
  },
  {
    id: "AR005",
    code: "COOL127",
    customerName: "Vikram Malhotra",
    customerPhone: "+91 98765 43214",
    redemptionDate: "2023-12-11",
    amount: 6000,
    status: "completed",
    agentName: "Priya Singh"
  }
];

export function ArchivedData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<ArchivedItem[]>(mockArchivedData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockArchivedData.filter(item =>
      item.code.toLowerCase().includes(term.toLowerCase()) ||
      item.customerName.toLowerCase().includes(term.toLowerCase()) ||
      item.customerPhone.includes(term) ||
      item.agentName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const getStatusColor = (status: ArchivedItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "expired":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Archive className="h-5 w-5" />
          Archived Records
        </CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by code, customer, or agent..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Agent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.customerPhone}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(item.redemptionDate).toLocaleDateString()}</TableCell>
                  <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={`${getStatusColor(item.status)} text-white`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.agentName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}