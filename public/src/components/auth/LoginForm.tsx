// src/components/auth/LoginForm.tsx
import { useState } from "react";
import type { LoginPayload } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
	switchMode: () => void;
}

export default function LoginForm({ switchMode }: LoginFormProps) {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [success, setSuccess] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await login(form.email, form.password);
			console.log("Logged in successfully");
			setSuccess("✅ Registered successfully! Redirecting...");
			setTimeout(() => navigate("/chat"), 1000); // redirect after 1s
		} catch {
			setError("⚠️ Invalid credentials");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-[#000] rounded shadow p-4">
			<form onSubmit={handleSubmit} className="space-y-3">
				<input
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					placeholder="Email"
					required
					className="border p-2 w-full rounded"
				/>
				<input
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					placeholder="Password"
					required
					className="border p-2 w-full rounded"
				/>
				{error && <p className="text-red-500">{error}</p>}
				{success && <p className="text-green-500">{success}</p>}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
			<p className="mt-3 text-center text-sm">
				Don’t have an account?{" "}
				<button
					type="button"
					onClick={switchMode}
					className="text-blue-500 underline"
				>
					Register
				</button>
			</p>
		</div>
	);
}
