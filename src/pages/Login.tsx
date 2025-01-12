import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 relative">
        <Card className="p-8 glass-card backdrop-blur-sm bg-white/30 dark:bg-gray-950/30 border-white/20 shadow-xl">
          {showForgotPassword ? (
            <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
          ) : (
            <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
          )}
        </Card>

        {/* Floating shapes for visual interest */}
        <div className="absolute -z-10 animate-pulse">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl" />
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl" />
        </div>
      </div>
    </div>
  );
};

export default Login;