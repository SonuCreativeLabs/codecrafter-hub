import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/90 p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">CodeCrafter</h1>
          <p className="text-primary-foreground/80">Welcome back</p>
        </div>

        <Card className="p-6 glass-card">
          {showForgotPassword ? (
            <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
          ) : (
            <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;