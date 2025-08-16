// src/services/authService.ts
import { api } from "./api";
import type { AuthResponse } from "../types/auth";

export const authService = {
	login: (email: string, password: string) =>
		api<AuthResponse>("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		}),

	register: (
		name: string,
		email: string,
		password: string,
		password2: string
	) =>
		api<AuthResponse>("/auth/register", {
			method: "POST",
			body: JSON.stringify({ name, email, password, password2 }),
		}),

	me: () => api<AuthResponse>("/auth/me"),

	logout: () => api("/auth/logout", { method: "POST" }),
};
