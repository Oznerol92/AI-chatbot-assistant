// src/pages/ChatPage.tsx
import { useAuth } from "../context/AuthContext";
import { ChatProvider, useChat } from "../context/ChatContext";
import ChatWindow from "../components/chat/ChatWindow";
import Navbar from "../components/layout/Navbar";
import { useState, useMemo } from "react";

function ChatPageContent() {
	const { user, loading, logout } = useAuth();
	const { chats, currentChatId, messages, sendMessage, selectChat } = useChat();

	const [input, setInput] = useState("");

	const handleSend = async () => {
		if (!input.trim()) return;
		await sendMessage(input.trim());
		setInput("");
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") handleSend();
	};

	const handleNewChat = () => {
		// Create a temporary chat with a random local id
		const tempId = `temp-${Date.now()}`;
		const newChat = { _id: tempId, title: "New Chat", messages: [] };
		selectChat(tempId);
	};

	return (
		<div className="max-w-4xl mx-auto p-4 flex gap-4">
			{/* Sidebar */}
			<div className="w-1/3 border-r p-2">
				<div className="flex justify-between items-center mb-2">
					<h2 className="font-bold">Your Chats</h2>
					<button
						className="px-2 py-1 text-sm bg-green-500 text-white rounded"
						onClick={handleNewChat}
					>
						New Chat
					</button>
				</div>
				<ul>
					{chats.map((chat) => (
						<li
							key={chat._id}
							className={`p-2 cursor-pointer rounded ${
								chat._id === currentChatId ? "bg-blue-200" : "hover:bg-gray-100"
							}`}
							onClick={() => selectChat(chat._id)}
						>
							{/* {chat.title || chat._id} */}
							{chat._id}
						</li>
					))}
				</ul>
			</div>

			{/* Chat Window */}
			<div className="flex-1 flex flex-col">
				<Navbar user={user} onLogout={logout} />
				<h1 className="text-2xl font-bold mb-4 text-center">🧠 AI Chatbot</h1>

				<ChatWindow messages={messages} />

				<div className="flex gap-2 mt-2">
					<input
						className="flex-1 p-2 border rounded"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleEnter}
						placeholder="Type your message..."
					/>
					<button
						disabled={loading}
						className="px-4 py-2 bg-blue-500 text-white rounded"
						onClick={handleSend}
					>
						{loading ? "Sending..." : "Send"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default function ChatPage() {
	const { user } = useAuth();

	// Convert user.chatHistory (object) to array of chats
	const initialChats = useMemo(() => {
		if (!user?.chatHistory) return [];
		return Object.entries(user.chatHistory).map(([chatId, messages]) => ({
			_id: chatId,
			title: `Chat ${chatId.slice(0, 6)}`, // optional
			messages,
		}));
	}, [user]);

	return (
		<ChatProvider initialChats={initialChats}>
			<ChatPageContent />
		</ChatProvider>
	);
}
