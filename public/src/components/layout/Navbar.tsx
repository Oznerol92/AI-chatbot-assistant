// src/components/layout/Navbar.tsx
import type { User } from "../../types/auth";

export default function Navbar({
	user,
	onLogout,
}: {
	user: User | null;
	onLogout: () => void;
}) {
	return (
		<div className="flex justify-between items-center mb-4">
			<div>
				<p className="font-bold">{user?.name}</p>
				<p className="text-sm text-gray-600">{user?.email}</p>
			</div>
			<button
				className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
				onClick={onLogout}
			>
				Logout
			</button>
		</div>
	);
}
