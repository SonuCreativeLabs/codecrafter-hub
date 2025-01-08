import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Mail, Lock, Phone, Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function LoginForm({ onForgotPassword }: { onForgotPassword: () => void }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");

  const isEmail = (value: string) => value.includes('@');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEmail(identifier)) {
        // Admin login flow
        await signInWithEmailAndPassword(auth, identifier, password);
        setShowOTP(true);
        toast({
          title: "Verification Required",
          description: "Please enter the OTP sent to your email.",
        });
      } else {
        // Agent login flow
        const agentsRef = collection(db, "agents");
        const q = query(agentsRef, where("mobile", "==", identifier));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          throw new Error("Agent not found");
        }

        const agentDoc = querySnapshot.docs[0];
        const agentData = agentDoc.data();

        if (agentData.password !== password) {
          throw new Error("Invalid password");
        }

        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });

        const confirmationResult = await signInWithPhoneNumber(auth, identifier, recaptchaVerifier);
        (window as any).confirmationResult = confirmationResult;
        setShowOTP(true);
        toast({
          title: "OTP Sent",
          description: "Please enter the OTP sent to your mobile number",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    try {
      const confirmationResult = (window as any).confirmationResult;
      await confirmationResult.confirm(otp);
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      navigate(isEmail(identifier) ? "/admin" : "/agent");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!showOTP ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label>Email or Phone Number</Label>
            <div className="relative">
              {isEmail(identifier) ? (
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              ) : (
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                type={isEmail(identifier) ? "email" : "tel"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="pl-9"
                placeholder="Enter email or phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>

          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={onForgotPassword}
          >
            Forgot Password?
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center mb-4">Enter OTP</h3>
          <InputOTP
            value={otp}
            onChange={(value) => setOTP(value)}
            maxLength={6}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2 justify-center">
                {slots.map((slot, idx) => (
                  <InputOTPSlot key={idx} {...slot} index={idx} />
                ))}
              </InputOTPGroup>
            )}
          />
          <Button
            onClick={verifyOTP}
            disabled={isLoading || otp.length !== 6}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </div>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}