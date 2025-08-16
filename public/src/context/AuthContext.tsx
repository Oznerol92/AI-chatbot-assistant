import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import type { User } from "../types/auth";

type AuthContextType = {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (
		name: string,
		email: string,
		pw: string,
		pw2: string
	) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		authService
			.me()
			.then((data) => setUser(data.user))
			.catch(() => setUser(null));
	}, []);

	const login = async (email: string, password: string) => {
		const data = await authService.login(email, password);
		setUser(data.user);
	};

	const register = async (
		name: string,
		email: string,
		pw: string,
		pw2: string
	) => {
		const data = await authService.register(name, email, pw, pw2);
		setUser(data.user);
	};

	const logout = async () => {
		await authService.logout();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};
