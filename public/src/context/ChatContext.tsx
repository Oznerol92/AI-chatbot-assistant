// src/context/ChatContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ChatMessage, Chat } from "../types/chat";
import { chatService } from "../services/chatService";

type ChatContextType = {
	chats: Chat[];
	currentChatId: string | null;
	messages: ChatMessage[];
	sendMessage: (content: string) => Promise<void>;
	selectChat: (chatId: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{
	children: React.ReactNode;
	initialChats?: Chat[];
}> = ({ children, initialChats = [] }) => {
	const [chats, setChats] = useState<Chat[]>(initialChats);
	const [currentChatId, setCurrentChatId] = useState<string | null>(
		initialChats[0]?._id || null
	);

	const currentMessages =
		chats.find((c) => c._id === currentChatId)?.messages || [];

	const selectChat = (chatId: string) => setCurrentChatId(chatId);

	const sendMessage = async (content: string) => {
		console.log(currentChatId);

		if (!currentChatId) {
			// If no chat selected, create a new one locally first
			const tempId = `temp-${Date.now()}`;
			setChats((prev) => [
				...prev,
				{ _id: tempId, title: "New Chat", messages: [] },
			]);
			selectChat(tempId);
		}

		const chatIdToSend = currentChatId || `temp-${Date.now()}`;

		// Append user message locally for instant UI feedback
		const newMsg: ChatMessage = {
			role: "user",
			content,
			chatId: chatIdToSend,
		};
		setChats((prev) =>
			prev.map((c) =>
				c._id === chatIdToSend ? { ...c, messages: [...c.messages, newMsg] } : c
			)
		);

		try {
			// Call backend
			const res = await chatService.sendMessage(
				content,
				chatIdToSend.startsWith("temp-") ? undefined : chatIdToSend
			);

			const replyMsg: ChatMessage = {
				role: "assistant",
				content: res.reply,
				chatId: res.chatId,
			};
			// Update chatId if it was a temporary chat
			if (chatIdToSend.startsWith("temp-")) {
				setChats((prev) =>
					prev.map((c) =>
						c._id === chatIdToSend
							? { ...c, _id: res.chatId, messages: [...c.messages, replyMsg] }
							: c
					)
				);
				selectChat(res.chatId);
			} else {
				// Append AI reply normally
				setChats((prev) =>
					prev.map((c) =>
						c._id === res.chatId
							? { ...c, messages: [...c.messages, replyMsg] }
							: c
					)
				);
			}
		} catch (err) {
			console.error("Error sending message:", err);
		}
	};

	return (
		<ChatContext.Provider
			value={{
				chats,
				currentChatId,
				messages: currentMessages,
				sendMessage,
				selectChat,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = () => {
	const ctx = useContext(ChatContext);
	if (!ctx) throw new Error("useChat must be used within ChatProvider");
	return ctx;
};
