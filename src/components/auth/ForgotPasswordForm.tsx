import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<"email" | "code" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendCode = async () => {
    setLoading(true);
    // Here you would call your backend to send reset code
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep("code");
    toast({
      title: "Code Sent",
      description: "Check your email for the reset code."
    });
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep("reset");
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Success",
      description: "Your password has been reset. You can now log in."
    });
    onBack();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right">
      <Button 
        variant="ghost" 
        className="mb-6 text-muted-foreground hover:text-primary transition-colors" 
        onClick={onBack}
      >
        <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
        Back to Login
      </Button>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Reset Password
          </h2>
          <p className="text-sm text-muted-foreground">
            {step === "email" && "Enter your email to receive a reset code"}
            {step === "code" && "Enter the code sent to your email"}
            {step === "reset" && "Create a new password"}
          </p>
        </div>

        {step === "email" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-12 bg-white/50 dark:bg-gray-950/50 border-white/20 backdrop-blur-sm transition-all hover:bg-white/60 dark:hover:bg-gray-950/60 focus:bg-white/80 dark:focus:bg-gray-950/80"
                />
              </div>
            </div>

            <Button
              onClick={handleSendCode}
              disabled={loading || !email}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Send Reset Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {step === "code" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Verification Code</Label>
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                className="h-12 bg-white/50 dark:bg-gray-950/50 border-white/20 backdrop-blur-sm text-center text-lg tracking-widest"
              />
            </div>

            <Button
              onClick={handleVerifyCode}
              disabled={loading || code.length !== 6}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Verify Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {step === "reset" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">New Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-9 h-12 bg-white/50 dark:bg-gray-950/50 border-white/20 backdrop-blur-sm transition-all hover:bg-white/60 dark:hover:bg-gray-950/60 focus:bg-white/80 dark:focus:bg-gray-950/80"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-9 h-12 bg-white/50 dark:bg-gray-950/50 border-white/20 backdrop-blur-sm transition-all hover:bg-white/60 dark:hover:bg-gray-950/60 focus:bg-white/80 dark:focus:bg-gray-950/80"
                />
              </div>
            </div>

            <Button
              onClick={handleResetPassword}
              disabled={loading || !newPassword || !confirmPassword}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}