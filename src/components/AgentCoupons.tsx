import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Clock, CheckCircle, XCircle, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Coupon {
  code: string;
  status: 'active' | 'used' | 'expired';
  expiryDate: string;
  usedBy?: string;
  customerArea?: string;
  value: number;
  commission: number;
  createdDate: string;
  redeemedDate?: string;
}

// This would typically come from your backend
const mockCoupons: Coupon[] = [
  { 
    code: 'SUMMER23', 
    status: 'active', 
    expiryDate: '2024-06-30', 
    value: 100,
    commission: 10,
    createdDate: '2024-03-15'
  },
  { 
    code: 'WINTER23', 
    status: 'used', 
    expiryDate: '2023-12-31', 
    usedBy: 'John Doe',
    customerArea: 'Mumbai Central',
    value: 50,
    commission: 5,
    createdDate: '2023-11-01',
    redeemedDate: '2023-12-15'
  },
  { 
    code: 'FALL23', 
    status: 'expired', 
    expiryDate: '2023-11-30', 
    value: 75,
    commission: 7.5,
    createdDate: '2023-09-01'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'used':
      return 'bg-blue-100 text-blue-800';
    case 'expired':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4" />;
    case 'used':
      return <Tag className="h-4 w-4" />;
    case 'expired':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export function AgentCoupons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCoupons = mockCoupons
    .filter(coupon => {
      const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || coupon.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      } else {
        return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
      }
    });

  return (
    <Card className="w-full mb-6 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            My Coupons
          </CardTitle>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search coupons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full md:w-[200px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredCoupons.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No coupons found matching your criteria
              </div>
            ) : (
              filteredCoupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1 space-y-2 mb-4 md:mb-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-lg">{coupon.code}</p>
                      <Badge className={getStatusColor(coupon.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(coupon.status)}
                          {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                        </span>
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Created: {new Date(coupon.createdDate).toLocaleDateString()}</p>
                      <p>Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                      {coupon.redeemedDate && (
                        <p>Redeemed: {new Date(coupon.redeemedDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 space-y-2 md:text-right">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-lg">₹{coupon.value}</p>
                      {coupon.status === 'used' && (
                        <p className="font-medium text-green-600">₹{coupon.commission}</p>
                      )}
                    </div>
                    {coupon.usedBy && (
                      <div className="text-sm text-muted-foreground">
                        <p>Used by: {coupon.usedBy}</p>
                        <p>Area: {coupon.customerArea}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}