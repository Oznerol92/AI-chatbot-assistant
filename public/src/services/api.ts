export async function api<T>(
	url: string,
	options: RequestInit = {}
): Promise<T> {
	const res = await fetch(`http://localhost:3000/api${url}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.error || "API request failed");
	}

	return res.json();
}
