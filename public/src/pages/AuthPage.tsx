// src/pages/AuthPage.tsx
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
	const [mode, setMode] = useState<"login" | "register">("login");

	return (
		<div className="max-w-sm mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4 text-center">
				{mode === "login" ? "Login" : "Register"}
			</h1>

			{mode === "login" ? (
				<LoginForm switchMode={() => setMode("register")} />
			) : (
				<RegisterForm switchMode={() => setMode("login")} />
			)}
		</div>
	);
}
