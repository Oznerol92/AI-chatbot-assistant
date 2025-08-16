// src/components/auth/RegisterForm.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
	switchMode: () => void;
}

export default function RegisterForm({ switchMode }: RegisterFormProps) {
	const { register } = useAuth();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (form.password !== form.password2) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			await register(form.name, form.email, form.password, form.password2);
			setSuccess("✅ Registered successfully! Redirecting...");
			setTimeout(() => navigate("/chat"), 1000); // redirect after 1s
		} catch (err: any) {
			setError(err?.message || "⚠️ Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-2">
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={form.name}
				onChange={handleChange}
				className="border p-2 w-full rounded"
				required
			/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={form.email}
				onChange={handleChange}
				className="border p-2 w-full rounded"
				required
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={form.password}
				onChange={handleChange}
				className="border p-2 w-full rounded"
				required
			/>
			<input
				type="password"
				name="password2"
				placeholder="Confirm Password"
				value={form.password2}
				onChange={handleChange}
				className="border p-2 w-full rounded"
				required
			/>

			{error && <p className="text-red-500">{error}</p>}
			{success && <p className="text-green-500">{success}</p>}

			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded w-full"
				disabled={loading}
			>
				{loading ? "Registering..." : "Register"}
			</button>

			<p className="text-center text-sm mt-2">
				Already have an account?{" "}
				<button
					type="button"
					className="text-blue-500 underline"
					onClick={switchMode}
				>
					Login
				</button>
			</p>
		</form>
	);
}
