import { ApiResponse, AuthUser } from "@/lib/api/types";

// URL unique de l'API backend.
// Toute l'application passera par ce fichier pour communiquer avec le backend.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = "GET", body, token } = options;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    // Le backend renvoie un JSON standardise (success, message, data, error).
    // On conserve ce format pour que le front ait un comportement uniforme.
    const result = (await response.json()) as ApiResponse<T>;
    return result;
  } catch {
    return {
      success: false,
      message: "Impossible de contacter le serveur",
      error: "NETWORK_ERROR",
    };
  }
}

// Objet central qui expose tous les appels API connus.
// On peut l'etendre progressivement sans dupliquer la logique fetch.
export const apiClient = {
  health: {
    getStatus: () => request<{ timestamp: string; environment: string }>("/health"),
  },

  auth: {
    register: (payload: { email: string; password: string; name?: string }) =>
      request<{ user: AuthUser; token: string }>("/auth/register", {
        method: "POST",
        body: payload,
      }),

    login: (payload: { email: string; password: string }) =>
      request<{ user: AuthUser; token: string }>("/auth/login", {
        method: "POST",
        body: payload,
      }),

    getProfile: (token: string) =>
      request<{ user: AuthUser }>("/auth/profile", {
        method: "GET",
        token,
      }),
  },

  projects: {
    getAll: (token: string) =>
      request<{ projects: Array<{ id: string; name: string; userRole: string | null }> }>(
        "/projects",
        {
          method: "GET",
          token,
        }
      ),
  },
};
