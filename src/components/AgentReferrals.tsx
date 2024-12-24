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
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </Button>
              <Button variant="outline" size="icon" onClick={handleSMSShare}>
                <MessageSquare className="h-4 w-4" />
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