import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Clock, CheckCircle, XCircle } from "lucide-react";

interface Coupon {
  code: string;
  status: 'active' | 'used' | 'expired';
  expiryDate: string;
  usedBy?: string;
  value: number;
}

// This would typically come from your backend
const mockCoupons: Coupon[] = [
  { code: 'SUMMER23', status: 'active', expiryDate: '2024-06-30', value: 100 },
  { code: 'WINTER23', status: 'used', expiryDate: '2023-12-31', usedBy: 'John Doe', value: 50 },
  { code: 'FALL23', status: 'expired', expiryDate: '2023-11-30', value: 75 },
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
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          My Coupons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{coupon.code}</p>
                <p className="text-sm text-muted-foreground">
                  Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                </p>
                {coupon.usedBy && (
                  <p className="text-sm text-muted-foreground">
                    Used by: {coupon.usedBy}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">₹{coupon.value}</p>
                <Badge className={getStatusColor(coupon.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(coupon.status)}
                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                  </span>
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}