// src/App.tsx
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ErrorProvider } from "./context/ErrorContext";
import { ChatProvider } from "./context/ChatContext";

// PrivateRoute ensures only logged-in users can access
function PrivateRoute({ children }: { children: JSX.Element }) {
	const { user, loading } = useAuth();
	console.log(user);

	if (loading) return <div>Loading...</div>;

	return user ? children : <Navigate to="/auth" />;
}

// PublicRoute redirects logged-in users away from auth pages
function PublicRoute({ children }: { children: JSX.Element }) {
	const { user, loading } = useAuth();

	if (loading) return <div>Loading...</div>;

	return user ? <Navigate to="/chat" /> : children;
}

function App() {
	return (
		<ErrorProvider>
			<AuthProvider>
				<ChatProvider>
					<Router>
						<Routes>
							<Route
								path="/"
								element={
									<PublicRoute>
										<AuthPage />
									</PublicRoute>
								}
							/>
							<Route
								path="/auth"
								element={
									<PublicRoute>
										<AuthPage />
									</PublicRoute>
								}
							/>
							<Route
								path="/chat"
								element={
									<PrivateRoute>
										<ChatPage />
									</PrivateRoute>
								}
							/>
							{/* <Route path="*" element={<Navigate to="/chat" />} /> */}
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</Router>
				</ChatProvider>
			</AuthProvider>
		</ErrorProvider>
	);
}

export default App;

// import { useState, useEffect } from "react";

// type Message = { role: "user" | "assistant"; content: string };
// type UserInfo = { name: string; email: string };

// function App() {
// 	const [chatId, setChatId] = useState("");
// 	const [messages, setMessages] = useState<Message[]>([]);
// 	const [input, setInput] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	// Auth
// 	const [mode, setMode] = useState<"login" | "register">("login");
// 	const [name, setName] = useState("pino");
// 	const [email, setEmail] = useState("pino@email.com");
// 	const [password, setPassword] = useState("123456");
// 	const [password2, setPassword2] = useState("123456");
// 	const [authError, setAuthError] = useState("");
// 	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

// 	useEffect(() => {
// 		setChatId(`chat-${Date.now()}`);
// 		checkAuth();
// 	}, []);

// 	const checkAuth = async () => {
// 		try {
// 			const res = await fetch("http://localhost:3000/api/auth/me", {
// 				method: "GET",
// 				credentials: "include",
// 			});
// 			if (res.ok) {
// 				const data = await res.json();
// 				setUserInfo(data.user);

// 				// Set chat history if it exists
// 				if (data.chatHistory) {
// 					setMessages(
// 						data.chatHistory.map((msg) => ({
// 							role: msg.role,
// 							content: msg.content,
// 						}))
// 					);
// 				}
// 			} else {
// 				setUserInfo(null);
// 				setMessages([]);
// 			}
// 		} catch {
// 			setUserInfo(null);
// 			setMessages([]);
// 		}
// 	};

// 	const handleAuth = async () => {
// 		setAuthError("");
// 		try {
// 			const res = await fetch(`http://localhost:3000/api/auth/${mode}`, {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				credentials: "include",
// 				body: JSON.stringify(
// 					mode === "register"
// 						? { name, email, password, password2 }
// 						: { email, password }
// 				),
// 			});

// 			const data = await res.json();
// 			if (res.ok) {
// 				setUserInfo(data.user);
// 				console.log(data.chatHistory);

// 				// Attach chat history from login/register response
// 				if (data.chatHistory) {
// 					setMessages(
// 						data.chatHistory.map((msg) => ({
// 							role: msg.role,
// 							content: msg.content,
// 						}))
// 					);
// 				}
// 			}
// 		} catch {
// 			setAuthError("⚠️ Network error");
// 		}
// 	};

// 	const handleLogout = async () => {
// 		await fetch("http://localhost:3000/api/auth/logout", {
// 			method: "POST",
// 			credentials: "include",
// 		});
// 		setUserInfo(null);
// 	};

// 	const sendMessage = async () => {
// 		if (!input.trim()) return;

// 		setMessages((prev) => [...prev, { role: "user", content: input }]);
// 		setInput("");
// 		setLoading(true);

// 		try {
// 			const res = await fetch("http://localhost:3000/api/chat", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				credentials: "include",
// 				body: JSON.stringify({ chatId, message: input }),
// 			});
// 			const data = await res.json();
// 			setMessages((prev) => [
// 				...prev,
// 				{ role: "assistant", content: data.reply },
// 			]);
// 		} catch {
// 			setMessages((prev) => [
// 				...prev,
// 				{ role: "assistant", content: "⚠️ Error fetching response." },
// 			]);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// Not logged in
// 	if (!userInfo) {
// 		return (
// 			<div className="max-w-sm mx-auto p-4">
// 				<h1 className="text-2xl font-bold mb-4 text-center">
// 					{mode === "login" ? "Login" : "Register"}
// 				</h1>
// 				{mode === "register" && (
// 					<input
// 						className="border p-2 w-full mb-2"
// 						placeholder="Name"
// 						value={name}
// 						onChange={(e) => setName(e.target.value)}
// 					/>
// 				)}
// 				<input
// 					className="border p-2 w-full mb-2"
// 					placeholder="Email"
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 				/>
// 				<input
// 					type="password"
// 					className="border p-2 w-full mb-2"
// 					placeholder="Password"
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 				/>
// 				{mode === "register" && (
// 					<input
// 						type="password"
// 						className="border p-2 w-full mb-2"
// 						placeholder="Confirm Password"
// 						value={password2}
// 						onChange={(e) => setPassword2(e.target.value)}
// 					/>
// 				)}
// 				{authError && <p className="text-red-500 mb-2">{authError}</p>}
// 				<button
// 					className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
// 					onClick={handleAuth}
// 				>
// 					{mode === "login" ? "Login" : "Register"}
// 				</button>
// 				<p className="text-center">
// 					{mode === "login" ? (
// 						<span>
// 							No account?{" "}
// 							<button
// 								className="text-blue-500 underline"
// 								onClick={() => setMode("register")}
// 							>
// 								Register
// 							</button>
// 						</span>
// 					) : (
// 						<span>
// 							Already have an account?{" "}
// 							<button
// 								className="text-blue-500 underline"
// 								onClick={() => setMode("login")}
// 							>
// 								Login
// 							</button>
// 						</span>
// 					)}
// 				</p>
// 			</div>
// 		);
// 	}

// 	// Logged in
// 	return (
// 		<div className="max-w-xl mx-auto p-4">
// 			<div className="flex justify-between items-center mb-4">
// 				<div>
// 					<p className="font-bold">{userInfo?.name}</p>
// 					<p className="text-sm text-gray-600">{userInfo?.email}</p>
// 				</div>
// 				<button
// 					className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// 					onClick={handleLogout}
// 				>
// 					Logout
// 				</button>
// 			</div>

// 			<h1 className="text-2xl font-bold mb-4 text-center">🧠 AI Chatbot</h1>

// 			<div className="space-y-3 mb-4 max-h-[60vh] overflow-y-auto">
// 				{messages.map((msg, idx) => (
// 					<div
// 						key={idx}
// 						className={`p-2 rounded-md ${
// 							msg.role === "user"
// 								? "bg-blue-400 text-right"
// 								: "bg-gray-400 text-left"
// 						}`}
// 					>
// 						<strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
// 					</div>
// 				))}
// 			</div>

// 			<div className="flex gap-2">
// 				<input
// 					className="border p-2 flex-1 rounded"
// 					value={input}
// 					onChange={(e) => setInput(e.target.value)}
// 					onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// 					placeholder="Ask something..."
// 				/>
// 				<button
// 					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// 					onClick={sendMessage}
// 					disabled={loading}
// 				>
// 					{loading ? "..." : "Send"}
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

// export default App;
