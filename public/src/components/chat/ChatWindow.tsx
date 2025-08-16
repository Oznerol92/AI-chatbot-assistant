// src/components/chat/ChatWindow.tsx
import { useEffect, useRef } from "react";

export type Message = { role: "user" | "assistant"; content: string };

interface ChatWindowProps {
	messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom whenever messages change
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div
			ref={containerRef}
			className="space-y-3 mb-4 max-h-[60vh] overflow-y-auto p-2 border rounded"
		>
			{messages.map((msg, idx) => (
				<div
					key={idx}
					className={`p-2 rounded-md ${
						msg.role === "user"
							? "bg-blue-400 text-right text-white"
							: "bg-gray-300 text-left"
					}`}
				>
					<strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
				</div>
			))}
		</div>
	);
}
