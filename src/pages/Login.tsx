import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { collection, getDocs, query, where } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Success",
        description: "Welcome back, admin!",
      });
      navigate("/admin");
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

      // Initialize reCAPTCHA verifier
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      // Store confirmation result to verify OTP later
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
      const result = await confirmationResult.confirm(otp);
      toast({
        title: "Success",
        description: "Welcome back, agent!",
      });
      navigate("/agent");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/90 p-4">
      <div className="w-full max-w-md animate-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CodeCrafter</h1>
          <p className="text-primary-foreground/80">Welcome back</p>
        </div>

        <div className="glass-card rounded-lg p-6">
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="agent">Agent</TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="transition-all duration-200 hover:border-accent focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="transition-all duration-200 hover:border-accent focus:border-accent"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-200 hover:bg-accent active:scale-95" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="agent">
              <form onSubmit={handleAgentLogin} className="space-y-4">
                {!showOTP ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input 
                        id="mobile" 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91XXXXXXXXXX"
                        required 
                        className="transition-all duration-200 hover:border-accent focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agentPassword">Password</Label>
                      <Input 
                        id="agentPassword" 
                        type="password" 
                        value={agentPassword}
                        onChange={(e) => setAgentPassword(e.target.value)}
                        required 
                        className="transition-all duration-200 hover:border-accent focus:border-accent"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full transition-all duration-200 hover:bg-accent active:scale-95" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Send OTP"}
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Label>Enter OTP</Label>
                    <InputOTP
                      value={otp}
                      onChange={(value) => setOTP(value)}
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2">
                          {slots.map((slot, idx) => (
                            <InputOTPSlot 
                              key={idx} 
                              {...slot} 
                              index={idx}
                              className="transition-all duration-200 hover:border-accent focus:border-accent" 
                            />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                    <Button 
                      type="button" 
                      className="w-full transition-all duration-200 hover:bg-accent active:scale-95" 
                      onClick={verifyOTP}
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </div>
                )}
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;