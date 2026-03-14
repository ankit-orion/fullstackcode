const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ModuleListItem {
  id: string;
  title: string;
  description: string;
  order: number;
  icon: string | null;
  topicsCount: number;
}

export interface TopicDetail {
  id: string;
  title: string;
  order: number;
  content: string; // raw Markdown
}

export interface ModuleDetail {
  id: string;
  title: string;
  description: string;
  order: number;
  icon: string | null;
  topics: TopicDetail[];
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const url = `${BASE_URL.replace(/\/$/, '')}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  /** Fetch all modules (lightweight, with topic count) */
  getModules(): Promise<ModuleListItem[]> {
    return apiFetch<ModuleListItem[]>('/modules');
  },

  /**
   * Fetch a single module with its full topic list.
   * Accepts either a UUID or an order number (1, 2, 3, ...).
   */
  getModule(moduleId: string | number): Promise<ModuleDetail> {
    return apiFetch<ModuleDetail>(`/modules/${moduleId}`);
  },
};
