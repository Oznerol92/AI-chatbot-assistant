// src/services/chatService.ts
import { api } from "./api";
import type { Message } from "../components/chat/ChatWindow";

export const chatService = {
	// Fetch the full chat history from the backend
	getHistory: () =>
		api<{ chatHistory: Message[] }>("/chat/history").then((res) => res),

	// Send a message and get the AI reply
	sendMessage: (content: string, chatId?: string) =>
		api<{ chatId: string; reply: string }>("/chat", {
			method: "POST",
			body: JSON.stringify({ message: content, chatId }),
		}).then((res) => res),
};
