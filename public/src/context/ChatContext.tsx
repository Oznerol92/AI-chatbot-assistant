// src/context/ChatContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { chatService } from "../services/chatService";
import type { Message } from "../components/chat/ChatWindow";
import { useAuth } from "./AuthContext";

type ChatContextType = {
	messages: Message[];
	sendMessage: (content: string) => Promise<void>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { user } = useAuth();
	const [messages, setMessages] = useState<Message[]>([]);

	// Load chat history on mount
	useEffect(() => {
		if (!user) return;
		chatService
			.getHistory()
			.then((data) => setMessages(data.chatHistory || []))
			.catch(() => setMessages([]));
	}, [user]);

	const sendMessage = async (content: string) => {
		if (!user) return;

		// Add user message locally
		const userMessage: Message = { role: "user", content };
		setMessages((prev) => [...prev, userMessage]);

		// Send to backend
		try {
			const res = await chatService.sendMessage(content);
			const aiMessage: Message = { role: "assistant", content: res.reply };
			setMessages((prev) => [...prev, aiMessage]);
		} catch (err) {
			console.error("Failed to send message", err);
		}
	};

	return (
		<ChatContext.Provider value={{ messages, sendMessage }}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = () => {
	const ctx = useContext(ChatContext);
	if (!ctx) throw new Error("useChat must be used within ChatProvider");
	return ctx;
};
