import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { useLogout, useMe } from "../../hooks/admin";

export function AdminDashboardPage() {
  const meQ = useMe();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout.mutateAsync();
    window.location.href = "/";
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Admin Dashboard</h1>
          <p className="mt-2 text-muted">Logged in as {meQ.data?.email}</p>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/admin/profile">
          <Card className="cursor-pointer transition hover:border-accent/40">
            <div className="text-lg font-bold">Profile</div>
            <p className="mt-2 text-sm text-muted">
              Edit hero section, bio, avatar, social links, skills, education, and experience.
            </p>
          </Card>
        </Link>

        <Link to="/admin/services">
          <Card className="cursor-pointer transition hover:border-accent/40">
            <div className="text-lg font-bold">Services</div>
            <p className="mt-2 text-sm text-muted">
              Manage service offerings displayed on the homepage and services page.
            </p>
          </Card>
        </Link>

        <Link to="/admin/projects">
          <Card className="cursor-pointer transition hover:border-accent/40">
            <div className="text-lg font-bold">Projects</div>
            <p className="mt-2 text-sm text-muted">
              Create, edit, or delete portfolio projects with tech stacks and links.
            </p>
          </Card>
        </Link>

        <Link to="/admin/posts">
          <Card className="cursor-pointer transition hover:border-accent/40">
            <div className="text-lg font-bold">Blog Posts</div>
            <p className="mt-2 text-sm text-muted">
              Write, update, and publish blog posts for your portfolio blog.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}

