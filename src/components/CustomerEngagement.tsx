import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  MessageSquare,
  Send,
  Users,
  Gift,
  Filter,
  Download,
  Phone,
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastPurchase: Date;
  totalPurchases: number;
  loyaltyPoints: number;
}

interface Campaign {
  id: string;
  title: string;
  message: string;
  type: "sms" | "whatsapp" | "email";
  status: "draft" | "scheduled" | "sent";
  scheduledFor?: Date;
  sentTo?: number;
}

export function CustomerEngagement() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+1234567890",
      email: "john@example.com",
      lastPurchase: new Date(),
      totalPurchases: 5,
      loyaltyPoints: 500
    }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Thank You Campaign",
      message: "Thank you for your recent purchase!",
      type: "whatsapp",
      status: "sent",
      sentTo: 100
    }
  ]);

  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const { toast } = useToast();

  const sendMessage = (type: "sms" | "whatsapp") => {
    // Here you would integrate with SMS/WhatsApp API
    toast({
      title: "Messages Sent",
      description: `Successfully sent ${type.toUpperCase()} messages to ${selectedCustomers.length} customers.`
    });
  };

  const createDiscount = () => {
    // Here you would create special discount codes
    toast({
      title: "Discount Created",
      description: "Special discount codes have been generated for selected customers."
    });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Customer Name"
    },
    {
      accessorKey: "phone",
      header: "Phone"
    },
    {
      accessorKey: "lastPurchase",
      header: "Last Purchase",
      cell: ({ row }: any) => new Date(row.lastPurchase).toLocaleDateString()
    },
    {
      accessorKey: "totalPurchases",
      header: "Total Purchases"
    },
    {
      accessorKey: "loyaltyPoints",
      header: "Loyalty Points"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Customer Engagement</h2>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter Customers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export List
                </Button>
              </div>

              <DataTable
                columns={columns}
                data={customers}
                onRowsSelected={setSelectedCustomers}
              />

              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your message here..."
                  className="h-32"
                />

                <div className="flex gap-4">
                  <Button
                    onClick={() => sendMessage("sms")}
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Send SMS
                  </Button>
                  <Button
                    onClick={() => sendMessage("whatsapp")}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Send WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="space-y-4">
              <Button className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Create New Campaign
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="p-4">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {campaign.message}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm">
                        Sent to: {campaign.sentTo} customers
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">Total Customers</h3>
                      <p className="text-2xl font-bold">1,234</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <Gift className="h-8 w-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Rewards Given</h3>
                      <p className="text-2xl font-bold">456</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <MessageSquare className="h-8 w-8 text-purple-500" />
                    <div>
                      <h3 className="font-semibold">Active Campaigns</h3>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Create Special Discount</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Discount Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage Off</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="bogo">Buy One Get One</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Value</Label>
                    <Input type="number" placeholder="Enter discount value" />
                  </div>

                  <Button onClick={createDiscount} className="w-full">
                    Generate Discount Codes
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
