import { useQuery } from "@tanstack/react-query";
import type { PostPublic, ProfilePublic, ProjectPublic, ServicePublic } from "@portfolio/shared";
import { apiFetch } from "../lib/api";

export function useProfile() {
  return useQuery({
    queryKey: ["public", "profile"],
    queryFn: () => apiFetch<ProfilePublic | null>("/public/profile"),
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["public", "services"],
    queryFn: () => apiFetch<ServicePublic[]>("/public/services"),
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["public", "projects"],
    queryFn: () => apiFetch<ProjectPublic[]>("/public/projects"),
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["public", "projects", slug],
    queryFn: () => apiFetch<ProjectPublic>(`/public/projects/${encodeURIComponent(slug)}`),
    enabled: !!slug,
  });
}

export function usePosts() {
  return useQuery({
    queryKey: ["public", "posts"],
    queryFn: () => apiFetch<PostPublic[]>("/public/posts"),
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["public", "posts", slug],
    queryFn: () => apiFetch<PostPublic>(`/public/posts/${encodeURIComponent(slug)}`),
    enabled: !!slug,
  });
}


