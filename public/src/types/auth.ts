// src/types/auth.ts

export type User = {
	id: string;
	name: string;
	email: string;
};

export type AuthResponse = {
	message: string;
	user: User;
	chatHistory?: {
		chatId: string;
		role: "user" | "assistant";
		content: string;
	}[];
};

export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
	password2: string;
};
