import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  action: string;
  details: string;
  type: "code" | "auth" | "system";
  status: "success" | "warning" | "error";
}

const statusColors = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

const typeColors = {
  code: "bg-blue-100 text-blue-800",
  auth: "bg-purple-100 text-purple-800",
  system: "bg-gray-100 text-gray-800",
};

export function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch logs
    const fetchLogs = async () => {
      try {
        // In a real app, this would be an API call
        const mockLogs: LogEntry[] = [
          {
            id: "1",
            timestamp: new Date(),
            userId: "12345",
            userName: "John Doe",
            action: "Generated Promo Codes",
            details: "Created 100 new promo codes",
            type: "code",
            status: "success"
          },
          {
            id: "2",
            timestamp: new Date(Date.now() - 3600000),
            userId: "12345",
            userName: "John Doe",
            action: "Login Attempt",
            details: "Successful login from 192.168.1.1",
            type: "auth",
            status: "success"
          },
          {
            id: "3",
            timestamp: new Date(Date.now() - 7200000),
            userId: "67890",
            userName: "Jane Smith",
            action: "Code Assignment",
            details: "Assigned codes to Agent ID: 54321",
            type: "code",
            status: "warning"
          }
        ];
        
        setLogs(mockLogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || log.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const handleExport = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Details", "Type", "Status"],
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.userName,
        log.action,
        log.details,
        log.type,
        log.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Activity Logs</h2>
        <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by user or action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="code">Code Actions</SelectItem>
            <SelectItem value="auth">Authentication</SelectItem>
            <SelectItem value="system">System Events</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading logs...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="max-w-[300px]">Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap">
                    {log.timestamp.toLocaleString()}
                  </TableCell>
                  <TableCell>{log.userName}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {log.details}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={typeColors[log.type]}>
                      {log.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[log.status]}>
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
