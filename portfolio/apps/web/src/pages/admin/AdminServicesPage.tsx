import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import {
  useAdminServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "../../hooks/admin";
import type { Service } from "@portfolio/shared";

export function AdminServicesPage() {
  const servicesQ = useAdminServices();
  const create = useCreateService();
  const update = useUpdateService();
  const remove = useDeleteService();

  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("0");

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setOrder("0");
  };

  const loadService = (service: Service) => {
    setEditing(service.id);
    setTitle(service.title);
    setDescription(service.description);
    setOrder(String(service.order));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { title, description, icon: null, order: Number(order) };

    if (editing) {
      await update.mutateAsync({ id: editing, data });
    } else {
      await create.mutateAsync(data);
    }
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this service?")) {
      await remove.mutateAsync(id);
    }
  };

  if (servicesQ.isLoading) return <LoadingState />;
  if (servicesQ.error) return <ErrorState error={servicesQ.error} />;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Services</h1>
          <p className="mt-2 text-muted">Manage your service offerings</p>
        </div>
        <Link to="/admin/dashboard">
          <Button variant="ghost">← Dashboard</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-bold">{editing ? "Edit Service" : "Create Service"}</h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div>
              <label className="block text-sm font-semibold">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="Web Development"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="What this service includes..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Order</label>
              <input
                type="number"
                required
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="0"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={create.isPending || update.isPending}>
                {editing ? "Update" : "Create"}
              </Button>
              {editing ? (
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancel
                </Button>
              ) : null}
            </div>
          </form>
        </Card>

        <div className="grid gap-4 content-start">
          <h2 className="text-lg font-bold">All Services</h2>
          {(servicesQ.data ?? []).map((s) => (
            <Card key={s.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <p className="mt-1 text-xs text-muted">{s.description}</p>
                  <p className="mt-2 text-xs text-muted">Order: {s.order}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadService(s)}
                    className="text-xs text-accent hover:brightness-110"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-xs text-red-400 hover:brightness-110"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

