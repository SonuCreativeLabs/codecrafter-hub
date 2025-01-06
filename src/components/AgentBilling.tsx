import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, CreditCard, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillingDetails {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  upiId: string;
  phoneNumber: string;
}

export function AgentBilling() {
  const [isEditing, setIsEditing] = useState(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: "",
    phoneNumber: "",
  });
  const { toast } = useToast();

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
    toast({
      description: "Billing details updated successfully!",
      className: "bg-green-50 border-green-200",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Billing Details
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Details"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                value={billingDetails.accountHolderName}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    accountHolderName: e.target.value,
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={billingDetails.accountNumber}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    accountNumber: e.target.value,
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={billingDetails.ifscCode}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    ifscCode: e.target.value,
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                value={billingDetails.upiId}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    upiId: e.target.value,
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={billingDetails.phoneNumber}
                onChange={(e) =>
                  setBillingDetails((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}