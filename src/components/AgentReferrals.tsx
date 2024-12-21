import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Copy, Award } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
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

    // Subscribe to referrals collection
    const q = query(
      collection(db, "referrals"),
      where("referrerId", "==", agentId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const referralData: Referral[] = [];
      snapshot.forEach((doc) => {
        referralData.push({ id: doc.id, ...doc.data() } as Referral);
      });
      setReferrals(referralData);
    });

    return () => unsubscribe();
  }, [agentId]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
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
            <Button variant="outline" size="icon" onClick={copyReferralCode}>
              <Copy className="h-4 w-4" />
            </Button>
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