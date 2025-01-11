import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight, Loader2, Phone } from "lucide-react";

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<"identifier" | "code" | "reset">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const isEmail = (value: string) => value.includes("@");

  const handleSendCode = async () => {
    setLoading(true);
    // Here you would call your backend to send reset code
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep("code");
    toast({
      title: "Code Sent",
      description: `Check your ${isEmail(identifier) ? "email" : "phone"} for the reset code`
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
    <div className="space-y-6 p-8">
      {/* App Name */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">
          <span className="text-gray-900">Code</span>
          <span className="text-blue-500">Crafter</span>
        </h2>
        <p className="text-gray-500 mt-2">Reset your password</p>
      </div>

      {step === "identifier" && (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Email or Phone Number</Label>
            <div className="relative group">
              {isEmail(identifier) ? (
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-500" />
              ) : (
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-500" />
              )}
              <Input
                type={isEmail(identifier) ? "email" : "tel"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="pl-9 h-12 w-full bg-white/50 border-white/20 backdrop-blur-sm transition-all hover:bg-white/60 focus:bg-white/80 rounded-xl"
                placeholder="Enter email or phone number"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-900 to-blue-500 hover:opacity-90 transition-all rounded-xl text-white font-medium mt-4"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Send Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-sm text-gray-600 hover:text-blue-500 transition-colors"
            onClick={onBack}
          >
            Back to Login
          </Button>
        </form>
      )}

      {step === "code" && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Enter Verification Code</h3>
            <p className="text-sm text-gray-500">
              Please enter the verification code sent to your {isEmail(identifier) ? "email" : "phone"}
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="h-12 w-full text-lg bg-white/50 border-white/20 backdrop-blur-sm transition-all hover:bg-white/60 focus:bg-white/80 rounded-xl text-center"
            />

            <Button
              onClick={handleVerifyCode}
              disabled={loading || code.length !== 6}
              className="w-full h-12 bg-gradient-to-r from-blue-900 to-blue-500 hover:opacity-90 transition-all rounded-xl text-white font-medium"
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
        </div>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">New Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-500" />
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-9 h-12 w-full bg-white/50 border-white/20 backdrop-blur-sm transition-all hover:bg-white/60 focus:bg-white/80 rounded-xl"
                placeholder="Enter new password"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-500" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-9 h-12 w-full bg-white/50 border-white/20 backdrop-blur-sm transition-all hover:bg-white/60 focus:bg-white/80 rounded-xl"
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-900 to-blue-500 hover:opacity-90 transition-all rounded-xl text-white font-medium mt-4"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Reset Password
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}