import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Archive, RefreshCcw } from "lucide-react";
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
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface ArchivedItem {
  id: string;
  type: "promo_code" | "agent";
  name: string;
  archivedDate: Date;
}

export function ArchivedData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "promo_code" | "agent">("all");
  const [archivedItems, setArchivedItems] = useState<ArchivedItem[]>([]);
  const { toast } = useToast();

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, filterType === "all" ? "archived_items" : filterType),
          where("is_archived", "==", true)
        )
      );
      
      const items: ArchivedItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ArchivedItem);
      });
      setArchivedItems(items);
    } catch (error) {
      console.error("Error searching archived items:", error);
      toast({
        title: "Error",
        description: "Failed to search archived items",
        variant: "destructive"
      });
    }
  };

  const handleRestore = async (item: ArchivedItem) => {
    try {
      const itemRef = doc(db, item.type, item.id);
      await updateDoc(itemRef, {
        is_archived: false
      });
      
      toast({
        title: "Item Restored",
        description: `${item.name} has been restored successfully.`
      });
      
      // Refresh the list
      handleSearch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore item.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search archived items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterType} onValueChange={(value: "all" | "promo_code" | "agent") => setFilterType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="promo_code">Promo Codes</SelectItem>
              <SelectItem value="agent">Agents</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Archived Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {archivedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.archivedDate.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(item)}
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}