import { env } from "./env";

const API_BASE = env.VITE_API_URL ?? "http://localhost:3001";

export type ApiError = { error: string };

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = (await res.json()) as Partial<ApiError>;
      if (data?.error) msg = data.error;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }

  // 204
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}


