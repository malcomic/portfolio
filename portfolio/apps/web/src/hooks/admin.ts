import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import type {
  Profile,
  Service,
  Project,
  Post,
  LoginData,
  AdminUser,
} from "@portfolio/shared";

// Auth hooks
export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginData) => apiFetch<{ ok: boolean }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "me"] });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiFetch<{ ok: boolean }>("/auth/logout", { method: "POST" }),
    onSuccess: () => {
      qc.setQueryData(["admin", "me"], null);
      qc.clear();
    },
  });
}

export function useMe() {
  return useQuery<AdminUser | null>({
    queryKey: ["admin", "me"],
    queryFn: async () => {
      try {
        return await apiFetch<AdminUser>("/auth/me");
      } catch {
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

// Profile
export function useAdminProfile() {
  return useQuery<Profile | null>({
    queryKey: ["admin", "profile"],
    queryFn: () => apiFetch<Profile>("/admin/profile"),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Profile>) =>
      apiFetch<Profile>("/admin/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "profile"] });
      qc.invalidateQueries({ queryKey: ["public", "profile"] });
    },
  });
}

// Services
export function useAdminServices() {
  return useQuery<Service[]>({
    queryKey: ["admin", "services"],
    queryFn: () => apiFetch<Service[]>("/admin/services"),
  });
}

export function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Service, "id" | "createdAt" | "updatedAt">) =>
      apiFetch<Service>("/admin/services", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      qc.invalidateQueries({ queryKey: ["public", "services"] });
    },
  });
}

export function useUpdateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) =>
      apiFetch<Service>(`/admin/services/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      qc.invalidateQueries({ queryKey: ["public", "services"] });
    },
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ ok: boolean }>(`/admin/services/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      qc.invalidateQueries({ queryKey: ["public", "services"] });
    },
  });
}

// Projects
export function useAdminProjects() {
  return useQuery<Project[]>({
    queryKey: ["admin", "projects"],
    queryFn: () => apiFetch<Project[]>("/admin/projects"),
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) =>
      apiFetch<Project>("/admin/projects", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["public", "projects"] });
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      apiFetch<Project>(`/admin/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["public", "projects"] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ ok: boolean }>(`/admin/projects/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["public", "projects"] });
    },
  });
}

// Posts
export function useAdminPosts() {
  return useQuery<Post[]>({
    queryKey: ["admin", "posts"],
    queryFn: () => apiFetch<Post[]>("/admin/posts"),
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Post, "id" | "createdAt" | "updatedAt">) =>
      apiFetch<Post>("/admin/posts", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["public", "posts"] });
    },
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
      apiFetch<Post>(`/admin/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["public", "posts"] });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ ok: boolean }>(`/admin/posts/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["public", "posts"] });
    },
  });
}

