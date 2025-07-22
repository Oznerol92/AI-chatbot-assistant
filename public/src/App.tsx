import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Error fetching response.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">🧠 AI Chatbot</h1>
  
        <div className="space-y-3 mb-4 max-h-[60vh] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md text-black ${
                msg.role === 'user' ? 'bg-blue-400 text-right' : 'bg-gray-400 text-left'
              }`}
            >
              <p>
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
              </p>
            </div>
          ))}
        </div>
  
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    );
}

export default App;

