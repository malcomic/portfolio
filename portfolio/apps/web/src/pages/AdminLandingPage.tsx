import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export function AdminLandingPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">Admin</h1>
        <p className="mt-2 text-muted">Log in to manage profile, services, projects, and posts.</p>
      </div>

      <Card className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Continue</div>
          <div className="text-sm text-muted">Go to the login screen.</div>
        </div>
        <Link to="/admin/login">
          <Button>Login</Button>
        </Link>
      </Card>
    </div>
  );
}


