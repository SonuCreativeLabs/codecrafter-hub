import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter, Star, MessageSquare } from "lucide-react";

interface Feedback {
  id: string;
  agentId: string;
  agentName: string;
  category: string;
  rating: number;
  comment: string;
  date: Date;
  status: "new" | "reviewed" | "addressed";
}

const mockFeedback: Feedback[] = [
  {
    id: "1",
    agentId: "A123",
    agentName: "John Doe",
    category: "App Interface",
    rating: 4,
    comment: "The dashboard is very intuitive, but could use more customization options.",
    date: new Date(),
    status: "new"
  },
  {
    id: "2",
    agentId: "A124",
    agentName: "Jane Smith",
    category: "Promo Code System",
    rating: 3,
    comment: "Sometimes the code generation takes too long.",
    date: new Date(Date.now() - 86400000),
    status: "reviewed"
  }
];

export function AgentFeedbackCollection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedback);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    reviewed: "bg-yellow-100 text-yellow-800",
    addressed: "bg-green-100 text-green-800"
  };

  const handleExport = () => {
    const csvContent = [
      ["Date", "Agent", "Category", "Rating", "Comment", "Status"],
      ...feedbacks.map(f => [
        f.date.toLocaleDateString(),
        f.agentName,
        f.category,
        f.rating,
        f.comment,
        f.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agent-feedback-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredFeedback = feedbacks.filter(feedback => {
    const matchesSearch = 
      feedback.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || feedback.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Agent Feedback</CardTitle>
        <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="App Interface">App Interface</SelectItem>
              <SelectItem value="Promo Code System">Promo Code System</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="max-w-[300px]">Comment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedback.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>{feedback.date.toLocaleDateString()}</TableCell>
                  <TableCell>{feedback.agentName}</TableCell>
                  <TableCell>{feedback.category}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {renderStars(feedback.rating)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {feedback.comment}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[feedback.status]}>
                      {feedback.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
