import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Copy, Award, MessageSquare } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface Referral {
  id: string;
  referredId: string;
  referredName: string;
  status: "pending" | "active";
  reward: number;
  date: Date;
}

export function AgentReferrals({ agentId }: { agentId: string }) {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralCode, setReferralCode] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Generate unique referral code based on agent ID
    setReferralCode(`REF-${agentId}-${Math.random().toString(36).substr(2, 6)}`);

    const fetchReferrals = async () => {
      try {
        const q = query(
          collection(db, "referrals"),
          where("referrerId", "==", agentId)
        );
        
        const snapshot = await getDocs(q);
        const referralData: Referral[] = [];
        snapshot.forEach((doc) => {
          referralData.push({ id: doc.id, ...doc.data() } as Referral);
        });
        setReferrals(referralData);
      } catch (error) {
        console.error("Error fetching referrals:", error);
        toast({
          title: "Error",
          description: "Failed to load referrals",
          variant: "destructive"
        });
      }
    };

    fetchReferrals();
  }, [agentId, toast]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `🎉 Use my referral code "${referralCode}" to get amazing discounts! \n\nShared by Agent #${agentId}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleSMSShare = () => {
    const message = encodeURIComponent(
      `Use my referral code "${referralCode}" to get amazing discounts! Shared by Agent #${agentId}`
    );
    window.open(`sms:?&body=${message}`, '_blank');
  };

  const totalRewards = referrals
    .filter((ref) => ref.status === "active")
    .reduce((sum, ref) => sum + ref.reward, 0);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Referrals</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="font-semibold">Total Rewards: ${totalRewards}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <Users className="h-6 w-6 text-primary" />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Your Referral Code</p>
          <div className="flex items-center gap-2">
            <Input value={referralCode} readOnly className="font-mono" />
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={copyReferralCode}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWhatsAppShare}
                className="bg-[#25D366] text-white hover:bg-[#128C7E]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20M8.5 8.5C8.5 9.33 9.17 10 10 10C10.83 10 11.5 9.33 11.5 8.5C11.5 7.67 10.83 7 10 7C9.17 7 8.5 7.67 8.5 8.5M15.5 8.5C15.5 7.67 14.83 7 14 7C13.17 7 12.5 7.67 12.5 8.5C12.5 9.33 13.17 10 14 10C14.83 10 15.5 9.33 15.5 8.5M12 17.5C14.33 17.5 16.31 16.04 17.11 14H6.89C7.69 16.04 9.67 17.5 12 17.5Z" />
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleSMSShare}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H5.2L4 17.2V4H20V16Z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Referred Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reward</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableCell>{referral.referredName}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    referral.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {referral.status}
                </span>
              </TableCell>
              <TableCell>${referral.reward}</TableCell>
              <TableCell>
                {referral.date.toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}