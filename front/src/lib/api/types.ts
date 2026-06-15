// Types partages entre tout le frontend pour typer les reponses de l'API backend.
// L'objectif est d'avoir un contrat clair et reutilisable partout.

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data?: T;
};

export type ApiFailure = {
  success: false;
  message: string;
  error?: string;
  data?: {
    errors?: Array<{
      field: string;
      message: string;
    }>;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

export type ProjectRole = "ADMIN" | "CONTRIBUTOR";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
