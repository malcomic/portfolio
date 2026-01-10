import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { useLogin } from "../../hooks/admin";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password });
      navigate("/admin/dashboard");
    } catch (err) {
      // Error is already shown via mutation error
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-md">
      <Card>
        <h1 className="text-2xl font-black">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">Enter your credentials to manage content.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="admin@local.dev"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
              placeholder="••••••••"
            />
          </div>

          {login.error ? (
            <div className="rounded-md bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
              {login.error.message}
            </div>
          ) : null}

          <Button type="submit" disabled={login.isPending} className="w-full">
            {login.isPending ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted">
          Default credentials: admin@local.dev / ChangeMe123! (after seeding)
        </p>
      </Card>
    </div>
  );
}

