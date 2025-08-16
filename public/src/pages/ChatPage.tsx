// src/pages/ChatPage.tsx
import { useAuth } from "../context/AuthContext";
import { ChatProvider, useChat } from "../context/ChatContext";
import ChatWindow from "../components/chat/ChatWindow";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";

function ChatPageContent() {
	const { user, logout } = useAuth();
	const { messages, sendMessage } = useChat();
	const [input, setInput] = useState("");

	const handleSend = async () => {
		if (!input.trim()) return;
		await sendMessage(input.trim());
		setInput("");
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") handleSend();
	};

	return (
		<div className="max-w-xl mx-auto p-4">
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
					className="px-4 py-2 bg-blue-500 text-white rounded"
					onClick={handleSend}
				>
					Send
				</button>
			</div>
		</div>
	);
}

export default function ChatPage() {
	return (
		<ChatProvider>
			<ChatPageContent />
		</ChatProvider>
	);
}
