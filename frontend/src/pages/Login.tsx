import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOGIN } from "@/graphql/auth/auth.mutation";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await login({
      variables: { input: { email, password } },
    });
    setToken(data.login.token);
    navigate("/");
  };

  return (
    <AuthLayout>
      <Card className="shadow-xl border-muted">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back 👋
          </CardTitle>
          <CardDescription>
            Login to manage your ads and campaigns
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error.message}</p>}

            <Button className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
