import { Navigate } from "react-router-dom";
import { useMe } from "../hooks/admin";
import { LoadingState } from "./LoadingState";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const meQ = useMe();

  if (meQ.isLoading) return <LoadingState />;
  if (!meQ.data) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}

