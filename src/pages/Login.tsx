import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Mail, Lock, Phone, User, ArrowRight, Loader2 } from "lucide-react";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginType, setLoginType] = useState<"admin" | "agent">("admin");
  const [otp, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowOTP(true);
      toast({
        title: "Success",
        description: "Please verify OTP to continue.",
      });
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

  const verifyAgentCredentials = async () => {
    try {
      const agentsRef = collection(db, "agents");
      const q = query(agentsRef, where("mobile", "==", phoneNumber));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error("Agent not found");
      }

      const agentDoc = querySnapshot.docs[0];
      const agentData = agentDoc.data();

      if (agentData.password !== agentPassword) {
        throw new Error("Invalid password");
      }

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const handleAgentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isCredentialsValid = await verifyAgentCredentials();
      
      if (!isCredentialsValid) {
        setIsLoading(false);
        return;
      }

      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      (window as any).confirmationResult = confirmationResult;
      setShowOTP(true);
      toast({
        title: "OTP Sent",
        description: "Please enter the OTP sent to your mobile number",
      });
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
        description: `Welcome back, ${loginType}!`,
      });
      navigate(loginType === "admin" ? "/admin" : "/agent");
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

  if (showForgotPassword) {
    return <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/90 p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">CodeCrafter</h1>
          <p className="text-primary-foreground/80">Welcome back</p>
        </div>

        <Card className="p-6 glass-card">
          {!showOTP ? (
            <>
              <div className="flex gap-2 mb-6">
                <Button
                  variant={loginType === "admin" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setLoginType("admin")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Admin
                </Button>
                <Button
                  variant={loginType === "agent" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setLoginType("agent")}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Agent
                </Button>
              </div>

              <form onSubmit={loginType === "admin" ? handleAdminLogin : handleAgentLogin} className="space-y-4">
                {loginType === "admin" ? (
                  <>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9"
                          placeholder="Enter your email"
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
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-9"
                          placeholder="+91XXXXXXXXXX"
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
                          value={agentPassword}
                          onChange={(e) => setAgentPassword(e.target.value)}
                          className="pl-9"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="link"
                  className="w-full"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </Button>
              </form>
            </>
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
                      <InputOTPSlot key={idx} {...slot} />
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
        </Card>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;