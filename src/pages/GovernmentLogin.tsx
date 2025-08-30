import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Lock } from "lucide-react";
import { loginGovernment } from "@/lib/auth";

const GovernmentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real auth (SSO/OIDC/SAML + MFA)
    loginGovernment(email.trim());
    navigate("/government", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-[var(--shadow-elegant)]">
            <Shield className="h-9 w-9 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Government Access
          </h1>
          <p className="text-sm text-muted-foreground">
            Restricted portal. Authorized officials only.
          </p>
        </div>

        <Card className="bg-card/70 backdrop-blur border-primary/10">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Official Email</label>
                <Input
                  type="email"
                  placeholder="name@agency.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary">
                <Lock className="h-4 w-4 mr-2" />
                Sign in securely
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Enable MFA/OTP and IP allowlisting in production.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentLogin;
